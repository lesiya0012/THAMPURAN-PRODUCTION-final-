import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
 const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }, [API_URL]);

  return (
    <section id="testimonials" className="bg-black text-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-yellow-500 tracking-[0.35em] text-sm mb-4">
            TESTIMONIALS
          </p>

          <h2 className="text-5xl font-serif font-semibold">
            What They <span className="text-yellow-500">Say</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="border border-yellow-800/40 backdrop-blur-lg bg-white/5 p-10 rounded-sm hover:border-yellow-500 transition-all duration-300"
            >
              

              {/* Quote text */}
              <p className="text-gray-300 italic leading-relaxed mb-10">"{t.quote}"</p>

              {/* Author */}
              <div>
                <p className="font-serif text-lg">{t.name}</p>

                <p className="text-gray-500 text-sm mt-1">
                  {t.title}
                  {t.company ? `, ${t.company}` : ""}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}