import React, { useState, useEffect } from "react";
import Quoteform from "./Quoteform";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${
          scrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-black/30 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
         <h1
  onClick={scrollToTop}
  className="font-brainy text-xl md:text-2xl tracking-[0.12em] text-yellow-400 
  drop-shadow-[0_0_6px_rgba(250,204,21,0.5)] cursor-pointer transition-transform duration-500 hover:scale-105"
>
  Thampuran Productions
</h1>

          {/* DESKTOP MENU */}
          <div className="hidden min-[1000px]:flex items-center gap-10">
            <ul className="flex items-center gap-8 text-gray-300 text-sm tracking-[0.15em]">
              {["ABOUT", "SERVICES", "PORTFOLIO", "TESTIMONIALS", "CONTACT"].map(
                (item) => (
                  <li key={item} className="relative group">
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-yellow-400 transition duration-300"
                    >
                      {item}
                    </a>
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                )
              )}
            </ul>

            <button
              onClick={() => setShowQuote(true)}
              className="bg-yellow-400 text-black px-4 py-2 text-sm tracking-wider rounded-sm hover:bg-yellow-300 transition duration-300 transform hover:scale-105"
            >
              GET A QUOTE
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="min-[1000px]:hidden text-white text-2xl focus:outline-none"
          >
            <div className="space-y-1">
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`min-[1000px]:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
            mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-md border-t border-gray-800">
            <ul className="flex flex-col items-center gap-6 py-8 text-gray-200 tracking-[0.2em] text-lg">
              {["ABOUT", "SERVICES", "PORTFOLIO", "TESTIMONIALS", "CONTACT"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className="hover:text-yellow-400 transition transform hover:scale-105"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}

              <button
                onClick={() => {
                  setShowQuote(true);
                  setMobileOpen(false);
                }}
                className="mt-4 bg-yellow-400 text-black px-6 py-2 text-sm tracking-wider rounded-sm hover:bg-yellow-300 transition duration-300 transform hover:scale-105"
              >
                GET A QUOTE
              </button>
            </ul>
          </div>
        </div>
      </nav>

      {showQuote && <Quoteform setShowQuote={setShowQuote} />}
    </>
  );
};

export default Navbar;