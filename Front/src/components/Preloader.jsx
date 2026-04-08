import React from "react";

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-6 opacity-0 animate-[fadeIn_1.2s_ease-in-out_forwards]">
        {/* Logo */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dvaxpatax/image/upload/v1774374075/IMG_41235_cbnjdh.png"
            alt="Thampuran Production"
            className="w-28 md:w-36 mx-auto animate-[logoAnim_1.8s_cubic-bezier(0.22,1,0.36,1)_forwards,glowPulse_2.5s_ease-in-out_1.5s_infinite_alternate] drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] contrast-110 brightness-110"
          />
        </div>

        {/* Title */}
        <div className="relative mt-6 opacity-0 animate-[fadeText_2s_cubic-bezier(0.22,1,0.36,1)_0.8s_forwards]">
          {/* Glow layer (fake bold) */}
          <h1 className="absolute inset-0 font-brainy text-5xl md:text-6xl tracking-[0.15em] text-yellow-600 opacity-80 blur-[0.6px] [filter:drop-shadow(0_0_12px_rgba(250,204,21,0.8))]">
            Thampuran Production
          </h1>
          {/* Main text */}
          <h1 className="relative font-brainy text-5xl md:text-6xl tracking-[0.15em] text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]">
            Thampuran Production
          </h1>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes logoAnim {
            0% { opacity: 0; transform: scale(0.6); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeText {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPulse {
            from { filter: drop-shadow(0 0 8px rgba(212,175,55,0.5)); }
            to { filter: drop-shadow(0 0 20px rgba(212,175,55,0.9)); }
          }
        `}
      </style>
    </div>
  );
}