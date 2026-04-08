// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";

const Navbar = ({ toggleMenu }) => {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setVisible(true);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-700 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-semibold tracking-widest text-yellow-500">
          AUREUM
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-12 text-gray-200 tracking-[0.25em] text-sm">
          <li>
            <a href="#about" className="hover:text-yellow-400 transition">
              ABOUT
            </a>
          </li>

          <li>
            <a href="#services" className="hover:text-yellow-400 transition">
              SERVICES
            </a>
          </li>

          <li>
            <a href="#portfolio" className="hover:text-yellow-400 transition">
              PORTFOLIO
            </a>
          </li>

          <li>
            <a href="#testimonials" className="hover:text-yellow-400 transition">
              TESTIMONIALS
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-yellow-400 transition">
              CONTACT
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={handleMobileToggle}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800">
          <ul className="flex flex-col items-center gap-8 py-8 text-gray-200 tracking-widest">
            <li>
              <a href="#about" onClick={() => setMobileOpen(false)}>
                ABOUT
              </a>
            </li>

            <li>
              <a href="#services" onClick={() => setMobileOpen(false)}>
                SERVICES
              </a>
            </li>

            <li>
              <a href="#portfolio" onClick={() => setMobileOpen(false)}>
                PORTFOLIO
              </a>
            </li>

            <li>
              <a href="#testimonials" onClick={() => setMobileOpen(false)}>
                TESTIMONIALS
              </a>
            </li>

            <li>
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
