import { useState } from "react";

export default function Quoteform({ setShowQuote }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);

        setForm({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: ""
        });

        // ⏳ auto close after 2 sec
        setTimeout(() => {
          setShowQuote(false);
          setSuccess(false);
        }, 2000);
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔥 OVERLAY
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowQuote(false)}
    >
      {/* 🔥 MODAL BOX */}
      <div
        className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl shadow-xl p-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ CLOSE */}
        <button
          onClick={() => setShowQuote(false)}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">
           Let’s Create Something Amazing
        </h2>

        {/* ✅ SUCCESS STATE */}
        {success ? (
          <div className="text-center py-10 animate-fadeIn">
            <p className="text-yellow-400 text-xl font-semibold mb-2">
              ✅ Quote Received!
            </p>
            <p className="text-gray-300 text-sm">
              We will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="date"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <textarea
              name="message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
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