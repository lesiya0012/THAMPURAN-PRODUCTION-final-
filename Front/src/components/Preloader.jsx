export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      
      <div className="flex flex-col items-center justify-center text-center
                      opacity-0 animate-[fadeIn_1.5s_ease-in-out_forwards]">

        {/* Logo */}
        <div className="relative flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dvaxpatax/image/upload/v1774374075/IMG_41235_cbnjdh.png"
            alt="Thampuran Production"
            className="w-28 md:w-36 
                       mx-auto
                       animate-[logoAnim_2s_ease-in-out_forwards]
                       drop-shadow-[0_0_25px_rgba(212,175,55,0.8)]"
          />
        </div>

        {/* Title */}
        <h1 className="mt-8 text-[#D4AF37] text-2xl md:text-3xl 
                       tracking-[6px] font-serif font-semibold
                       drop-shadow-[0_0_10px_rgba(212,175,55,0.7)]
                       animate-[glow_1.5s_ease-in-out_infinite_alternate]">
          THAMPURAN PRODUCTION
        </h1>

      </div>

      {/* Keyframes */}
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

        @keyframes glow {
          from { opacity: 0.6; }
          to { opacity: 1; }
        }
        `}
      </style>
    </div>
  );
}