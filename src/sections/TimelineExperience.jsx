import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function TimelineExperience() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const milestones = [
    {
      title: "Fundación",
      year: "2015",
      desc: "Nacimiento de CONEXTxto",
      details: "Iniciamos con un pequeño taller y grandes sueños. Nuestros primeros stands modulares marcaron el inicio de una revolución en diseño de espacios comerciales.",
      icon: "🛠️"
    },
    {
      title: "Primeros Clientes",
      year: "2016",
      desc: "Confianza y crecimiento",
      details: "Realizamos nuestros primeros 25 stands para empresas locales. Establecimos relaciones duraderas que continúan hasta hoy.",
      icon: "🤝"
    },
    {
      title: "Innovación",
      year: "2018",
      desc: "Diseños personalizados y tecnología",
      details: "Implementamos tecnología 3D para visualización de proyectos. Más de 150 stands diseñados para ferias internacionales en Latinoamérica.",
      icon: "💡"
    },
    {
      title: "Reconocimiento",
      year: "2019",
      desc: "Premios y certificaciones",
      details: "Ganamos nuestro primer premio internacional de diseño. Certificación ISO 9001 en calidad y procesos.",
      icon: "🏆"
    },
    {
      title: "Expansión Regional",
      year: "2021",
      
      details: "Apertura de nuevas sedes y alianzas estratégicas. Participación en las ferias comerciales más importantes de la región con stands premiados.",
      icon: "🌎"
    },
    {
      title: "Sostenibilidad",
      year: "2023",
      desc: "Compromiso verde",
      details: "Lanzamiento de nuestra línea eco-friendly. 100% de nuestros stands utilizan materiales reciclables y procesos sostenibles.",
      icon: "🌱"
    },
    {
      title: "Líderes del Sector",
      year: "2024",
      desc: "Excelencia y liderazgo",
      details: "Más de 500 proyectos exitosos. Reconocidos como la empresa #1 en diseño de stands en la región. Tecnología de vanguardia en cada proyecto.",
      icon: "⭐"
    }
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0f";
    const handleScroll = () => {
      const sc = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(sc / (maxScroll || 1), 1));
      setScrolled(sc > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.body.style.backgroundColor = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f14] to-[#14141a] text-white relative overflow-hidden">
      {/* Navbar (igual a Stands) */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-colors",
          scrolled ? "bg-white/90 backdrop-blur border-b border-gray-200" : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between">
          <div className={["font-bold tracking-wider", scrolled ? "text-gray-800" : "text-white"].join(" ")}>
            STANDS
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/stands#sobre-nosotros" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Sobre nosotros</a>
            <a href="/stands#clientes" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Clientes</a>
            <Link to="/stands/timeline" className={[scrolled ? "text-gray-900 font-semibold" : "text-white font-semibold"].join(" ")}>Línea de tiempo</Link>
            <a href="/stands#trabajos-destacados" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Trabajos destacados</a>
            <Link to="/" className={["px-3 py-1.5 rounded-md border", scrolled ? "border-gray-300 text-gray-800 hover:bg-gray-50" : "border-white/50 text-white hover:bg-white/10"].join(" ")}>Volver</Link>
          </nav>
          <Link to="/" className={["md:hidden text-sm px-3 py-1.5 rounded-md border", scrolled ? "border-gray-300 text-gray-800 hover:bg-gray-50" : "border-white/50 text-white hover:bg-white/10"].join(" ")}>
            Volver
          </Link>
        </div>
      </header>

      {/* Partículas de fondo */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: `twinkle ${2 + (i % 3)}s infinite ${i * 0.1}s`
            }}
          />
        ))}
      </div>

      

      {/* Botón volver arriba */}
      <AnimatePresence>
        {scrollProgress > 0.1 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all hover:scale-110 group"
          >
            <svg 
              className="w-6 h-6 text-black group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Título principal */}
      <div className="relative pt-20 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 text-center">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nuestra Historia
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Una década de innovación, pasión y excelencia en cada proyecto
        </motion.p>
      </div>

      {/* Timeline Horizontal */}
      <div className="relative py-12 md:py-20">
        {/* Contenedor con scroll horizontal */}
        <div className="overflow-x-auto pb-4 scrollbar-custom">
          <div className="flex justify-center px-4 md:px-8 lg:px-16">
            <div className="inline-block min-w-max px-4">
              {/* Línea horizontal de fondo */}
              <div className="relative h-2 bg-gradient-to-r from-[#1a1a1f] via-[#2a2a2f] to-[#1a1a1f] rounded-full" style={{ width: '1800px' }}>
                {/* Línea de progreso animada */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                />
              </div>

              {/* Nodos y contenido */}
              <div className="relative -mt-1">
                <div className="flex gap-8" style={{ width: '1800px' }}>
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="relative flex flex-col items-center flex-shrink-0"
                      style={{ width: '220px' }}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      {/* Línea vertical conectora */}
                      <motion.div
                        className="absolute top-0 w-0.5 bg-gradient-to-b from-yellow-400 to-transparent"
                        style={{ height: "60px" }}
                        initial={{ height: 0 }}
                        animate={{ height: "60px" }}
                        transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                      />

                      {/* Nodo principal */}
                      <motion.div
                        className="relative z-10 mt-14 cursor-pointer"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedNode(selectedNode === index ? null : index)}
                      >
                        {/* Pulso de fondo */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-yellow-400/20 -m-2"
                          animate={{ 
                            scale: [1, 1.3, 1], 
                            opacity: [0.5, 0, 0.5] 
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Círculo del nodo */}
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-black/90 to-black/70 border-4 ${
                          selectedNode === index ? 'border-yellow-300 shadow-xl shadow-yellow-400/50' : 'border-yellow-400'
                        } flex items-center justify-center text-3xl md:text-4xl relative overflow-hidden transition-all duration-300`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent" />
                          <span className="relative z-10">{milestone.icon}</span>
                          
                          {selectedNode === index && (
                            <motion.div
                              className="absolute inset-0 border-4 border-yellow-300 rounded-full"
                              initial={{ scale: 1, opacity: 1 }}
                              animate={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                            />
                          )}
                        </div>
                      </motion.div>

                      {/* Información del hito */}
                      <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.8 }}
                      >
                        <div className="text-xs md:text-sm font-bold text-yellow-400 mb-2 tracking-wider">
                          {milestone.year}
                        </div>
                        <div className="text-base md:text-lg font-semibold text-white mb-2">
                          {milestone.title}
                        </div>
                        <div className="text-xs md:text-sm text-white/60 leading-relaxed">
                          {milestone.desc}
                        </div>
                        <div className="text-xs text-yellow-300 mt-3 opacity-70 hover:opacity-100 transition-opacity">
                          Click para detalles
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicador de scroll horizontal en móvil */}
        <div className="md:hidden flex justify-center mt-8 gap-2 text-yellow-400/60 text-xs animate-pulse">
          <span>←</span>
          <span>Desliza para ver más</span>
          <span>→</span>
        </div>
      </div>

      {/* Sección adicional */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-2xl md:text-4xl font-bold mb-6 text-yellow-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Construyendo el futuro juntos
          </motion.h2>
          <motion.p
            className="text-white/70 text-sm md:text-base leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cada stand que diseñamos cuenta una historia única. Desde pequeñas empresas hasta grandes corporaciones, 
            hemos sido parte de su éxito en ferias y eventos alrededor del mundo.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-sm text-white/60">Proyectos Exitosos</div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-sm text-white/60">Clientes Satisfechos</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {selectedNode !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-[#1a1a20] to-[#0f0f14] p-6 md:p-8 rounded-2xl max-w-lg w-full border border-yellow-400/30 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">{milestones[selectedNode]?.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                {milestones[selectedNode]?.title}
              </div>
              <div className="text-lg md:text-xl text-yellow-300/70 mb-3 md:mb-4">
                {milestones[selectedNode]?.year}
              </div>
              <div className="text-sm md:text-base text-white/80 mb-4 md:mb-6 leading-relaxed">
                {milestones[selectedNode]?.details}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-yellow-500 text-black font-medium hover:bg-yellow-400 transition-all"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        
        /* Scrollbar personalizada para móvil y desktop */
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(234, 179, 8, 0.5) rgba(255, 255, 255, 0.05);
        }
        
        .scrollbar-custom::-webkit-scrollbar {
          height: 8px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          margin: 0 20px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(234, 179, 8, 0.5);
          border-radius: 10px;
          transition: background 0.3s;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 179, 8, 0.7);
        }
        
        /* Asegurar que el scroll horizontal funcione en móvil */
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </main>
  );
}