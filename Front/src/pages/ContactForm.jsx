import { useState } from "react";
import { FaInstagram, FaYoutube, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await res.json();

      // clear inputs
      setFormData({ name: "", email: "", message: "" });

      // show toast
      setShowToast(true);

      // hide toast after 4 sec
      setTimeout(() => {
        setShowToast(false);
      }, 4000);

    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <section className="bg-black text-white py-28 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-yellow-500 tracking-[0.35em] text-sm mb-4">
            GET IN TOUCH
          </p>

          <h2 className="text-5xl font-serif">
            Let's Create Something <span className="text-yellow-500">Powerful.</span>
          </h2>
        </div>

        {/* Form */}
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
  focus:outline-none 
  focus:border-yellow-500
  focus:shadow-[0_0_12px_rgba(234,179,8,0.6)] 
  transition-all duration-300"
/>
            <input
              type="email"
              name="email"
              id="email"
                autoComplete="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border border-yellow-700/40 p-4 w-full 
  focus:outline-none 
  focus:border-yellow-500
  focus:shadow-[0_0_12px_rgba(234,179,8,0.6)] 
  transition-all duration-300"
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
  focus:outline-none 
  focus:border-yellow-500
  focus:shadow-[0_0_12px_rgba(234,179,8,0.6)] 
  transition-all duration-300"
          />

          <div className="text-center pt-4">
            <button
  type="submit"
  className="
  relative
  px-10
  py-4
  font-semibold
  tracking-wider
  text-black
  bg-yellow-500
  overflow-hidden
  transition-all
  duration-300
  hover:bg-yellow-400
  
  hover:scale-105
  "
>
  SEND MESSAGE
</button>
          </div>

        </form>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mt-12 text-yellow-500 text-xl">

  <FaInstagram className="cursor-pointer transition-all duration-300 hover:scale-125 hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"/>

  <FaYoutube className="cursor-pointer transition-all duration-300 hover:scale-125 hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"/>

  <FaLinkedin className="cursor-pointer transition-all duration-300 hover:scale-125 hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"/>

  <FaEnvelope className="cursor-pointer transition-all duration-300 hover:scale-125 hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"/>

</div>

      </div>

      
      {/* Toast Notification */}
      <div
        className={`fixed bottom-25 right-16 bg-yellow-500 text-black px-6 py-3 rounded shadow-lg transform transition-all duration-500
        ${showToast ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        Message sent! We will contact you shortly.
      </div>
      
    </section>
  );
}