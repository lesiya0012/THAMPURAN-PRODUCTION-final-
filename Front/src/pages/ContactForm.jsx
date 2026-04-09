import { useState } from "react";
import { FaInstagram, FaYoutube, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | sent
  const [error, setError] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError(false);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      await res.json();

      // ✅ Save for browser memory (but NOT auto-fill on load)
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", formData.name);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setStatus("sent");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setStatus("idle");
      }, 4000);

    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
      setShowToast(true);
      setStatus("idle");

      setTimeout(() => {
        setShowToast(false);
        setError(false);
      }, 4000);
    }
  };

  return (
    <section id="contact" className="bg-[#0c0c0c] text-white py-28 relative">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-yellow-500 tracking-[0.35em] text-sm mb-4">
            GET IN TOUCH
          </p>
          <h2 className="text-5xl font-serif">
            Let's Create Something{" "}
            <span className="text-yellow-500">Powerful.</span>
          </h2>
        </div>

        {/* ✅ autocomplete ON so browser suggestions work */}
        <form onSubmit={handleSubmit} autoComplete="on" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-transparent border border-yellow-700/40 p-4 w-full 
              focus:outline-none focus:border-yellow-500
              focus:shadow-[0_0_12px_rgba(234,179,8,0.6)] transition-all duration-300"
            />

            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border border-yellow-700/40 p-4 w-full 
              focus:outline-none focus:border-yellow-500
              focus:shadow-[0_0_12px_rgba(234,179,8,0.6)] transition-all duration-300"
            />
          </div>

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            autoComplete="off"
            value={formData.message}
            onChange={handleChange}
            required
            className="bg-transparent border border-yellow-700/40 p-4 w-full 
            focus:outline-none focus:border-yellow-500
            focus:shadow-[0_0_12px_rgba(234,179,8,0.6)] transition-all duration-300"
          />

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className={`relative px-10 py-4 font-semibold tracking-wider text-black
              transition-all duration-300 overflow-hidden
              ${
                status === "sent"
                  ? "bg-yellow-600"
                  : "bg-yellow-500 hover:bg-yellow-400 hover:scale-105"
              }
              ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  SENDING...
                </span>
              ) : status === "sent" ? (
                "SENT ✓"
              ) : (
                "SEND MESSAGE"
              )}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-8 mt-12 text-yellow-500 text-xl">
          <a href="https://www.instagram.com/thampuran_productions" target="_blank" rel="noopener noreferrer"
            className="hover:scale-125 transition-all duration-300 hover:text-yellow-400">
            <FaInstagram />
          </a>

          <a href="https://www.youtube.com/@thampuranproductions" target="_blank" rel="noopener noreferrer"
            className="hover:scale-125 transition-all duration-300 hover:text-yellow-400">
            <FaYoutube />
          </a>

          <a href="https://www.linkedin.com/company/thampuran-productions" target="_blank" rel="noopener noreferrer"
            className="hover:scale-125 transition-all duration-300 hover:text-yellow-400">
            <FaLinkedin />
          </a>

          <a href="mailto:thampuranproductions@gmail.com"
            className="hover:scale-125 transition-all duration-300 hover:text-yellow-400">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed bottom-25 right-16 px-6 py-3 rounded shadow-lg transform transition-all duration-500
        ${error ? "bg-red-500 text-white" : "bg-yellow-500 text-black"}
        ${showToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        {error
          ? "Message not sent. Please try again later."
          : "Message sent! We will contact you shortly."}
      </div>
    </section>
  );
}