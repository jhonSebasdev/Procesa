import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Design() {
  const navigate = useNavigate();

  // Imágenes en /public/imagenes morado
  const base = "/imagenes morado/";
  const imageFiles = ["3.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
  const images = imageFiles.map((f) => `${base}${f}`);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  const next = () => setIdx((p) => (p + 1) % images.length);
  const prev = () => setIdx((p) => (p - 1 + images.length) % images.length);

  const shuffled = useMemo(() => {
    return [...images]
      .map((m) => ({ m, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(({ m }) => m);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const WHATSAPP_PHONE = "593963998673";
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Hola! Me interesa remodelación y arquitectura interior."
  )}`;

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between">
          <button
            type="button"
            className="font-bold tracking-wider text-white"
            onClick={() => navigate("/")}
          >
            PROCESA
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/stands" className="text-white/90 hover:text-white">Stands</Link>
            <a href="#servicios" className="text-white/90 hover:text-white">Servicios</a>
            <a href="#galeria" className="text-white/90 hover:text-white">Galería</a>
            <a href="#contacto" className="px-3 py-1.5 rounded-md border border-white/40 hover:bg-white/10">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero inspirado en la referencia */}
      <section className="relative min-h-[calc(100vh-3.5rem)] pt-14">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={`hero-${idx}-${images[idx]}`}
              src={images[idx]}
              alt="Procesa Design"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0.0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              loading="eager"
              decoding="async"
            />
          </AnimatePresence>
          {/* Overlay morado */}
          <div className="absolute inset-0 bg-[#5a4a7f]/80 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-[calc(100vh-3.5rem)] flex items-center">
          <div>
            <motion.p variants={fadeIn} initial="hidden" animate="show" className="text-xs tracking-[0.25em] uppercase text-white/80">
              Remodelación y arquitectura interior
            </motion.p>
            <motion.h1
              variants={scaleIn}
              initial="hidden"
              animate="show"
              className="mt-2 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
            >
              PROCESA DESIGN
            </motion.h1>
            <motion.p variants={fadeInUp} initial="hidden" animate="show" className="mt-4 max-w-xl text-white/85">
              Transformamos espacios existentes en experiencias contemporáneas, funcionales y estéticas
              que mejoran la vida diaria y el rendimiento de cada ambiente.
            </motion.p>
            <motion.div variants={fadeInUp} initial="hidden" animate="show" className="mt-6 flex flex-wrap gap-3">
              <a href="#servicios" className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90">Ver servicios</a>
              <a href="#contacto" className="px-5 py-2.5 rounded-full border border-white/60 hover:bg-white/10">Solicitar propuesta</a>
            </motion.div>
          </div>
          {/* Controles */}
          <div className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2">
            <button onClick={prev} className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M15.78 19.28a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L10.06 12l5.72 5.72c.3.3.3.77 0 1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2">
            <button onClick={next} className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M8.22 4.72a.75.75 0 0 1 1.06 0l6 6c.3.3.3.77 0 1.06l-6 6a.75.75 0 0 1-1.06-1.06L13.94 12 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Servicios clave */}
      <motion.section id="servicios" className="px-6 md:px-10 lg:px-16 py-16 md:py-24" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Estrategia, diseño y obra</h2>
          <p className="mt-2 text-white/80 max-w-3xl">
            Acompañamos el proceso completo: conceptualización, selección de materiales, visualizaciones 3D
            y ejecución eficiente para renovar cocinas, oficinas, locales y viviendas.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { t: "Estrategia", d: "Levantamiento, diagnóstico de uso y propuesta funcional." },
              { t: "Diseño", d: "Concepto visual, layout, renders y selección de acabados." },
              { t: "Producción", d: "Obra civil ligera, carpintería, iluminación y montaje." },
            ].map((it, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#111118] p-6">
                <div className="text-yellow-400 text-sm">{it.t}</div>
                <div className="mt-1 text-lg font-semibold">{it.d.split(",")[0]}</div>
                <p className="mt-2 text-white/70">{it.d}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Galería inspiracional tipo mosaico */}
      <motion.section id="galeria" className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">Inspiración en tono morado</h3>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {shuffled.concat(shuffled).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`inspiracion-${i}`}
                className="mb-4 w-full rounded-xl border border-white/10 bg-[#0f0f14] object-cover"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <section id="contacto" className="px-6 md:px-10 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-[#5a4a7f]/20 via-[#5a4a7f]/10 to-transparent p-8 md:p-12">
          <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight">¿Remodelamos tu espacio?</h4>
          <p className="mt-2 text-white/80 max-w-2xl">
            Cuéntanos tu objetivo, metraje y tiempos. Diseñamos una propuesta a medida.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400">
              Hablar por WhatsApp
            </a>
            <a href="mailto:contacto@procesa.studio?subject=Proyecto%20de%20remodelaci%C3%B3n" className="px-5 py-2.5 rounded-md border border-white/40 hover:bg-white/10">
              Escribir por Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <motion.footer className="px-6 md:px-10 lg:px-16 py-10 border-t border-white/10 bg-[#0b0b0f]" variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-extrabold tracking-wider">PROCESA DESIGN</div>
            <nav className="flex items-center gap-5 text-sm text-white/70">
              <a href="#servicios" className="hover:text-white">Servicios</a>
              <a href="#galeria" className="hover:text-white">Galería</a>
              <a href="#contacto" className="hover:text-white">Contacto</a>
            </nav>
          </div>
          <div className="mt-4 text-xs text-white/50">
            © {new Date().getFullYear()} PROCESA. Remodelación y arquitectura interior.
          </div>
        </div>
      </motion.footer>
    </main>
  );
}

