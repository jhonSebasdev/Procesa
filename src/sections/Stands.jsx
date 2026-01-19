import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { projects } from "./projectsData";
import { premiosImages, imageProjects } from "./imagesManifest";

// ==================== COMPONENTES AUXILIARES ====================

// Componente: Formulario de Cotización
function CotizacionForm({ whatsappPhone, email }) {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [fecha, setFecha] = useState("");
  const [metros, setMetros] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [mensaje, setMensaje] = useState("");

  function buildText() {
    return [
      `Solicitud de cotización`,
      `Nombre: ${nombre}`,
      `Empresa: ${empresa}`,
      `Email: ${emailValue}`,
      `Teléfono: ${telefono}`,
      `Ciudad: ${ciudad}`,
      `Fecha del evento: ${fecha}`,
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
    const subject = encodeURIComponent("Solicitud de cotización de stand");
    const body = encodeURIComponent(buildText());
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellido" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Empresa" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <input type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="Correo" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} placeholder="Fecha del evento" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <input value={metros} onChange={(e) => setMetros(e.target.value)} placeholder="Metros cuadrados (m²)" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <input value={presupuesto} onChange={(e) => setPresupuesto(e.target.value)} placeholder="Presupuesto estimado" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30" />
      <div className="md:col-span-2">
        <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Cuéntanos sobre el proyecto..." rows={4} className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30 transition-all focus:ring-2 focus:ring-yellow-400/30 resize-none" />
      </div>
      <div className="md:col-span-2 flex flex-wrap gap-3">
        <motion.button 
          type="button" 
          onClick={sendWhatsApp} 
          className="w-full md:w-auto px-5 py-3 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20"
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

// Componente: Video con Autoplay
function AutoplayVideo({ src, startAt = 0 }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      try {
        v.currentTime = startAt;
      } catch {}
      v.play().catch(() => {});
    };
    v.addEventListener("loadedmetadata", onLoaded, { once: true });
    return () => v.removeEventListener("loadedmetadata", onLoaded);
  }, [startAt]);
  return (
    <video
      ref={videoRef}
      src={src}
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    />
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
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)',
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
            className="absolute w-[500px] h-[500px] border border-yellow-400/10"
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
            className="absolute w-[400px] h-[400px] rounded-full border border-yellow-400/8"
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
            backgroundColor: 'rgba(234, 179, 8, 0.3)',
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

