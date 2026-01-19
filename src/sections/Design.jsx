import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { featuredProjects, vintageImages, vintageVideos } from "./remodelacionVideos";

// ==================== COMPONENTES AUXILIARES ====================

// Componente: Formulario de Cotización
function CotizacionForm({ whatsappPhone, email }) {
  const [nombre, setNombre] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [tipoProyecto, setTipoProyecto] = useState("");
  const [metros, setMetros] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [mensaje, setMensaje] = useState("");

  function buildText() {
    return [
      `Solicitud de cotización - Remodelación`,
      `Nombre: ${nombre}`,
      `Email: ${emailValue}`,
      `Teléfono: ${telefono}`,
      `Ciudad: ${ciudad}`,
      `Tipo de proyecto: ${tipoProyecto}`,
      `Metros cuadrados: ${metros}`,
      `Presupuesto: ${presupuesto}`,
      `Mensaje: ${mensaje}`,
    ].join("\\n");
  }

  function sendWhatsApp() {
    const text = encodeURIComponent(buildText());
    const href = `https://wa.me/${whatsappPhone}?text=${text}`;
    window.open(href, "_blank");
  }

  function sendEmail() {
    const subject = encodeURIComponent("Solicitud de cotización - Remodelación");
    const body = encodeURIComponent(buildText());
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellido" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30" />
      <input type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="Correo" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30" />
      <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30" />
      <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30" />
      <select value={tipoProyecto} onChange={(e) => setTipoProyecto(e.target.value)} className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30 text-white">
        <option value="">Tipo de proyecto</option>
        <option value="cocina">Cocina</option>
        <option value="baño">Baño</option>
        <option value="sala">Sala</option>
        <option value="closet">Closet</option>
        <option value="completo">Hogar completo</option>
      </select>
      <input value={metros} onChange={(e) => setMetros(e.target.value)} placeholder="Metros cuadrados (m²)" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30" />
      <input value={presupuesto} onChange={(e) => setPresupuesto(e.target.value)} placeholder="Presupuesto estimado" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30" />
      <div className="md:col-span-2">
        <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Cuéntanos sobre tu proyecto..." rows={4} className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-purple-400/30 resize-none" />
      </div>
      <div className="md:col-span-2 flex flex-wrap gap-3">
        <motion.button 
          type="button" 
          onClick={sendWhatsApp} 
          className="w-full md:w-auto px-5 py-3 rounded-md bg-green-500 text-white font-semibold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enviar por WhatsApp
        </motion.button>
        <motion.button 
          type="button" 
          onClick={sendEmail} 
          className="w-full md:w-auto px-5 py-3 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition-colors border border-white/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enviar por Email
        </motion.button>
      </div>
    </form>
  );
}

