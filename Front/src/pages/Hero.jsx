import React, { useState, useEffect } from "react";

// 🔥 Optimize Cloudinary images
const optimizeImage = (url) => {
  if (!url.includes("cloudinary")) return url;
  return url.replace("/upload/", "/upload/w_1600,f_auto,q_auto/");
};

const Hero = () => {
  const slides = [
    optimizeImage("https://res.cloudinary.com/dvaxpatax/image/upload/v1772982982/3c9cca3a-f89b-4c65-9c20-701641af41b0_neeke6.jpg"),
    optimizeImage("https://res.cloudinary.com/dvaxpatax/image/upload/v1772982982/0dd5fcfb-f9b7-4480-a01f-0146ddca725a_l6vrk5.jpg"),
    optimizeImage("https://res.cloudinary.com/dvaxpatax/image/upload/v1772982982/hero-bg_nwldwt.jpg"),
    optimizeImage("https://res.cloudinary.com/dvaxpatax/image/upload/v1772982981/68276024-caed-4842-b019-aff51dd3dba2_myhot2.jpg")
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center bg-black">

      {/* Background Images */}
      {slides.map((img, index) => {
        if (index !== current && index !== (current + 1) % slides.length) return null;

        return (
          <div
            key={index}
            className={`hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === current ? "opacity-100 active" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundColor: "#000"
            }}
          />
        );
      })}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <p className="fade-up delay-1 text-yellow-500 tracking-[0.5em] text-xs md:text-sm mb-6">
          PREMIUM PRODUCTION HOUSE
        </p>

        <h1 className="fade-up delay-2 font-brainy text-white text-4xl md:text-6xl tracking-[0.15em] leading-tight">
          We Don’t Create Content.
        </h1>

        <h1 className="fade-up delay-3 font-brainy text-yellow-400 text-xl md:text-3xl mt-3 tracking-[0.15em] drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
          We Create Experiences.
        </h1>

        <div className="fade-up delay-4 w-24 h-[2px] bg-yellow-500 mx-auto my-6"></div>

        <p className="fade-up delay-5 text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          From concept to screen, we craft cinematic stories and visual
          masterpieces that leave lasting impressions.
        </p>

        <button className="fade-up delay-5 bg-yellow-500 text-black px-8 py-4 tracking-[0.25em] text-sm hover:bg-yellow-400 transition shadow-[0_0_15px_rgba(250,204,21,0.4)]">
          VIEW OUR WORK
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-yellow-500 text-4xl hover:text-yellow-400 transition"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-yellow-500 text-4xl hover:text-yellow-400 transition"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-12 flex gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-[2px] w-10 ${i === current ? "bg-yellow-500" : "bg-gray-500"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;