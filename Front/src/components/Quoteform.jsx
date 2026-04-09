import { useState, useEffect } from "react";

export default function QuoteForm({ setShowQuote }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // 🔥 NEW

  // Prevent background scroll + ESC close
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowQuote(false);
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setShowQuote]);

  // Autofill
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    const savedPhone = localStorage.getItem("userPhone");

    setForm((prev) => ({
      ...prev,
      name: savedName || "",
      email: savedEmail || "",
      phone: savedPhone || "",
    }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false); // 🔥 reset

    try {
      const res = await fetch("http://localhost:5000/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userName", form.name);
        localStorage.setItem("userEmail", form.email);
        localStorage.setItem("userPhone", form.phone);

        setSuccess(true);

        setForm({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });

        setTimeout(() => {
          setShowQuote(false);
          setSuccess(false);
        }, 3500);
      } else {
        setError(true); // 🔥 show error UI
      }
    } catch (err) {
      console.error(err);
      setError(true); // 🔥 show error UI
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => setShowQuote(false)}
    >
      <div
        className="relative w-[90%] sm:w-full max-w-md md:max-w-lg 
        bg-zinc-900 border border-zinc-700 rounded-xs shadow-2xl 
        p-5 sm:p-6 md:p-8 animate-fadeIn 
        max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowQuote(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center mb-6">
          Let’s Create Something Amazing
        </h2>

        {/* SUCCESS */}
        {success ? (
          <div className="flex flex-col items-center justify-center text-center py-10 animate-fadeIn">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400/20 mb-4">
              <span className="text-yellow-400 text-3xl">✓</span>
            </div>

            <h3 className="text-yellow-400 text-xl md:text-2xl font-semibold mb-2">
              Quote Received!
            </h3>

            <p className="text-gray-300 text-sm md:text-base max-w-sm">
              Thank you for reaching out. We’ll contact you shortly .
            </p>
          </div>
        ) : error ? (
          /* 🔥 ERROR UI */
          <div className="flex flex-col items-center justify-center text-center py-10 animate-fadeIn">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/20 mb-4">
              <span className="text-red-400 text-3xl">✕</span>
            </div>

            <h3 className="text-red-400 text-xl md:text-2xl font-semibold mb-2">
              Quote Failed to Send
            </h3>

            <p className="text-gray-300 text-sm md:text-base max-w-sm">
              Please try again later.
            </p>

            {/* Retry Button */}
            <button
              onClick={() => setError(false)}
              className="mt-6 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* FORM */
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />

            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />

            <input
              type="text"
              name="phone"
              autoComplete="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className={inputClasses}
            />

            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              required
              className={inputClasses}
            >
              <option value="">Select Project Type</option>
              <option>Ad Shoot</option>
              <option>Wedding Shoot</option>
              <option>Event Coverage</option>
              <option>Sound Design</option>
              <option>Model Shoot</option>
              <option>Graphic Designs</option>
              <option>Other</option>
            </select>

            <input
              type="text"
              name="budget"
              placeholder="Budget (Optional)"
              value={form.budget}
              onChange={handleChange}
              className={inputClasses}
            />

            <input
              type="date"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              required
              className={inputClasses}
            />

            <textarea
              name="message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handleChange}
              required
              className={`${inputClasses} h-28 resize-none`}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-semibold p-3 rounded-lg hover:bg-yellow-300 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Quote"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}