import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSplit() {
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();

  // Imágenes de fondo (ajusta rutas si fuera necesario)
  const LEFT_IMG = "/imagenes/izquierda.jpg";   // Procesa Design (morado)
  const RIGHT_IMG = "/imagenes/derecha_amarillo.jpg";   // Latest Work (dorado)

  // ClipPath dinámico para el lado derecho en desktop
  const rightClipPath =
    hover === "left"
      ? "polygon(60% 0, 100% 0, 100% 100%, 70% 100%)"
      : hover === "right"
      ? "polygon(35% 0, 100% 0, 100% 100%, 45% 100%)"
      : "polygon(45% 0, 100% 0, 100% 100%, 55% 100%)";

  return (
    <motion.section
      className="relative w-full h-screen overflow-hidden bg-black"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* ===== HEADER ===== */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:p-8">
        <button className="md:hidden text-white text-2xl">☰</button>
        <div className="text-yellow-400 text-xl md:text-2xl font-bold tracking-wider">
          PROCESA
        </div>
        
      </header>

      {/* ===== DESKTOP SPLIT CON IMÁGENES Y DIAGONAL ===== */}
      <div className="hidden md:block absolute inset-0">
        {/* Lado izquierdo - Imagen + overlay morado */}
        <div className="absolute inset-0">
          <img
            src={LEFT_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            decoding="async"
            loading="eager"
            fetchpriority="high"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(90, 74, 127, 0.78)" }}
          ></div>
        </div>
        
        {/* Lado derecho - Imagen + overlay dorado con diagonal */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{ clipPath: rightClipPath }}
        >
          <img
            src={RIGHT_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            decoding="async"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(212, 175, 55, 0.78)" }}
          ></div>
        </div>
      </div>

      {/* ===== MOBILE: IMÁGENES + OVERLAY (split vertical) ===== */}
      <div className="md:hidden absolute inset-0">
        {/* Top: imagen + overlay morado */}
        <div className="absolute top-0 left-0 right-0 h-1/2 overflow-hidden">
          <img
            src={LEFT_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            decoding="async"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(90, 74, 127, 0.78)" }}
          ></div>
        </div>
        
        {/* Bottom: imagen + overlay dorado */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
          <img
            src={RIGHT_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            decoding="async"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(212, 175, 55, 0.78)" }}
          ></div>
        </div>
      </div>

      {/* ===== CONTENT CONTAINER ===== */}
      <div className="relative z-20 flex flex-col md:flex-row h-full pt-20 md:pt-0">
        {/* ===== LEFT SIDE: WHAT WE DO ===== */}
        <div
          className="w-full h-1/2 md:h-full md:w-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-1000 ease-out px-6"
          style={{
            flex: hover === "left" ? "0 0 60%" : hover === "right" ? "0 0 40%" : "0 0 50%"
          }}
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
          onClick={() => navigate('/design')}
        >
          <div className="text-center max-w-md">
            {/* Mobile: blanco, Desktop: blanco */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8 text-white md:text-white"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textShadow: '0 2px 20px rgba(255, 255, 255, 0.1)',
              }}
            >
              DISEÑO<br />INTERIOR
            </h1>

            <button className="mt-4 px-8 py-3 border-2 border-white text-white text-xs sm:text-sm tracking-[0.2em] font-semibold hover:bg-white hover:text-[#5a4a7f] transition-all duration-300 uppercase rounded-full"
              onClick={(e) => { e.stopPropagation(); navigate('/design'); }}
            >
              CONOCE NUESTROS PROYECTOS
            </button>
          </div>
        </div>

        {/* ===== RIGHT SIDE: LATE===== */}
        <div
          className="w-full h-1/2 md:h-full md:w-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-1000 ease-out px-6"
          style={{
            flex: hover === "right" ? "0 0 60%" : hover === "left" ? "0 0 40%" : "0 0 50%"
          }}
          onMouseEnter={() => setHover("right")}
          onMouseLeave={() => setHover(null)}
          onClick={() => navigate('/stands')}
        >
          <div className="text-center max-w-md">
            {/* Mobile y Desktop: marrón dorado */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: 'rgb(255, 255, 255)',
                textShadow: '0 2px 20px rgba(255, 255, 255, 0.36)',
              }}
            >
              DISEÑO<br />COMERCIAL

            </h1>

            <button 
              className="mt-4 px-8 py-3 border-2 text-xs sm:text-sm tracking-[0.2em] font-semibold transition-all duration-300 uppercase rounded-full"
              style={{
                borderColor: 'rgb(255, 255, 255)',
                color: 'rgb(255, 255, 255)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(255, 255, 255)';
                e.currentTarget.style.color = 'rgb(141, 128, 12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'rgb(253, 253, 253)';
              }}
              onClick={(e) => { e.stopPropagation(); navigate('/stands'); }}
            >
              CONOCE NUESTROS PROYECTOS
            </button>
            

          </div>
        </div>
      </div>

      {/* ===== CENTER LOGO (ALL SIZES) ===== */}
      <div 
        className="flex absolute top-1/2 left-1/2 z-10 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          transform: hover === "left" 
            ? "translate(-70%, -50%)" 
            : hover === "right"
            ? "translate(-30%, -50%)"
            : "translate(-50%, -50%)"
        }}
      >
        <div className="size-[26vw] sm:size-[22vw] md:size-[18vw] lg:size-[16vw] min-w-36 min-h-36 max-w-80 max-h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/40 bg-white flex items-center justify-center">
          <div className="text-6xl font-bold text-gray-800"><img src="/imagenes/logo.png" alt="logo" /></div>
        </div>
      </div>
    </motion.section>
  );
}