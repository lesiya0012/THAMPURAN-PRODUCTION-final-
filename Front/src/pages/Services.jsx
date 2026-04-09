import { useEffect, useState } from "react";
import {
  FaFilm,
  FaAd,
  FaCamera,
  FaMusic,
  FaCalendar,
  FaMicrophone,
  FaPaintBrush,
  FaLightbulb,
  FaVideo
} from "react-icons/fa";

import { motion } from "framer-motion";

const iconMap = {
  FaFilm,
  FaAd,
  FaCamera,
  FaMusic,
  FaCalendar,
  FaMicrophone,
  FaPaintBrush,
  FaLightbulb,
  FaVideo
};

export default function Services() {
  const [services, setServices] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  useEffect(() => {
    fetch(`${API_URL}/api/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Error fetching services:", err));
  }, [API_URL]);

  return (
    <section id="services" className="bg-[#0c0c0c] text-white py-24">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-yellow-500 tracking-[4px] text-sm mb-4">
          WHAT WE DO
        </p>

        <h2 className="text-5xl font-serif font-semibold">
          <span className="text-white">Our </span>
          <span className="text-yellow-500">Services</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">

        {services.map((service, index) => {
          const Icon = iconMap[service.icon];

          return (
            <motion.div
  key={service._id}
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.6,
    delay: index * 0.2
  }}
  viewport={{ once: true }}
  className="
    relative
    group
    p-10
    border border-[#2a2a2a] 
    bg-black
    overflow-hidden
    transition-all duration-300
  "
>
  {/* Icon */}
  {Icon && (
    <Icon className="text-yellow-500 text-3xl mb-6" />
  )}

  {/* Title */}
  <h3 className="text-xl font-semibold mb-4">
    {service.title}
  </h3>

  {/* Description */}
  <p className="text-gray-400 leading-relaxed">
    {service.description}
  </p>

  {/* Animated Bottom Border */}
  <span
    className="
      absolute
      bottom-0
      left-0
      h-[2px]
      w-0
      bg-gradient-to-r
      from-yellow-500
      via-yellow-600
      to-yellow-800
      transition-all
      duration-500
      group-hover:w-full
      shadow-[0_0_15px_rgba(234,179,8,0.8)]
    "
  ></span>

</motion.div>
          );
        })}
      </div>
    </section>
  );
}