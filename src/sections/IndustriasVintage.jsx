import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { vintageVideos, vintageImages } from "./remodelacionVideos";

// ==================== COMPONENTE PRINCIPAL ====================

export default function IndustriasVintage() {
  // Estados
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  
  // Referencias
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Configuración
  const WHATSAPP_PHONE = "593963998673";
  const WHATSAPP_MESSAGE = "Hola! Quiero más información sobre Industrias Vintage.";
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // ==================== VARIANTES DE ANIMACIÓN ====================
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };
  
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
  
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  // ==================== EFFECTS ====================
  
  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Autoplay video hero
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = false;
    video.play()
      .then(() => {
        setIsMuted(false);
      })
      .catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
  }, []);

  // Bloquear scroll cuando modal abierto
  useEffect(() => {
    if (selectedMedia !== null) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [selectedMedia]);

  // Función toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Generar tamaños aleatorios para la galería (solo una vez)
  const imageLayouts = useMemo(() => {
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    return vintageImages.map((img, i) => {
      // Patrón más balanceado: más imágenes medianas y grandes
      let size;
      const rand = Math.random();
      if (rand < 0.2) size = 'small';      // 20%
      else if (rand < 0.5) size = 'medium'; // 30%
      else if (rand < 0.8) size = 'large';  // 30%
      else size = 'xlarge';                 // 20%
      
      return {
        src: img,
        size,
        delay: (i % 12) * 0.05, // Escalonar animaciones
      };
    });
  }, []);

  // ==================== RENDER ====================
  
  return (
    <>
      <main 
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-[#1a1410] via-[#0f0a08] to-[#0a0806] text-white relative overflow-hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Fondo animado con tema vintage */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
          {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                width: '2px',
                height: '2px',
                backgroundColor: 'rgba(217, 119, 6, 0.3)',
              }}
              animate={{ 
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ 
                duration: 3 + (i % 4), 
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* ==================== NAVEGACIÓN ==================== */}
        <motion.header
          className={[
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "bg-amber-950/95 backdrop-blur-md border-b border-amber-900/50 shadow-lg" : "bg-transparent",
          ].join(" ")}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/design" 
                className="flex items-center gap-2 font-semibold transition-colors text-amber-200 hover:text-amber-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver a Design
              </Link>
            </motion.div>

            <div className="absolute left-1/2 -translate-x-1/2 text-center">
              <div className="font-bold tracking-wider text-amber-200 text-lg">
                INDUSTRIAS<br/>VINTAGE
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <motion.a 
                href="#servicios" 
                className="text-amber-200/90 hover:text-amber-100"
                whileHover={{ y: -2 }}
              >
                Servicios
              </motion.a>
              <motion.a 
                href="#proyectos" 
                className="text-amber-200/90 hover:text-amber-100"
                whileHover={{ y: -2 }}
              >
                Proyectos
              </motion.a>
              <motion.a 
                href="#galeria" 
                className="text-amber-200/90 hover:text-amber-100"
                whileHover={{ y: -2 }}
              >
                Galería
              </motion.a>
              <motion.a 
                href="#contacto" 
                className="px-3 py-1.5 rounded-lg border border-amber-600/50 text-amber-200 hover:bg-amber-900/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contacto
              </motion.a>
            </nav>

            <motion.button
              type="button"
              className="md:hidden p-2 rounded-md text-amber-200 hover:bg-amber-900/30"
              onClick={() => setMobileOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div 
                className="md:hidden border-t border-amber-900/50 bg-amber-950/95 backdrop-blur-md"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm">
                  <a onClick={() => setMobileOpen(false)} href="#servicios" className="text-amber-200">Servicios</a>
                  <a onClick={() => setMobileOpen(false)} href="#proyectos" className="text-amber-200">Proyectos</a>
                  <a onClick={() => setMobileOpen(false)} href="#galeria" className="text-amber-200">Galería</a>
                  <a onClick={() => setMobileOpen(false)} href="#contacto" className="px-3 py-2 rounded-md border border-amber-600/50 text-amber-200 text-center">Contacto</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              src="/imagenes morado/remodelacion/vintage/VINTAGE PROCESA KITCHEN_1.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{ filter: 'brightness(0.4) sepia(0.3)' }}
            />
            
            <motion.button
              onClick={toggleMute}
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 p-3 md:p-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-600/30 transition-all shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="text-xl md:text-2xl">
                {isMuted ? "🔇" : "🔊"}
              </span>
            </motion.button>
            
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-950/40 via-transparent to-amber-950/40" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 md:py-32">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight px-2">
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Industrias Vintage
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-100 mb-4 sm:mb-6 font-semibold px-2">
                  Diseño de Interiores con Alma
                </p>
                <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
                  Especializados en remodelación de interiores con acabados vintage. 
                  Muebles de época, acabados artesanales, lámparas retro y mobiliario único 
                  para darle a tu hogar ese encanto nostálgico que solo lo vintage puede ofrecer.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.a
                  href="#proyectos"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold hover:from-amber-500 hover:to-amber-600 transition-all shadow-2xl shadow-amber-600/30 text-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Proyectos
                </motion.a>
                <motion.a
                  href="#contacto"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-amber-600/50 text-amber-200 font-bold hover:bg-amber-900/30 backdrop-blur-sm transition-all text-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Solicitar Cotización
                </motion.a>
              </motion.div>

              <motion.div
                className="mt-16 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <span className="text-sm text-amber-400/70">Descubre más</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== SERVICIOS ==================== */}
        <motion.section 
          id="servicios"
          className="relative px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-28"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Nuestros Servicios Vintage
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/70 max-w-2xl mx-auto">
                Creamos espacios únicos con el encanto del pasado y la funcionalidad del presente
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { 
                  icon: "✨", 
                  title: "Mobiliario Vintage", 
                  desc: "Muebles de época restaurados y personalizados. Piezas únicas que cuentan historias."
                },
                { 
                  icon: "💡", 
                  title: "Iluminación Retro", 
                  desc: "Lámparas y luminarias de estilo vintage que crean ambientes cálidos y nostálgicos."
                },
                { 
                  icon: "🎨", 
                  title: "Acabados Artesanales", 
                  desc: "Detalles únicos con técnicas tradicionales. Texturas y colores auténticos."
                },
                { 
                  icon: "🏠", 
                  title: "Diseño Integral", 
                  desc: "Espacios completos con estética vintage. De la concepción a la realización."
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-600/20 hover:border-amber-600/40 transition-all group"
                  whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
                >
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                  <div className="text-lg sm:text-xl font-bold text-amber-200 mb-2 sm:mb-3">{service.title}</div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ==================== VIDEOS DE PROYECTOS ==================== */}
        <motion.section 
          id="proyectos"
          className="relative px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-amber-950/10 to-transparent"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Proyectos en Video
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/70 max-w-2xl mx-auto">
                Mira nuestros trabajos cobrar vida
              </motion.p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {vintageVideos.map((video, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-amber-600/20 hover:border-amber-600/40 transition-all cursor-pointer"
                  whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
                  onClick={() => setSelectedMedia({ type: 'video', src: video })}
                >
                  <div className="relative aspect-video">
                    <video
                      src={video}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-amber-600/90 flex items-center justify-center shadow-2xl">
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-t from-amber-950/40 to-transparent">
                    <div className="text-lg font-bold text-amber-200">Proyecto Vintage {i + 1}</div>
                    <div className="text-sm text-white/60">Click para ver completo</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ==================== GALERÍA DINÁMICA COMPLETA ==================== */}
        <motion.section 
          id="galeria"
          className="relative py-12 sm:py-16 md:py-20 lg:py-28"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="max-w-[2000px] mx-auto px-3 sm:px-4 md:px-6">
            <motion.div 
              variants={fadeIn} 
              className="text-center mb-12 px-4"
            >
              <motion.h2 
                variants={fadeInUp} 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent"
              >
                Galería de Proyectos
              </motion.h2>
              <motion.p 
                variants={fadeInUp} 
                className="text-lg text-white/70 max-w-2xl mx-auto"
              >
                Cada imagen cuenta la historia de una transformación única
              </motion.p>
            </motion.div>

            {/* Grid dinámico estilo masonry */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-2 sm:gap-3 md:gap-4 space-y-2 sm:space-y-3 md:space-y-4">
              {imageLayouts.map((layout, i) => {
                // Definir alturas basadas en el tamaño (más pequeñas en móvil)
                const heightClasses = {
                  small: 'h-40 sm:h-48 md:h-56',
                  medium: 'h-52 sm:h-64 md:h-80', 
                  large: 'h-64 sm:h-80 md:h-96',
                  xlarge: 'h-80 sm:h-96 md:h-[32rem]'
                };

                return (
                  <motion.div
                    key={i}
                    className="group relative rounded-lg overflow-hidden break-inside-avoid cursor-pointer"
                    style={{ display: 'inline-block', width: '100%' }}
                    initial={{ opacity: 0, scale: 0.8, y: 60 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.6, 
                        delay: layout.delay,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ 
                      scale: 1.02,
                      zIndex: 10,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => setSelectedMedia({ type: 'image', src: layout.src })}
                  >
                    <div className={`relative ${heightClasses[layout.size]} w-full`}>
                      <img
                        src={layout.src}
                        alt={`Proyecto Vintage ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Overlay al hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="text-amber-400 font-bold text-lg mb-2">
                            Proyecto {i + 1}
                          </div>
                          <div className="text-white/90 text-sm">
                            Click para ampliar
                          </div>
                        </motion.div>
                        
                        {/* Icono de zoom */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <motion.div
                            className="w-16 h-16 rounded-full bg-amber-600/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>

                      {/* Borde decorativo */}
                      <div className="absolute inset-0 border-2 border-amber-600/0 group-hover:border-amber-600/60 transition-all duration-500 rounded-lg" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ==================== CONTACTO ==================== */}
        <motion.section 
          id="contacto"
          className="relative px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-amber-950/20 to-transparent"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent px-4">
                ¿Listo para un espacio vintage único?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 px-4">
                Contáctanos y transforma tu hogar con el encanto del pasado
              </p>
              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-base sm:text-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-2xl shadow-amber-600/40"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contactar Industrias Vintage
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* ==================== FOOTER ==================== */}
        <motion.footer
          className="relative px-6 md:px-10 lg:px-16 py-16 border-t border-amber-900/30 bg-gradient-to-b from-[#1a1410] to-[#0a0806]"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent mb-4">
              INDUSTRIAS VINTAGE
            </div>
            <p className="text-white/60 text-sm mb-8">
              Diseño de Interiores con Alma • Desde 2003
            </p>
            <div className="flex justify-center gap-8 text-sm text-white/50 mb-8">
              <a href="#servicios" className="hover:text-amber-400 transition-colors">Servicios</a>
              <a href="#proyectos" className="hover:text-amber-400 transition-colors">Proyectos</a>
              <a href="#galeria" className="hover:text-amber-400 transition-colors">Galería</a>
              <a href="#contacto" className="hover:text-amber-400 transition-colors">Contacto</a>
            </div>
            <div className="text-xs text-white/40">
              © {new Date().getFullYear()} Industrias Vintage - Procesa Design. Todos los derechos reservados.
            </div>
          </div>
        </motion.footer>

        <style>{`
          @keyframes wa-float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </main>

      {/* ==================== BOTÓN FLOTANTE FIJO (FUERA DEL MAIN) ==================== */}
      {/* Botón flotante WhatsApp */}
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] group"
        style={{ position: 'fixed' }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Pulso de fondo animado */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Anillo giratorio */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-green-400/40"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        <motion.img
          src="/imagenes/whatsapp.png"
          alt="WhatsApp"
          className="h-16 w-16 md:h-[72px] md:w-[72px] object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] relative z-10"
          loading="lazy"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tooltip al hover */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          <div className="px-4 py-2 rounded-lg bg-green-600/95 backdrop-blur-sm border border-green-400/50 text-white text-sm font-semibold shadow-xl">
            ¡Chatea con nosotros!
          </div>
        </div>
      </motion.a>

      {/* ==================== MODAL VISTA DE MEDIO (FUERA DEL MAIN) ==================== */}
      <AnimatePresence mode="wait">
        {selectedMedia !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div 
              className="relative max-w-6xl w-full" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-14 right-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/40 bg-black">
                {selectedMedia?.type === 'video' ? (
                  <video
                    src={selectedMedia.src}
                    className="w-full max-h-[85vh] object-contain"
                    controls
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={selectedMedia?.src}
                    alt="Vista ampliada"
                    className="w-full max-h-[85vh] object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