// Componente: Fondo Animado
function AnimatedBackground({ isMobile }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40" style={{ willChange: 'transform' }}>
      {/* Gradientes radiales animados */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          left: '20%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          right: '10%',
          top: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Formas geométricas - solo desktop */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-[500px] h-[500px] border border-purple-400/10"
            style={{ 
              left: '10%', 
              top: '15%',
              transform: 'rotate(45deg)',
              willChange: 'transform'
            }}
            animate={{ 
              rotate: [45, 75, 45],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border border-purple-400/8"
            style={{ 
              right: '15%', 
              bottom: '20%',
              willChange: 'transform'
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Partículas flotantes */}
      {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            width: '2px',
            height: '2px',
            backgroundColor: 'rgba(147, 51, 234, 0.3)',
            willChange: 'transform, opacity'
          }}
          animate={{ 
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 3 + (i % 4), 
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// ==================== COMPONENTE PRINCIPAL ====================

export default function Design() {
  // Estados principales
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [selectedVintageMedia, setSelectedVintageMedia] = useState(null);
  
  // Referencias
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Configuración
  const WHATSAPP_PHONE = "593963998673";
  const WHATSAPP_MESSAGE = "Hola! Quiero más información sobre remodelación.";
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Paquetes de remodelación
  const packages = [
    {
      id: 'alegria',
      name: 'PAQUETE ALEGRÍA',
      price: '$7,000',
      icon: '🎁',
      subtitle: 'Tu cocina O tu baño, ¡completamente nuevo!',
      note: 'Perfecto para renovar un espacio con estilo y funcionalidad.',
      features: [
        'Diseño 3D personalizado',
        'Construcción completa',
        'Instalación incluida',
        'Garantía de calidad'
      ],
      popular: false
    },
    {
      id: 'abrazo',
      name: 'PAQUETE ABRAZO FAMILIAR',
      price: '$15,000',
      icon: '🏠',
      subtitle: '¡Cocina + Baño O Cocina + Closet!',
      note: 'Transforma dos espacios esenciales de tu hogar con diseño premium.',
      features: [
        'Dos espacios renovados',
        'Diseño 3D personalizado',
        'Construcción completa',
        'Instalación incluida'
      ],
      popular: true
    },
    {
      id: 'hogar',
      name: 'PAQUETE HOGAR FELIZ',
      price: '$25,000',
      icon: '✨',
      subtitle: '¡Tu área social completa (Cocina + Sala)!',
      note: 'El paquete perfecto para crear espacios de convivencia únicos.',
      features: [
        'Transformación total',
        'Diseño 3D personalizado',
        'Construcción premium',
        'Instalación incluida'
      ],
      popular: false
    }
  ];

  // Planes de financiamiento
  const financingPlans = [
    { months: 24, monthly: '$341' },
    { months: 36, monthly: '$246' },
    { months: 48, monthly: '$197' },
    { months: 60, monthly: '$166' }
  ];

  // Testimonios
  const testimonials = [
    {
      id: 1,
      quote: "¡La mejor inversión que hicimos!",
      author: "Familia González",
      project: "Cocina nueva para las fiestas",
      image: "/imagenes morado/3.png"
    },
    {
      id: 2,
      quote: "Empezamos el año organizados",
      author: "Familia Martínez",
      project: "Closet de ensueño",
      image: "/imagenes morado/4.png"
    },
    {
      id: 3,
      quote: "⭐ ¡No puedo creer que sea mi baño!",
      author: "Familia Rodríguez",
      project: "Transformación total",
      image: "/imagenes morado/5.png"
    }
  ];

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
  
  // Detectar móvil para optimización
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

  // Autoplay inteligente del video hero
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

  // Función para alternar sonido
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedPackage !== null || selectedTestimonial !== null || selectedVintageMedia !== null) {
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
  }, [selectedPackage, selectedTestimonial, selectedVintageMedia]);

  // ==================== RENDER ====================
  
  return (
    <>
      <main 
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0b0b0f] to-[#0f0f14] text-white relative overflow-hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Fondo animado */}
        <AnimatedBackground isMobile={isMobile} />

        {/* ==================== NAVEGACIÓN ==================== */}
        <motion.header
          className={[
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg" : "bg-transparent",
          ].join(" ")}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
            {/* Logo/Volver */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className={[
                  "flex items-center gap-2 font-semibold transition-colors",
                  scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
                ].join(" ")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver a inicio
              </Link>
            </motion.div>

            {/* Logo central */}
            <div className={[
              "absolute left-1/2 -translate-x-1/2 text-center font-bold tracking-wider text-sm md:text-base",
              scrolled ? "text-gray-800" : "text-white"
            ].join(" ")}>
              REMODELACIÓN<br />DE INTERIORES
            </div>
            
            {/* Navegación desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <motion.a 
                href="#proceso" 
                className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}
                whileHover={{ y: -2 }}
              >
                Proceso
              </motion.a>
              <motion.a 
                href="#paquetes" 
                className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}
                whileHover={{ y: -2 }}
              >
                Paquetes
              </motion.a>
              <motion.a 
                href="#financiamiento" 
                className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}
                whileHover={{ y: -2 }}
              >
                Financiamiento
              </motion.a>
              <motion.a 
                href="#contacto" 
                className={[
                  "px-3 py-1.5 rounded-lg border transition-all",
                  scrolled ? "border-gray-300 text-gray-800 hover:bg-gray-50" : "border-white/50 text-white hover:bg-white/10"
                ].join(" ")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contacto
              </motion.a>
            </nav>

            {/* Menú móvil */}
            <motion.button
              type="button"
              className={[
                "md:hidden p-2 rounded-md transition-colors",
                scrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
              ].join(" ")}
              aria-label="Abrir menú"
              onClick={() => setMobileOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          {/* Menú móvil expandido */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div 
                className={[
                  "md:hidden border-t",
                  scrolled ? "bg-white/95 border-gray-200" : "bg-black/60 backdrop-blur-md border-white/10"
                ].join(" ")}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm">
                  <a onClick={() => setMobileOpen(false)} href="#proceso" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Proceso</a>
                  <a onClick={() => setMobileOpen(false)} href="#paquetes" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Paquetes</a>
                  <a onClick={() => setMobileOpen(false)} href="#financiamiento" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Financiamiento</a>
                  <a onClick={() => setMobileOpen(false)} href="#testimonios" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Testimonios</a>
                  <a onClick={() => setMobileOpen(false)} href="#contacto" className={["px-3 py-2 rounded-md border text-center", scrolled ? "border-gray-300 text-gray-800" : "border-white/50 text-white"].join(" ")}>Contacto</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ==================== HERO SECTION ==================== */}
        <section className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
          {/* Video de fondo */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              src="/imagenes morado/remodelacion/RESTAURANTE.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{ filter: 'brightness(0.5)' }}
            />
            
            {/* Botón de sonido flotante */}
            <motion.button
              onClick={toggleMute}
              className="absolute bottom-8 left-8 z-20 p-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 transition-all shadow-xl"
              aria-label={isMuted ? "Activar sonido" : "Desactivar sonido"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <span className="text-2xl">
                {isMuted ? "🔇" : "🔊"}
              </span>
            </motion.button>
            
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </div>

          {/* Contenido Hero */}
          <div className="relative z-10 px-6 py-20 md:py-32">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Transformamos tu hogar
                  </span>
                  <br />
                  <span className="text-white">
                    En el espacio perfecto que siempre soñaste
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-4 font-semibold">
                  Procesa Design: Donde el diseño se encuentra con la perfección
                </p>
                <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-12">
                  Espacios únicos diseñados a tu medida. Calidad premium con financiamiento flexible para hacer realidad tu proyecto ideal.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.a
                  href="#paquetes"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold hover:from-purple-400 hover:to-purple-500 transition-all shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Paquetes
                </motion.a>
                <motion.a
                  href="#contacto"
                  className="px-8 py-4 rounded-xl border-2 border-white/50 text-white font-bold hover:bg-white/10 backdrop-blur-sm transition-all"
                  whileHover={{ scale: 1.05, y: -2, borderColor: 'rgba(255, 255, 255, 0.8)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Agendar Visita GRATIS
                </motion.a>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <span className="text-sm text-purple-400/70">Descubre más</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== PROCESO: 3 PASOS ==================== */}
        <motion.section 
          id="proceso"
          className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                Nuestro Proceso
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/70 max-w-2xl mx-auto">
                Tres simples pasos para transformar tu hogar
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Paso 1: DISEÑAMOS */}
              <motion.div 
                variants={fadeInUp}
                className="relative rounded-3xl border-2 border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-transparent p-8 hover:border-purple-400/40 transition-all group"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">✨</div>
                <div className="text-2xl font-bold text-white mb-3">1. DISEÑAMOS</div>
                <p className="text-white/80">Hacemos tu sueño realidad en 3D.</p>
              </motion.div>

              {/* Paso 2: CONSTRUIMOS */}
              <motion.div 
                variants={fadeInUp}
                className="relative rounded-3xl border-2 border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-transparent p-8 hover:border-purple-400/40 transition-all group"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🏠</div>
                <div className="text-2xl font-bold text-white mb-3">2. CONSTRUIMOS</div>
                <p className="text-white/80">Somos fabricantes y lo hacemos rápido y bien.</p>
              </motion.div>

              {/* Paso 3: FINANCIAMOS */}
              <motion.div 
                variants={fadeInUp}
                className="relative rounded-3xl border-2 border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-transparent p-8 hover:border-purple-400/40 transition-all group"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">✅</div>
                <div className="text-2xl font-bold text-white mb-3">3. FINANCIAMOS</div>
                <p className="text-white/80">¿Lo pagas cómodamente el próximo año!</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ==================== PAQUETES ==================== */}
        <motion.section 
          id="paquetes"
          className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-gradient-to-b from-purple-950/20 to-transparent"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full bg-purple-400/10 border border-purple-400/20 mb-4">
                <span className="text-purple-400 text-sm font-semibold">Paquetes Especiales</span>
              </div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                Elige el regalo perfecto para tu familia
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  variants={fadeInUp}
                  className={[
                    "relative rounded-3xl border-2 p-8 transition-all cursor-pointer group",
                    pkg.popular 
                      ? "border-orange-400/60 bg-gradient-to-br from-orange-500/20 via-purple-500/10 to-transparent" 
                      : "border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-transparent hover:border-purple-400/40"
                  ].join(" ")}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                      MÁS POPULAR
                    </div>
                  )}

                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{pkg.icon}</div>
                  <div className="text-xl font-bold text-white mb-2">{pkg.name}</div>
                  <div className={["text-4xl font-extrabold mb-4", pkg.popular ? "text-orange-400" : "text-purple-400"].join(" ")}>{pkg.price}</div>
                  <div className="text-white/90 mb-2 font-semibold">{pkg.subtitle}</div>
                  <div className="text-sm text-white/60 italic mb-6">{pkg.note}</div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    className={[
                      "w-full py-3 rounded-xl font-bold transition-all",
                      pkg.popular 
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-400 hover:to-orange-500" 
                        : "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500"
                    ].join(" ")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ¡Lo quiero!
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ==================== FINANCIAMIENTO ==================== */}
        <motion.section 
          id="financiamiento"
          className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-12">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                No es un gasto, es la mejor inversión en tu familia
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-purple-300">
                Tu PAQUETE ALEGRÍA de $7,000 puede ser tuyo:
              </motion.p>
            </motion.div>

            <motion.div 
              variants={scaleIn}
              className="rounded-3xl border-2 border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-transparent overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white">Planes de Financiamiento</h3>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center text-white/60 font-semibold">Plazo</div>
                  <div className="text-center text-white/60 font-semibold">Cuota Mensual Aprox.*</div>
                </div>

                {financingPlans.map((plan, i) => (
                  <motion.div 
                    key={i}
                    className="grid grid-cols-2 gap-4 py-4 border-t border-white/10 hover:bg-purple-500/5 transition-colors"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-center text-white font-medium">{plan.months} meses</div>
                    <div className="text-center text-orange-400 font-bold text-xl">{plan.monthly}</div>
                  </motion.div>
                ))}

                <div className="mt-8 text-center text-sm text-white/50">
                  *Cuotas aproximadas. Sujetas a aprobación de la entidad financiera.
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 text-center">
              <p className="text-lg text-white/90 mb-2">
                Por solo <span className="text-orange-400 font-bold text-2xl">$166 al mes</span>, 
                puedes transformar tu hogar en el espacio perfecto que mereces.
              </p>
              <p className="text-white/70">
                ¡Invierte en calidad de vida con cuotas cómodas!
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ==================== PROYECTOS REALES ==================== */}
        <motion.section 
          id="proyectos"
          className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-gradient-to-b from-transparent to-purple-950/20"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full bg-purple-400/10 border border-purple-400/20 mb-4">
                <span className="text-purple-400 text-sm font-semibold">Portfolio</span>
              </div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                Proyectos Reales que Transforman Espacios
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/70 max-w-2xl mx-auto">
                Cada proyecto es una historia de transformación, diseño y perfección
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a24]/90 to-[#0f0f14]/90 hover:border-purple-400/30 transition-all"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <video
                      src={project.video}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-purple-500/90 backdrop-blur-sm border border-purple-400/30">
                      <span className="text-white text-xs font-semibold">{project.type}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Galería vintage */}
            <motion.div variants={fadeIn} className="mt-16">
              <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
                Galería de Proyectos Vintage
              </motion.h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vintageImages.slice(0, 8).map((image, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/30 transition-all group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={image}
                      alt={`Proyecto vintage ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-purple-500/90 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ==================== TESTIMONIOS ==================== */}
        <motion.section 
          id="testimonios"
          className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeIn} className="text-center mb-12">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                Familias Felices que ya viven el cambio
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-orange-300">
                No vendemos remodelaciones, vendemos bienestar y hogares felices
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <motion.button
                  key={testimonial.id}
                  variants={fadeInUp}
                  className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a24]/90 to-[#0f0f14]/90 hover:border-purple-400/30 transition-all group cursor-pointer text-left"
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-xl font-bold text-white mb-2">{testimonial.quote}</div>
                    <div className="text-purple-300 font-semibold mb-1">{testimonial.author}</div>
                    <div className="text-sm text-white/60">{testimonial.project}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ¡Tú también puedes ser la próxima familia feliz!
              </h3>
              <motion.a
                href="#contacto"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold hover:from-purple-400 hover:to-purple-500 transition-all shadow-2xl shadow-purple-500/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Agenda tu visita GRATIS
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* ==================== CONTACTO ==================== */}
        <motion.section 
          id="contacto" 
          className="relative px-6 md:px-10 lg:px-16 py-20 md:py-32"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-7xl mx-auto relative">
            <motion.div 
              className="relative overflow-hidden rounded-3xl border-2 border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-purple-300/5 to-transparent"
              variants={scaleIn}
            >
              {/* Decoraciones de fondo */}
              <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-400/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl" />
              
              <div className="relative z-10 grid md:grid-cols-5 gap-8 md:gap-12 p-8 md:p-12 lg:p-16">
                {/* Columna izquierda: Información */}
                <motion.div className="md:col-span-2 space-y-6" variants={slideInLeft}>
                  <div>
                    <div className="inline-block px-4 py-2 rounded-full bg-purple-400/20 border border-purple-400/30 mb-4">
                      <span className="text-purple-400 text-sm font-semibold">Contáctanos</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                      Agenda tu visita GRATIS
                    </h3>
                    <p className="text-white/80 mt-3 text-lg">
                      Cuéntanos sobre tu proyecto. Te respondemos en menos de 24 horas.
                    </p>
                  </div>

                  {/* Beneficios */}
                  <div className="space-y-3">
                    {[
                      { icon: "✨", text: "Diseño 3D personalizado" },
                      { icon: "🏗️", text: "Construcción completa" },
                      { icon: "💳", text: "Financiamiento flexible" },
                      { icon: "⚡", text: "Ejecución rápida" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center gap-3 text-white/90"
                        variants={fadeInUp}
                      >
                        <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center text-xl">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contacto directo */}
                  <motion.div variants={fadeIn} className="pt-6 border-t border-white/10">
                    <p className="text-sm text-white/60 mb-2">También puedes escribirnos a:</p>
                    <a 
                      className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-2 transition-colors" 
                      href="mailto:contacto@procesa.studio"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      contacto@procesa.studio
                    </a>
                  </motion.div>
                </motion.div>

                {/* Columna derecha: Formulario */}
                <motion.div className="md:col-span-3" variants={slideInRight}>
                  <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 shadow-2xl">
                    <CotizacionForm whatsappPhone={WHATSAPP_PHONE} email="contacto@procesa.studio" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ==================== FOOTER ==================== */}
        <motion.footer
          className="relative px-6 md:px-10 lg:px-16 py-16 border-t border-white/10 bg-gradient-to-b from-[#0b0b0f] to-[#08080c] overflow-hidden"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Logo y descripción */}
              <motion.div className="md:col-span-2" variants={fadeInUp}>
                <div className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                  PROCESA
                </div>
                <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
                  Transformando hogares, creando felicidad. Más de 20 años diseñando y construyendo espacios que mejoran la vida de las familias ecuatorianas.
                </p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500/20 border border-white/20 hover:border-green-500/50 flex items-center justify-center text-white hover:text-green-400 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </motion.a>
                </div>
              </motion.div>

              {/* Enlaces rápidos */}
              <motion.div variants={fadeInUp}>
                <h4 className="text-white font-bold mb-4">Enlaces</h4>
                <nav className="flex flex-col gap-3 text-sm">
                  {[
                    { href: "#proceso", label: "Nuestro Proceso" },
                    { href: "#paquetes", label: "Paquetes" },
                    { href: "#financiamiento", label: "Financiamiento" },
                    { href: "#testimonios", label: "Testimonios" }
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="text-white/70 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-400/50 group-hover:bg-purple-400 transition-colors" />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </motion.div>

              {/* Contacto */}
              <motion.div variants={fadeInUp}>
                <h4 className="text-white font-bold mb-4">Contacto</h4>
                <div className="flex flex-col gap-3 text-sm">
                  <a 
                    href="mailto:contacto@procesa.studio" 
                    className="text-white/70 hover:text-purple-400 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contacto@procesa.studio
                  </a>
                  <a 
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-green-400 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div variants={fadeIn} className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            {/* Copyright */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50"
            >
              <p>© {new Date().getFullYear()} PROCESA. Todos los derechos reservados.</p>
              <p>Transformando hogares con ❤️ en Ecuador</p>
            </motion.div>
          </div>
        </motion.footer>

        {/* Estilos */}
        <style>{`
          @keyframes wa-float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
          @keyframes logoMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </main>

      {/* ==================== BOTONES FLOTANTES FIJOS (FUERA DEL MAIN) ==================== */}
      {/* Botón flotante Industrias Vintage */}
      <Link 
        to="/design/vintage" 
        className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-[9999]"
        style={{ position: 'fixed' }}
      >
        <motion.div
          className="group cursor-pointer relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulso de fondo animado */}
          <motion.div
            className="absolute inset-0 rounded-full bg-amber-500/30"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative">
            {/* Mensaje flotante animado */}
            <motion.div 
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                x: [20, 0, 0, -10],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.1, 0.8, 1]
              }}
            >
              <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 backdrop-blur-md border-2 border-amber-400/50 shadow-2xl whitespace-nowrap">
                <div className="text-white font-bold text-sm md:text-base flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  Conoce a Industria Vintage
                  <span className="text-xl">👉</span>
                </div>
              </div>
              {/* Flecha apuntando al botón */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-amber-600"></div>
            </motion.div>

            {/* Badge "NUEVO" */}
            <motion.div 
              className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold z-10 shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              VINTAGE
            </motion.div>
            
            {/* Botón principal */}
            <motion.div 
              className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center shadow-2xl shadow-amber-500/40 border-2 border-amber-400/50 group-hover:shadow-amber-500/60 transition-all relative overflow-hidden"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Brillo interno animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="text-3xl md:text-4xl filter drop-shadow-lg relative z-10">✨</span>
            </motion.div>
            
            {/* Tooltip al hover */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
              <div className="px-4 py-2 rounded-lg bg-amber-900/95 backdrop-blur-sm border border-amber-600/50 text-white text-sm font-semibold shadow-xl">
                Click para ver más
              </div>
            </div>
          </div>
        </motion.div>
      </Link>

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
          decoding="async"
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

      {/* ==================== MODAL DE PAQUETE (FUERA DEL MAIN) ==================== */}
      <AnimatePresence mode="wait">
        {selectedPackage !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'auto'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div 
              className="relative max-w-2xl w-full" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={() => setSelectedPackage(null)}
                className="absolute -top-14 right-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all flex items-center gap-2 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="relative rounded-2xl overflow-hidden border-2 border-purple-400/40 bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-7xl mb-4">{selectedPackage.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedPackage.name}</h3>
                  <div className="text-5xl font-extrabold text-purple-400 mb-4">{selectedPackage.price}</div>
                  <p className="text-xl text-white/90 mb-2">{selectedPackage.subtitle}</p>
                  <p className="text-sm text-white/60 italic">{selectedPackage.note}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold text-white mb-4">Incluye:</h4>
                  <ul className="space-y-3">
                    {selectedPackage.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.a
                  href="#contacto"
                  onClick={() => setSelectedPackage(null)}
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center font-bold hover:from-purple-400 hover:to-purple-500 transition-all shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ¡Lo quiero! Agendar visita GRATIS
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ==================== MODAL VISTA DE MEDIO VINTAGE (FUERA DEL MAIN) ==================== */}
      <AnimatePresence mode="wait">
        {selectedVintageMedia !== null && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'auto'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVintageMedia(null)}
          >
            <motion.div 
              className="relative max-w-6xl w-full" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={() => setSelectedVintageMedia(null)}
                className="absolute -top-14 right-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all flex items-center gap-2 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/40 bg-black shadow-2xl">
                {selectedVintageMedia?.type === 'video' ? (
                  <video
                    src={selectedVintageMedia.src}
                    className="w-full max-h-[80vh] object-contain"
                    controls
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={selectedVintageMedia?.src}
                    alt="Vista ampliada"
                    className="w-full max-h-[80vh] object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL DE TESTIMONIO (FUERA DEL MAIN) ==================== */}
      <AnimatePresence mode="wait">
        {selectedTestimonial !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'auto'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div 
              className="relative max-w-4xl w-full" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute -top-14 right-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all flex items-center gap-2 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cerrar
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="relative rounded-2xl overflow-hidden border-2 border-purple-400/40 bg-black shadow-2xl">
                <img
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.author}
                  className="w-full h-[60vh] md:h-[70vh] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-3">{selectedTestimonial.quote}</div>
                  <div className="text-xl text-purple-300 font-semibold mb-2">{selectedTestimonial.author}</div>
                  <div className="text-white/70">{selectedTestimonial.project}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