export default function Stands() {
  // Estados principales
  const [scrolled, setScrolled] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [awardLightboxIndex, setAwardLightboxIndex] = useState(null);
  const [category, setCategory] = useState("Todos");
  
  // Referencias
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Configuración
  const WHATSAPP_PHONE = "593963998673";
  const WHATSAPP_MESSAGE = "Hola! Quiero más información sobre stands.";
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Hero media
  const initialHeroMedia = ["/videos/home_video_stands.mp4"];
  const [heroMedia, setHeroMedia] = useState(initialHeroMedia);
  const [heroIdx, setHeroIdx] = useState(0);
  // Datos
  const trustedLogos = [
    "/imagenes/clientes que confiaron/2.png",
    "/imagenes/clientes que confiaron/afsd.png",
    "/imagenes/clientes que confiaron/Screenshot 2026-01-10 185805.png",
    "/imagenes/clientes que confiaron/Screenshot 2026-01-10 185842.png",
    "/imagenes/clientes que confiaron/Screenshot 2026-01-10 185910.png",
    "/imagenes/clientes que confiaron/Screenshot 2026-01-10 185937.png",
    "/imagenes/clientes que confiaron/Screenshot 2026-01-10 190207.png",
    "/imagenes/clientes que confiaron/swer.png",
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

  const featuredProjects = projects;

  function getCategory(title = "") {
    const t = (title || "").toLowerCase();
    if (/(renault|nissan|mercedes|audi|baic|foton)/.test(t)) return "Auto";
    if (/(agrocoex|floreloy|florisol|rose|elite|rosen|kolster)/.test(t)) return "Florícola";
    if (/(produbanco|banco)/.test(t)) return "Banca";
    if (/(general|cablec|industria)/.test(t)) return "Industria";
    return "Eventos";
  }
  const categories = ["Todos", "Auto", "Florícola", "Banca", "Industria", "Eventos"];
  const filteredProjects = featuredProjects.filter((p) =>
    category === "Todos" ? true : getCategory(p.title) === category
  );

  const records = [
    { title: "Rumbo al infinito de la arquitectura", desc: "Reflexiones sobre espacios y futuro", image: "/imagenes/logo.png" },
    { title: "Procesos sostenibles", desc: "Materiales y estrategias eco", image: "/imagenes/logo.png" },
    { title: "Experiencias inmersivas", desc: "Tecnología aplicada a stands", image: "/imagenes/logo.png" },
  ];
  const awards = [
    { year: "2024", title: "Best Experiential Design", org: "ExpoGlobal Awards" },
    { year: "2023", title: "Mejor Stand Internacional", org: "Feria Innovar" },
    { year: "2022", title: "Gold Award – Brand Activation", org: "Design Summit" },
    { year: "2021", title: "Sustentabilidad y Materialidad", org: "Eco Build Prize" },
  ];

  const currentProject = filteredProjects[projectIndex] ?? filteredProjects[0] ?? featuredProjects[0];

  // Secciones repetidas tipo "premios", con color amarillo y fotos aleatorias por carpeta
  const highlightProjects = useMemo(() => {
    const top = [...imageProjects]
      .sort((a, b) => (b.images?.length ?? 0) - (a.images?.length ?? 0))
      .slice(0, 3)
      .map((p) => {
        const imgs = (p.images || []).filter((src) => !/\.webm$|\.mp4$|\.ogg$|\.mov$/i.test(src));
        const img = imgs.length ? imgs[Math.floor(Math.random() * imgs.length)] : "/imagenes/amarillo.jpg";
        return { project: p, img };
      });
    return top;
  }, []);

  // Autoplay proyectos cada 3s
  useEffect(() => {
    const id = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % (filteredProjects.length || 1));
    }, 3000);
    return () => clearInterval(id);
  }, [filteredProjects.length]);

  useEffect(() => {
    setProjectIndex(0);
  }, [category]);

  useEffect(() => {
    function onKey(e) {
      if (awardLightboxIndex === null) return;
      if (e.key === "Escape") setAwardLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setAwardLightboxIndex((i) => (i + 1) % premiosImages.length);
      }
      if (e.key === "ArrowLeft") {
        setAwardLightboxIndex((i) => (i - 1 + premiosImages.length) % premiosImages.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [awardLightboxIndex]);

  // Solo un video, no necesita shuffle ni autoplay
  useEffect(() => {
    setHeroMedia(initialHeroMedia);
    setHeroIdx(0);
  }, []);

  // Autoplay inteligente: intenta con sonido, si falla reproduce sin sonido
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Primero intenta reproducir con sonido
    video.muted = false;
    video.play()
      .catch(() => {
        // Si el navegador bloquea, reproduce sin sonido
        video.muted = true;
        setIsMuted(true);
        video.play();
      });
  }, []);

  // Función para alternar sonido
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ==================== RENDER ====================
  
  return (
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
            DISEÑO<br />COMERCIAL
          </div>
          
          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <motion.a 
              href="#sobre" 
              className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}
              whileHover={{ y: -2 }}
            >
              Sobre
            </motion.a>
            <motion.a 
              href="#proyectos" 
              className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}
              whileHover={{ y: -2 }}
            >
              Proyectos
            </motion.a>
            <motion.div whileHover={{ y: -2 }}>
              <Link 
                to="/stands/timeline" 
                className={[
                  "px-3 py-1.5 rounded-lg border transition-all",
                  scrolled 
                    ? "border-yellow-400 text-gray-800 hover:bg-yellow-400/10" 
                    : "border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
                ].join(" ")}
              >
                Línea de tiempo
              </Link>
            </motion.div>
            <motion.a 
              href="#premios" 
              className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}
              whileHover={{ y: -2 }}
            >
              Premios
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
                <a onClick={() => setMobileOpen(false)} href="#sobre" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Sobre</a>
                <a onClick={() => setMobileOpen(false)} href="#proyectos" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Proyectos</a>
                <Link onClick={() => setMobileOpen(false)} to="/stands/timeline" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-yellow-400 hover:text-yellow-300"].join(" ")}>Línea de tiempo</Link>
                <a onClick={() => setMobileOpen(false)} href="#premios" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Premios</a>
                <a onClick={() => setMobileOpen(false)} href="#testimonios" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Testimonios</a>
                <a onClick={() => setMobileOpen(false)} href="#clientes" className={[scrolled ? "text-gray-800 hover:text-gray-900" : "text-white hover:text-white/80"].join(" ")}>Clientes</a>
                <a onClick={() => setMobileOpen(false)} href="#contacto" className={["px-3 py-2 rounded-md border text-center", scrolled ? "border-gray-300 text-gray-800" : "border-white/50 text-white"].join(" ")}>Contacto</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen pt-16 overflow-hidden">
        {/* Video de fondo */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait" initial={false}>
            {heroMedia.length > 0 && (
              <motion.div
                key={`hero-${heroIdx}-${heroMedia[heroIdx]}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {(() => {
                  const src = heroMedia[heroIdx];
                  const isVideo = /\.mp4$|\.webm$|\.ogg$/i.test(src) || src.includes("/videos/");
                  if (isVideo) {
                    return (
                      <>
                        <video
                          ref={videoRef}
                          src={src}
                          className="w-full h-full object-cover"
                          loop
                          playsInline
                          style={{ filter: 'brightness(0.7)' }}
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
                      </>
                    );
                  }
                  return (
                    <img
                      src={src}
                      alt="Slide destacado"
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                      style={{ filter: 'brightness(0.7)' }}
                    />
                  );
                })()}
                
                {/* Gradientes overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-tight">
                Diseño Comercial
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 leading-relaxed">
                Transformamos espacios en experiencias memorables
              </p>
              <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-12">
                Más de 23 años diseñando y construyendo stands que conectan marcas con personas, 
                creando momentos inolvidables en cada feria y evento.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href="#proyectos"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Proyectos
              </motion.a>
              <motion.a
                href="#contacto"
                className="px-8 py-4 rounded-xl border-2 border-white/50 text-white font-bold hover:bg-white/10 backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.05, y: -2, borderColor: 'rgba(255, 255, 255, 0.8)' }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar Cotización
              </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-16 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <span className="text-sm text-yellow-400/70">Descubre más</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SOBRE NOSOTROS ==================== */}
      <motion.section 
        id="sobre" 
        className="relative px-6 md:px-10 lg:px-16 py-24 md:py-32 overflow-hidden"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Texto */}
            <motion.div variants={slideInLeft}>
              <motion.div variants={fadeIn} className="inline-block px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-6">
                <span className="text-yellow-400 text-sm font-semibold">23+ Años de Excelencia</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                Sobre nosotros
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/80 mb-6 leading-relaxed">
                Combinamos la creatividad del diseño con la técnica y la tecnología de la construcción para lograr lo sorprendente.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-base text-white/70 leading-relaxed">
                Resolvemos necesidades comerciales a través de arquitectura efímera y experiencias memorables que conectan marcas con personas.
              </motion.p>
            </motion.div>

            {/* Estadísticas */}
            <motion.div variants={slideInRight}>
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/5 to-transparent p-8 hover:border-yellow-400/40 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">23+</div>
                  <div className="text-sm text-white/70">Años de Experiencia</div>
                </motion.div>
                
                <motion.div 
                  className="rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/5 to-transparent p-8 hover:border-yellow-400/40 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">500+</div>
                  <div className="text-sm text-white/70">Proyectos Realizados</div>
                </motion.div>
                
                <motion.div 
                  className="rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/5 to-transparent p-8 hover:border-yellow-400/40 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">15+</div>
                  <div className="text-sm text-white/70">Premios Ganados</div>
                </motion.div>
                
                <motion.div 
                  className="rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/5 to-transparent p-8 hover:border-yellow-400/40 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">100%</div>
                  <div className="text-sm text-white/70">Satisfacción</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ==================== TESTIMONIOS ==================== */}
      <motion.section 
        id="testimonios" 
        className="px-6 md:px-10 lg:px-16 py-20 md:py-28"
        variants={stagger} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-12">
            <motion.div variants={fadeIn} className="inline-block px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-4">
              <span className="text-yellow-400 text-sm font-semibold">Testimonios</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Lo que dicen nuestros clientes
            </motion.h2>
          </motion.div>

          {/* Grid de testimonios */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.blockquote 
              variants={fadeInUp} 
              className="rounded-2xl border border-white/10 p-8 bg-gradient-to-br from-[#1a1a24]/90 to-[#0f0f14]/90 hover:border-yellow-400/30 transition-all group"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4 text-yellow-400/30 group-hover:text-yellow-400/50 transition-colors">❝</div>
              <p className="text-white/90 mb-6 leading-relaxed">Ejecutaron nuestro stand con precisión y a tiempo. La calidad fue sobresaliente.</p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold">
                  GM
                </div>
                <div>
                  <div className="font-semibold text-white/90">Gerente de Marketing</div>
                  <div className="text-sm text-white/60">Automotriz</div>
                </div>
              </footer>
            </motion.blockquote>

            <motion.blockquote 
              variants={fadeInUp} 
              className="rounded-2xl border border-white/10 p-8 bg-gradient-to-br from-[#1a1a24]/90 to-[#0f0f14]/90 hover:border-yellow-400/30 transition-all group"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4 text-yellow-400/30 group-hover:text-yellow-400/50 transition-colors">❝</div>
              <p className="text-white/90 mb-6 leading-relaxed">Diseño, logística y montaje impecables. Superaron expectativas.</p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold">
                  BM
                </div>
                <div>
                  <div className="font-semibold text-white/90">Brand Manager</div>
                  <div className="text-sm text-white/60">Banca</div>
                </div>
              </footer>
            </motion.blockquote>

            <motion.blockquote 
              variants={fadeInUp} 
              className="rounded-2xl border border-white/10 p-8 bg-gradient-to-br from-[#1a1a24]/90 to-[#0f0f14]/90 hover:border-yellow-400/30 transition-all group"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4 text-yellow-400/30 group-hover:text-yellow-400/50 transition-colors">❝</div>
              <p className="text-white/90 mb-6 leading-relaxed">Gran equipo, comunicación clara y resultados que impactan.</p>
              <footer className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold">
                  CM
                </div>
                <div>
                  <div className="font-semibold text-white/90">CMO</div>
                  <div className="text-sm text-white/60">Florícola</div>
                </div>
              </footer>
            </motion.blockquote>
          </div>

          {/* Carrusel de logos de clientes */}
          <motion.div variants={scaleIn} className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a24]/50 to-[#0f0f14]/50">
            <div className="relative py-8">
              <div className="flex gap-12 items-center animate-[logoMarquee_40s_linear_infinite]">
                {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((src, i) => (
                  <motion.img 
                    key={i} 
                    src={src} 
                    alt={`logo-${i}`} 
                    className="h-16 sm:h-20 md:h-24 object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
                    loading="lazy" 
                    decoding="async"
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== PROYECTOS DESTACADOS ==================== */}
      <motion.section 
        id="proyectos" 
        className="relative py-20 md:py-28" 
        variants={stagger} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Header */}
          <div className="mb-8">
            <motion.div variants={fadeIn} className="flex items-center justify-between mb-6">
              <div className="inline-block px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                <span className="text-yellow-400 text-sm font-semibold">Portfolio</span>
              </div>
              <div className="text-xs tracking-[0.3em] uppercase text-white/50">
                Proyectos Destacados
              </div>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent"
            >
              {currentProject.title}
            </motion.h2>
          </div>

          {/* Filtros por industria */}
          <motion.div variants={fadeIn} className="mb-8 overflow-x-auto scrollbar-hide">
            <div className="inline-flex gap-3 min-w-full sm:min-w-0">
              {categories.map((c) => (
                <motion.button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={[
                    "px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all whitespace-nowrap",
                    category === c
                      ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/30"
                      : "bg-transparent text-white/80 border-white/20 hover:border-yellow-400/50 hover:text-white",
                  ].join(" ")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Imagen principal del proyecto */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={projectIndex}
                className="relative h-[60vh] md:h-[75vh] lg:h-[85vh] rounded-3xl overflow-hidden border-2 border-white/10 hover:border-yellow-400/30 transition-all cursor-pointer group"
                onClick={() => navigate(`/stands/project/${currentProject.slug}`)}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01 }}
              >
                <motion.img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Info overlay */}
                {(currentProject.year || currentProject.location) && (
                  <motion.div 
                    className="absolute bottom-6 left-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="inline-block px-4 py-2 rounded-full bg-yellow-400/90 backdrop-blur-sm mb-3">
                      <span className="text-black font-bold text-sm">
                        {[currentProject.year, currentProject.location].filter(Boolean).join(" · ")}
                      </span>
                    </div>
                  </motion.div>
                )}
                
                {/* Ver más indicator */}
                <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-white text-sm font-semibold flex items-center gap-2">
                    Ver proyecto
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles de navegación */}
            <motion.button
              type="button"
              aria-label="Proyecto anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all z-10"
              onClick={() => setProjectIndex((prev) => (prev - 1 + filteredProjects.length) % (filteredProjects.length || 1))}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L10.06 12l5.72 5.72c.3.3.3.77 0 1.06Z" clipRule="evenodd" />
              </svg>
            </motion.button>
            
            <motion.button
              type="button"
              aria-label="Siguiente proyecto"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all z-10"
              onClick={() => setProjectIndex((prev) => (prev + 1) % (filteredProjects.length || 1))}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 0 1 1.06 0l6 6c.3.3.3.77 0 1.06l-6 6a.75.75 0 0 1-1.06-1.06L13.94 12 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>

          {/* Paginación numérica */}
          <motion.div 
            className="mt-8 flex items-center justify-center md:justify-end gap-2 overflow-x-auto scrollbar-hide"
            variants={fadeIn}
          >
            {filteredProjects.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                className={[
                  "flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg text-sm md:text-base font-semibold grid place-items-center transition-all",
                  i === projectIndex 
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/30" 
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
                ].join(" ")}
                onClick={() => setProjectIndex(i)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {i + 1}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Video Stands (full screen en la mitad, entre Proyectos y Clientes) */}
      <motion.section id="video-stands" className="relative min-h-[100vh]" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="absolute inset-0">
          <AutoplayVideo src="/imagenes/videos stands/0110.mp4" startAt={70} />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
      </motion.section>

      {/* Colecciones destacadas (repetición estilo premios, amarillo, imágenes aleatorias) */}
      {highlightProjects.map(({ project, img }, idx) => (
        <motion.section key={project.slug + idx} className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <div className="max-w-7xl mx-auto relative">
            <motion.div variants={scaleIn} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f14]">
              <motion.img
                variants={fadeIn}
                src={img}
                alt={project.title}
                className="w-full h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <div className="mt-6 md:mt-0 md:absolute md:inset-0 md:flex md:items-start">
              <div className="md:ml-[6%] md:mt-[6%] lg:ml-[8%] lg:mt-[8%] max-w-3xl">
                <motion.div variants={fadeInUp} className="rounded-xl border border-white/10 shadow-2xl backdrop-blur bg-[#eab308]/95 text-black p-6 sm:p-8">
                  <motion.p variants={fadeIn} className="text-xs tracking-[0.25em] uppercase text-black/70">
                    Colección — {project.folder}
                  </motion.p>
                  <motion.h3 variants={fadeInUp} className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                    {project.title}
                  </motion.h3>
                  <motion.div variants={stagger} className="mt-5 text-sm">
                    <motion.div variants={fadeInUp} className="flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-sm bg-black/70" />
                      <div>
                        <div className="font-semibold">Slug</div>
                        <div className="text-black/80 break-all">{project.slug}</div>
                      </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="mt-3 flex items-start gap-3">
                      <div className="mt-1 h-2 w-2 rounded-sm bg-black/70" />
                      <div>
                        <div className="font-semibold">Descripción</div>
                        <div className="text-black/80">
                           “{project.folder}” con {(project.images?.length ?? 0)} fotos.
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                  <div className="mt-6">
                    <motion.button
                      type="button"
                      onClick={() => navigate(`/stands/project/${project.slug}`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-black text-white hover:bg-black/90 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Ver proyecto
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M4.5 12a.75.75 0 0 1 .75-.75h11.19l-3.72-3.72a.75.75 0 1 1 1.06-1.06l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06-1.06l3.72-3.72H5.25A.75.75 0 0 1 4.5 12Z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Nuestros clientes (al final, imagen completa y texto separado) */}
      <motion.section id="clientes" className="px-6 md:px-10 lg:px-16 py-16 md:py-20" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={scaleIn} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f14]">
            <img
              src="/imagenes/nuestros clientes/photo_4906815547035552807_y (1).jpg"
              alt="Nuestros clientes"
              className="w-full h-auto object-contain bg-[#0f0f14]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Nuestros clientes</h2>
            <p className="mt-2 text-white/80 max-w-3xl mx-auto">
              Marcas que confían en nosotros para crear experiencias memorables en cada feria y evento.
            </p>
          </motion.div>
        </div>
      </motion.section>




      {/* ==================== PREMIOS Y RECONOCIMIENTOS ==================== */}
      <motion.section 
        id="premios" 
        className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div variants={fadeIn} className="text-center mb-12">
            <motion.div variants={fadeIn} className="inline-block px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-4">
              <span className="text-yellow-400 text-sm font-semibold">Reconocimientos</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Nuestros Premios
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/70 max-w-2xl mx-auto">
              Reconocidos internacionalmente por nuestra excelencia en diseño y construcción de stands
            </motion.p>
          </motion.div>

          {/* Galería de premios */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={stagger}
          >
            {premiosImages.map((src, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setAwardLightboxIndex(i)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a24]/90 to-[#0f0f14]/90 hover:border-yellow-400/30 transition-all"
                aria-label={`Abrir premio ${i + 1}`}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={src}
                    alt={`Premio ${i + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/90 flex items-center justify-center">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>
      {/* Lightbox de premios */}
      <AnimatePresence>
        {awardLightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAwardLightboxIndex(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Botón cerrar */}
              <motion.button
                onClick={() => setAwardLightboxIndex(null)}
                className="absolute -top-12 right-0 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Cerrar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Contenedor de imagen */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden border-2 border-yellow-400/30 bg-black shadow-2xl"
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 40 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={premiosImages[awardLightboxIndex ?? 0]}
                  alt="reconocimiento"
                  className="w-full h-[70vh] object-contain"
                />

                {/* Controles de navegación */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                  <motion.button
                    className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white text-xl font-bold"
                    onClick={() => setAwardLightboxIndex((i) => (i - 1 + premiosImages.length) % premiosImages.length)}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ‹
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white text-xl font-bold"
                    onClick={() => setAwardLightboxIndex((i) => (i + 1) % premiosImages.length)}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ›
                  </motion.button>
                </div>

                {/* Contador */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white text-sm font-semibold">
                  {(awardLightboxIndex ?? 0) + 1} / {premiosImages.length}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Botón flotante WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
      >
        <img
          src="/imagenes/whatsapp.png"
          alt="WhatsApp"
          className="h-16 w-16 md:h-[72px] md:w-[72px] object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          style={{ animation: "wa-float 3s ease-in-out infinite" }}
        />
      </a>

      {/* ==================== CONTACTO / CTA ==================== */}
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
            className="relative overflow-hidden rounded-3xl border-2 border-yellow-400/20 bg-gradient-to-br from-yellow-500/10 via-yellow-300/5 to-transparent"
            variants={scaleIn}
          >
            {/* Decoraciones de fondo */}
            <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-yellow-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl" />
            
            <div className="relative z-10 grid md:grid-cols-5 gap-8 md:gap-12 p-8 md:p-12 lg:p-16">
              {/* Columna izquierda: Información */}
              <motion.div className="md:col-span-2 space-y-6" variants={slideInLeft}>
                <div>
                  <div className="inline-block px-4 py-2 rounded-full bg-yellow-400/20 border border-yellow-400/30 mb-4">
                    <span className="text-yellow-400 text-sm font-semibold">Contáctanos</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                    Solicita tu cotización
                  </h3>
                  <p className="text-white/80 mt-3 text-lg">
                    Cuéntanos sobre tu stand: fechas, m² y necesidades. Respondemos en 24 horas.
                  </p>
                </div>

                {/* Beneficios */}
                <div className="space-y-3">
                  {[
                    { icon: "✨", text: "Diseño + Construcción" },
                    { icon: "⚡", text: "Montaje rápido" },
                    { icon: "🌎", text: "Cobertura LATAM" },
                    { icon: "🏆", text: "15+ Premios ganados" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-3 text-white/90"
                      variants={fadeInUp}
                    >
                      <div className="w-10 h-10 rounded-lg bg-yellow-400/20 flex items-center justify-center text-xl">
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
                    className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center gap-2 transition-colors" 
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

      {/* Estilos clave */}
      <style>{`
        @keyframes logoMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* ==================== FOOTER ==================== */}
      <motion.footer
        className="relative px-6 md:px-10 lg:px-16 py-16 border-t border-white/10 bg-gradient-to-b from-[#0b0b0f] to-[#08080c] overflow-hidden"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Grid principal */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Logo y descripción */}
            <motion.div className="md:col-span-2" variants={fadeInUp}>
              <div className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4">
                PROCESA
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                Transformando espacios en experiencias memorables. Más de 23 años diseñando y construyendo stands que conectan marcas con personas.
              </p>
              {/* Redes sociales */}
              <div className="flex items-center gap-3 mt-6">
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
                  { href: "#sobre", label: "Sobre nosotros" },
                  { href: "#proyectos", label: "Proyectos" },
                  { href: "/stands/timeline", label: "Línea de tiempo", isLink: true },
                  { href: "#premios", label: "Premios" },
                  { href: "#testimonios", label: "Testimonios" }
                ].map((item, i) => (
                  item.isLink ? (
                    <Link
                      key={i}
                      to={item.href}
                      className="text-white/70 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-yellow-400/50 group-hover:bg-yellow-400 transition-colors" />
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={item.href}
                      className="text-white/70 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-yellow-400/50 group-hover:bg-yellow-400 transition-colors" />
                      {item.label}
                    </a>
                  )
                ))}
              </nav>
            </motion.div>

            {/* Contacto */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <div className="flex flex-col gap-3 text-sm">
                <a 
                  href="mailto:contacto@procesa.studio" 
                  className="text-white/70 hover:text-yellow-400 transition-colors flex items-center gap-2"
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
            <p>Diseño y desarrollo con ❤️ en Ecuador</p>
          </motion.div>
        </div>
      </motion.footer>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes wa-float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}


