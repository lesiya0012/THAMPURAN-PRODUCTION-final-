import { FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5 py-10">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* LEFT: Logo + Name */}
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/dvaxpatax/image/upload/v1774374075/IMG_41235_cbnjdh.png"
              alt="Thampuran Productions"
              className="w-10 md:w-12 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
            />
            <span className="text-yellow-400 text-lg md:text-2xl tracking-[0.25em] font-brainy whitespace-nowrap">
              Thampuran Production
            </span>
          </div>

          {/* CENTER: Navigation */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm tracking-[0.25em] uppercase">
            <a href="#" className="hover:text-yellow-400 transition duration-300">About</a>
            <a href="#" className="hover:text-yellow-400 transition duration-300">Services</a>
            <a href="#" className="hover:text-yellow-400 transition duration-300">Portfolio</a>
            <a href="#" className="hover:text-yellow-400 transition duration-300">Contact</a>
          </div>

          {/* RIGHT: Social Icons */}
          <div className="flex gap-5 text-lg">
            <a
              href="https://www.instagram.com/thampuran_productions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@thampuranproductions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaYoutube />
            </a>

            <a
              href="mailto:thampuranproductions@gmail.com"
              className="hover:text-yellow-400 transition duration-300"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-800 mt-8"></div>

        {/* Bottom Text */}
        <div className="text-center text-xs text-gray-500 tracking-[0.2em] mt-6">
          © 2026 THAMPURAN PRODUCTIONS. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
}