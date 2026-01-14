import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./projectsData";
import { premiosImages, imageProjects } from "./imagesManifest";

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
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellido" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Empresa" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <input type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="Correo" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} placeholder="Fecha del evento" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <input value={metros} onChange={(e) => setMetros(e.target.value)} placeholder="Metros cuadrados (m²)" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <input value={presupuesto} onChange={(e) => setPresupuesto(e.target.value)} placeholder="Presupuesto estimado" className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      <div className="md:col-span-2">
        <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Cuéntanos sobre el proyecto..." rows={4} className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30" />
      </div>
      <div className="md:col-span-2 flex flex-wrap gap-3">
        <button type="button" onClick={sendWhatsApp} className="w-full md:w-auto px-5 py-3 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20">Enviar por WhatsApp</button>
        <button type="button" onClick={sendEmail} className="w-full md:w-auto px-5 py-3 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition-colors border border-white/20">Enviar por Email</button>
      </div>
    </form>
  );
}
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
export default function Stands() {
  const [scrolled, setScrolled] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // WhatsApp: ajusta el número con código de país y el mensaje si lo deseas
  const WHATSAPP_PHONE = "593963998673";
  const WHATSAPP_MESSAGE = "Hola! Quiero más información sobre stands.";
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Imágenes del héroe tomadas desde /public/imagenes
  // Agrega aquí más rutas si añades nuevas imágenes a esa carpeta
  const heroImages = [
    "/imagenes/BAIC AUTO SHOW GUAYAQUIL 2019/photo_4904563747221867386_y (1).jpg",
    "/imagenes/derecha.png",
    "/imagenes/derecha_amarillo.jpg",
    "/imagenes/amarillo.jpg",
  ];
  // Videos del héroe desde /public/videos
  const heroVideos = ["/videos/intro.WEBM"];
  const initialHeroMedia = [...heroImages, ...heroVideos];
  const [heroMedia, setHeroMedia] = useState(initialHeroMedia);
  const [heroIdx, setHeroIdx] = useState(0);
  const [awardLightboxIndex, setAwardLightboxIndex] = useState(null);
  const [category, setCategory] = useState("Todos");
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

  // Variantes de animación reutilizables
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

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

  // Héroe: aleatorizar orden inicial y autoplay tipo carrusel
  useEffect(() => {
    // barajar medios para orden aleatorio
    const shuffled = [...initialHeroMedia]
      .map((m) => ({ m, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(({ m }) => m);
    setHeroMedia(shuffled);
    setHeroIdx(0);
    // autoplay
    const id = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % shuffled.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const nextHero = () => {
    setHeroIdx((prev) => (prev + 1) % heroMedia.length);
  };
  const prevHero = () => {
    setHeroIdx((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);
  };

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Nav (transparente/solida) */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-colors",
          scrolled ? "bg-white/90 backdrop-blur border-b border-gray-200" : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between" >
        <Link to="/" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>
        ← Volver a inicio
</Link>
          <div className={["font-bold tracking-wider", scrolled ? "text-gray-800" : "text-white"].join(" ")}>
            DISEÑO<br />COMERCIAL
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            
            <a href="#sobre" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Sobre</a>
            <a href="#proyectos" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Proyectos destacados</a>
            <Link to="/stands/timeline" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Línea de tiempo</Link>
            
            <a href="#premios" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Premios</a>
            
            <a href="#testimonios" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Testimonios</a>
            <a href="#clientes" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Clientes</a>
            <a href="#contacto" className={["px-3 py-1.5 rounded-md border", scrolled ? "border-gray-300 text-gray-800 hover:bg-gray-50" : "border-white/50 text-white hover:bg-white/10"].join(" ")}>Contacto</a>
          </nav>
          <button
            type="button"
            className={["md:hidden p-2 rounded-md", scrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"].join(" ")}
            aria-label="Abrir menú"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className={["md:hidden border-t", scrolled ? "bg-white/95 border-gray-200" : "bg-black/60 border-white/10"].join(" ")}>
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-4 text-sm">
              <a onClick={() => setMobileOpen(false)} href="#sobre" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Sobre</a>
              <a onClick={() => setMobileOpen(false)} href="#proyectos" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Proyectos destacados</a>
              <Link onClick={() => setMobileOpen(false)} to="/stands/timeline" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Línea de tiempo</Link>
              <a onClick={() => setMobileOpen(false)} href="#sustentable" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Sustentable</a>
              <a onClick={() => setMobileOpen(false)} href="#premios" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Premios</a>
              <a onClick={() => setMobileOpen(false)} href="#registros" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Registros</a>
              <a onClick={() => setMobileOpen(false)} href="#testimonios" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Testimonios</a>
              <a onClick={() => setMobileOpen(false)} href="#clientes" className={[scrolled ? "text-gray-800" : "text-white"].join(" ")}>Clientes</a>
              <a onClick={() => setMobileOpen(false)} href="#contacto" className={["px-3 py-1.5 rounded-md border", scrolled ? "border-gray-300 text-gray-800" : "border-white/50 text-white"].join(" ")}>Contacto</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero de impacto: carrusel full-screen */}
      <section className="relative min-h-[calc(100vh-3.5rem)] pt-14">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait" initial={false}>
            {heroMedia.length > 0 && (
              <motion.div
                key={`hero-${heroIdx}-${heroMedia[heroIdx]}`}
                className="absolute inset-0"
                initial={{ opacity: 0.0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {(() => {
                  const src = heroMedia[heroIdx];
                  const isVideo = /\.mp4$|\.webm$|\.ogg$/i.test(src) || src.includes("/videos/");
                  if (isVideo) {
                    return (
                      <video
                        src={src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    );
                  }
                  return (
                    <img
                      src={src}
                      alt="Slide destacado"
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  );
                })()}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controles del carrusel */}
        <div className="relative z-10 h-[calc(100vh-3.5rem)] flex items-end justify-center">
          <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={prevHero}
              aria-label="Anterior"
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L10.06 12l5.72 5.72c.3.3.3.77 0 1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={nextHero}
              aria-label="Siguiente"
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 0 1 1.06 0l6 6c.3.3.3.77 0 1.06l-6 6a.75.75 0 0 1-1.06-1.06L13.94 12 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="mb-6 flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
            {heroMedia.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir al slide ${i + 1}`}
                onClick={() => setHeroIdx(i)}
                className={[
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  i === heroIdx ? "bg-white" : "bg-white/40 hover:bg-white/70"
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios y carrusel de logos */}
      <motion.section id="testimonios" className="px-6 md:px-10 lg:px-16 py-16 md:py-20" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold mb-6">Lo que dicen nuestros clientes</motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.blockquote variants={fadeInUp} className="rounded-2xl border border-white/10 p-6 bg-[#111118]">
              <p className="text-white/90">“Ejecutaron nuestro stand con precisión y a tiempo. La calidad fue sobresaliente.”</p>
              <footer className="mt-3 text-sm text-white/60">Gerente de Marketing — Automotriz</footer>
            </motion.blockquote>
            <motion.blockquote variants={fadeInUp} className="rounded-2xl border border-white/10 p-6 bg-[#111118]">
              <p className="text-white/90">“Diseño, logística y montaje impecables. Superaron expectativas.”</p>
              <footer className="mt-3 text-sm text-white/60">Brand Manager — Banca</footer>
            </motion.blockquote>
            <motion.blockquote variants={fadeInUp} className="rounded-2xl border border-white/10 p-6 bg-[#111118]">
              <p className="text-white/90">“Gran equipo, comunicación clara y resultados que impactan.”</p>
              <footer className="mt-3 text-sm text-white/60">CMO — Florícola</footer>
            </motion.blockquote>
          </div>
          <motion.div variants={scaleIn} className="mt-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f14]">
            <div className="relative">
              <div className="flex gap-8 items-center py-6 animate-[logoMarquee_30s_linear_infinite]">
                {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((src, i) => (
                  <img key={i} src={src} alt={`logo-${i}`} className="h-16 sm:h-20 md:h-24 object-contain opacity-90" loading="lazy" decoding="async" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Proyectos en destaque (imagen grande + paginación) */}
      <motion.section id="proyectos" className="relative py-12 md:py-16" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Encabezados al estilo referencia */}
          <div className="flex items-start justify-between mb-4">
            <motion.h1 variants={fadeIn} className="text-3xl md:text-5xl font-extrabold tracking-tight">{currentProject.title}</motion.h1>
            <motion.div variants={fadeIn} className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/60">
              Proyectos destacados
            </motion.div>
          </div>
          {/* Filtros por industria */}
          <div className="mb-4 -mx-2 px-2 overflow-x-auto whitespace-nowrap">
            <div className="inline-flex gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={[
                    "px-3 py-1.5 rounded-full text-xs border",
                    category === c
                      ? "bg-white text-black border-white"
                      : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20",
                  ].join(" ")}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Layout: imagen grande izquierda, respiro a la derecha */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="relative">
                <motion.div
                  key={projectIndex}
                  variants={scaleIn}
                  initial="hidden"
                  animate="show"
                  className="h-[64vh] md:h-[80vh] lg:h-[85vh] rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f14] cursor-pointer"
                  onClick={() => navigate(`/stands/project/${currentProject.slug}`)}
                >
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Controles izquierda/derecha */}
                <div className="absolute inset-y-0 left-2 flex items-center">
                  <button
                    type="button"
                    aria-label="Proyecto anterior"
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white"
                    onClick={() => setProjectIndex((prev) => (prev - 1 + filteredProjects.length) % (filteredProjects.length || 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L10.06 12l5.72 5.72c.3.3.3.77 0 1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button
                    type="button"
                    aria-label="Siguiente proyecto"
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white"
                    onClick={() => setProjectIndex((prev) => (prev + 1) % (filteredProjects.length || 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 0 1 1.06 0l6 6c.3.3.3.77 0 1.06l-6 6a.75.75 0 0 1-1.06-1.06L13.94 12 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              {(currentProject.year || currentProject.location) && (
                <motion.div variants={fadeIn} className="mt-3 text-sm md:text-base text-white/80">
                  {[currentProject.year, currentProject.location].filter(Boolean).join(" — ")}
                </motion.div>
              )}
            </div>
          </div>

          {/* Paginación numérica inferior derecha (scrollable en móvil) */}
          <div className="mt-4 flex items-center md:justify-end justify-start gap-2 overflow-x-auto whitespace-nowrap py-2 -mx-2 px-2">
            {filteredProjects.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                className={[
                  "flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-sm text-xs md:text-sm grid place-items-center",
                  i === projectIndex ? "bg-white text-black" : "bg-white/20 text-white/80 hover:bg-white/30"
                ].join(" ")}
                onClick={() => setProjectIndex(i)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Video Stands (full screen en la mitad, entre Proyectos y Clientes) */}
      <motion.section id="video-stands" className="relative min-h-[100vh]" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="absolute inset-0">
          <AutoplayVideo src="/imagenes/videos stands/0110.WEBM" startAt={70} />
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

      {/* Sobre nosotros (bloque editorial) */}
      <section id="sobre" className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre nosotros</h2>
            <p className="text-white/80">
              Combinamos la creatividad del diseño con la técnica y la tecnología de la construcción para lograr lo sorprendente.
              Resolvemos necesidades comerciales a través de arquitectura efímera y experiencias memorables.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a20] to-[#0f0f14] p-8"
          >
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-yellow-400 text-sm">Años</dt>
                <dd className="text-3xl font-extrabold">10+</dd>
              </div>

              <div>
                <dt className="text-yellow-400 text-sm">Proyectos</dt>
                <dd className="text-3xl font-extrabold">500+</dd>
              </div>
              <div>
                <dt className="text-yellow-400 text-sm">Satisfacción</dt>
                <dd className="text-3xl font-extrabold">100%</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>



      {/* Premios (imagen protagonista + panel superpuesto) */}
      <section id="premios" className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto relative">
          {/* Imagen protagonista */}
 

          {/* Galería de premios */}
          <div className="mt-6">
            <h3 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Nuestros reconocimientos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {premiosImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAwardLightboxIndex(i)}
                  className="group relative rounded-lg overflow-hidden border border-white/10 bg-[#0f0f14]"
                  aria-label={`Abrir premio ${i + 1}`}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    src={src}
                    alt={`Premio ${i + 1}`}
                    className="w-full h-28 sm:h-32 md:h-40 object-cover group-hover:opacity-90"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {awardLightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAwardLightboxIndex(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setAwardLightboxIndex(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm"
              >
                Cerrar ✕
              </button>
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0f0f14]">
                <img
                  src={premiosImages[awardLightboxIndex ?? 0]}
                  alt="reconocimiento"
                  className="w-full h-[70vh] object-contain bg-black"
                />
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => setAwardLightboxIndex((i) => (i - 1 + premiosImages.length) % premiosImages.length)}
                  >
                    ‹
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => setAwardLightboxIndex((i) => (i + 1) % premiosImages.length)}
                  >
                    ›
                  </button>
                </div>
              </div>
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

      {/* CTA: Solicitar cotización (visual mejorado) */}
      <section id="contacto" className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-500/10 via-yellow-300/5 to-transparent">
            {/* decoraciones */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-yellow-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10 grid md:grid-cols-5 gap-8 p-8 md:p-12">
              {/* Columna izquierda: copy y beneficios */}
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Solicitar cotización</h3>
                <p className="text-white/70 mt-2">Cuéntanos sobre tu stand: fechas, m² y necesidades. Respondemos en 24 horas.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20">Diseño + Construcción</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20">Montaje rápido</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20">Cobertura LATAM</span>
                </div>
                <div className="mt-6 text-sm text-white/60">
                  También puedes escribirnos directo a <a className="underline hover:text-white" href="mailto:contacto@procesa.studio">contacto@procesa.studio</a>.
                </div>
              </div>
              {/* Columna derecha: formulario en panel glass */}
              <div className="md:col-span-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-5 md:p-6 shadow-xl">
                  <CotizacionForm whatsappPhone={WHATSAPP_PHONE} email="contacto@procesa.studio" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estilos clave */}
      <style>{`
        @keyframes logoMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* Footer */}
      <motion.footer
        className="px-6 md:px-10 lg:px-16 py-10 border-t border-white/10 bg-[#0b0b0f]"
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-extrabold tracking-wider">PROCESA</div>
            <nav className="flex items-center gap-5 text-sm text-white/70">
              <a href="#sobre" className="hover:text-white">Sobre</a>
              <a href="#proyectos" className="hover:text-white">Proyectos</a>
              <a href="#testimonios" className="hover:text-white">Testimonios</a>
              <a href="#contacto" className="hover:text-white">Contacto</a>
            </nav>
          </div>
          <div className="mt-4 text-xs text-white/50">
            © {new Date().getFullYear()} PROCESA. Todos los derechos reservados · contacto@procesa.studio
          </div>
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


