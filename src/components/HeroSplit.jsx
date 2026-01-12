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
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6">
        <button className="md:hidden text-white text-xl">☰</button>
        <div className="text-yellow-400 text-lg md:text-xl font-bold tracking-wider">
          PROCESA
        </div>
      </header>

      {/* ===== DESKTOP SPLIT CON IMÁGENES Y DIAGONAL   redeploy===== */}
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
      <div className="relative z-20 flex flex-col md:flex-row h-full pt-16 md:pt-0">
        {/* ===== LEFT SIDE: WHAT WE DO ===== */}
        <div
          className="w-full h-1/2 md:h-full md:w-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-1000 ease-out px-4 md:px-6"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight mb-4 md:mb-6 text-white md:text-white"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textShadow: '0 2px 20px rgba(255, 255, 255, 0.1)',
              }}
            >
              DISEÑO<br />INTERIOR
            </h1>

            <button 
              className="mt-2 md:mt-4 px-6 md:px-8 py-2 md:py-3 border-2 border-white text-white text-[10px] sm:text-xs tracking-[0.2em] font-semibold hover:bg-white hover:text-[#5a4a7f] transition-all duration-300 uppercase rounded-full"
              onClick={(e) => { e.stopPropagation(); navigate('/design'); }}
            >
              CONOCE NUESTROS PROYECTOS
            </button>
          </div>
        </div>

        {/* ===== RIGHT SIDE: LATE===== */}
        <div
          className="w-full h-1/2 md:h-full md:w-1/2 flex flex-col items-center justify-center cursor-pointer transition-all duration-1000 ease-out px-4 md:px-6"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight mb-4 md:mb-6"
              style={{ 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: 'rgb(255, 255, 255)',
                textShadow: '0 2px 20px rgba(255, 255, 255, 0.36)',
              }}
            >
              DISEÑO<br />COMERCIAL

            </h1>

            <button 
              className="mt-2 md:mt-4 px-6 md:px-8 py-2 md:py-3 border-2 text-[10px] sm:text-xs tracking-[0.2em] font-semibold transition-all duration-300 uppercase rounded-full"
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
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/40 bg-white flex items-center justify-center">
          <div className="text-6xl font-bold text-gray-800 w-full h-full flex items-center justify-center p-3">
            <img className="w-[70%] h-[70%] object-contain" src="/imagenes/logo.png" alt="logo" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}