import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "./projectsData";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = useMemo(
    () => projects.find((p) => p.slug === slug) ?? projects[0],
    [slug]
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Esc para cerrar lightbox y flechas para navegar
  useEffect(() => {
    function onKey(e) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % project.gallery.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + project.gallery.length) % project.gallery.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, project.gallery?.length]);

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      {/* Navbar mínima */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 lg:px-16 bg-white/10 backdrop-blur border-b border-white/10">
        <Link to="/stands" className="text-sm text-white/80 hover:text-white">
          ← Volver a proyectos
        </Link>
        <div className="text-xs tracking-[0.25em] uppercase text-white/60">
          Proyecto
        </div>
      </header>

      <section className="pt-20 md:pt-24 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{project.title}</h1>
        <p className="text-white/70 mb-6">
          {project.year} — {project.location}
        </p>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f14]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[80vh] md:h-[88vh] object-cover"
          />
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-white/80 leading-relaxed">{project.description}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 bg-[#111118]">
            <h3 className="font-semibold mb-2">Ficha</h3>
            <dl className="text-sm text-white/80 grid grid-cols-2 gap-2">
              <dt className="text-white/60">Año</dt>
              <dd>{project.year}</dd>
              <dt className="text-white/60">Ubicación</dt>
              <dd>{project.location}</dd>
              <dt className="text-white/60">Cliente</dt>
              <dd>—</dd>
            </dl>
          </div>
        </div>

        {/* Galería */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {(project.gallery ?? []).slice(0, 10).map((m, i) => (
              <button
                key={i}
                type="button"
                className="group relative rounded-lg overflow-hidden border border-white/10 bg-[#0f0f14]"
                onClick={() => setLightboxIndex(i)}
              >
                {m.type === "image" ? (
                  <img src={m.src} alt={`media-${i}`} className="w-full h-40 md:h-48 lg:h-56 object-cover group-hover:opacity-90" />
                ) : (
                  <div className="w-full h-40 md:h-48 lg:h-56 grid place-items-center text-xs text-white/70">
                    <video src={m.src} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="px-2 py-1 rounded bg-black/60 border border-white/20">Video</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <Link
            to="/stands"
            className="inline-block px-5 py-2 rounded-md border border-white/20 hover:bg-white/10 text-sm"
          >
            Volver a Stands
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm"
              >
                Cerrar ✕
              </button>
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0f0f14]">
                {project.gallery?.[lightboxIndex]?.type === "video" ? (
                  <video
                    src={project.gallery?.[lightboxIndex]?.src}
                    className="w-full h-[88vh] object-contain bg-black"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={project.gallery?.[lightboxIndex]?.src}
                    alt="media"
                    className="w-full h-[88vh] object-contain bg-black"
                  />
                )}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={() =>
                      setLightboxIndex((i) => (i - 1 + (project.gallery?.length ?? 1)) % (project.gallery?.length ?? 1))
                    }
                  >
                    ‹
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => setLightboxIndex((i) => (i + 1) % (project.gallery?.length ?? 1))}
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


