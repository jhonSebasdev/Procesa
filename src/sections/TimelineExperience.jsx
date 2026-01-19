import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function TimelineExperience() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  // Scroll progress para toda la página
  const { scrollYProgress: pageScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll progress específico para la timeline - ajustado para llegar a todos los 24 proyectos
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.1", "end 0.9"]
  });

  // Altura animada para la línea móvil - extendida para llegar a todos los proyectos
  const mobileLineHeight = useTransform(scrollYProgress, [0, 0.92], ['0%', '100%']);

  const milestones = [
    {
      title: "Andinatel Expo Compu",
      year: "2003",
      desc: "Ingeniería de impacto",
      details: "Ingeniería de impacto. Construcción y montaje estructural de gran escala para el sector de telecomunicaciones.",
      icon: "📡",
      side: "left",
      image: null
    },
    {
      title: "BellSouth Expo Compu",
      year: "2004",
      desc: "Arquitectura de altura",
      details: "Arquitectura de altura. Dominio del espacio aéreo mediante estructuras metálicas y diseño de gran formato para el sector de telecomunicaciones.",
      icon: "🏗️",
      side: "right",
      image: null
    },
    {
      title: "Movistar Expo Compu",
      year: "2005",
      desc: "Escala monumental",
      details: "Escala monumental. Despliegue arquitectónico masivo con torre central y tecnología audiovisual para dominar el recinto ferial.",
      icon: "📱",
      side: "left",
      image: "/imagenes/linea de tiempo/2005 MOVISTAR.jpeg"
    },
    {
      title: "Chevrolet Automundo",
      year: "2006",
      desc: "Liderazgo sobre ruedas",
      details: "Liderazgo sobre ruedas. Escenografía integral de gran formato. diseñada específicamente para potenciar la estética y el brillo de la industria automotriz.",
      icon: "🚗",
      side: "right",
      image: "/imagenes/linea de tiempo/2006 CHEVROLET .jpeg"
    },
    {
      title: "Fiat Automundo",
      year: "2007",
      desc: "Atmósfera y diseño",
      details: "Atmósfera y diseño. Creación de un entorno envolvente con iluminación escénica personalizada para resaltar el carácter dinámico de la marca italiana.",
      icon: "🏎️",
      side: "left",
      image: "/imagenes/linea de tiempo/2007 FIAT.jpeg"
    },
    {
      title: "Rosen Tantau Expoflores",
      year: "2008",
      desc: "Excelencia reconocida",
      details: "Excelencia reconocida. Primer galardón oficial al 'Mejor Stand', logrado gracias a un diseño de vanguardia que fusionó arquitectura curva y acabados premium.",
      icon: "🌹",
      side: "right",
      image: "/imagenes/linea de tiempo/2008 ROSEN TAN TAU .jpeg"
    },
    {
      title: "Horcalsa ILAFAEXPO",
      year: "2009",
      desc: "Impacto concentrado",
      details: "Impacto concentrado. Galardón al 'Mejor Stand' logrado en apenas 3m². Una clase maestra de optimización espacial y diseño modular premiada internacionalmente por ILAFA.",
      icon: "🏆",
      side: "left",
      image: "/imagenes/linea de tiempo/2009 HORCALSA.jpeg"
    },
    {
      title: "General Cable Expo Minas",
      year: "2010",
      desc: "Identidad global",
      details: "Identidad global. Diseño corporativo de líneas limpias para el sector industrial, enfocado estratégicamente en generar espacios de negociación efectivos.",
      icon: "⚡",
      side: "right",
      image: "/imagenes/linea de tiempo/2010 GENERAL CABLEC.jpeg"
    },
    {
      title: "Importexa Oil & Power",
      year: "2011",
      desc: "Vanguardia energética",
      details: "Vanguardia energética. Ruptura con lo tradicional mediante una arquitectura de líneas curvas y modernas, integrando exhibición técnica y confort ejecutivo.",
      icon: "🛢️",
      side: "left",
      image: "/imagenes/linea de tiempo/2011 IMPORTEXA.jpeg"
    },
    {
      title: "Rosen Tantau Expoflores",
      year: "2012",
      desc: "Arquitectura orgánica",
      details: "Arquitectura orgánica. Un giro total hacia la sostenibilidad usando bambú estructural para crear una atmósfera cálida que envuelve al visitante.",
      icon: "🎋",
      side: "right",
      image: "/imagenes/linea de tiempo/2012 ROSEN TAN TAU BAMBU .jpeg"
    },
    {
      title: "Nissan Autoshow - Guayaquil",
      year: "2013",
      desc: "Victoria histórica",
      details: "Victoria histórica. Tercer premio al 'Mejor Stand' para nuestra firma y el primero en la historia para la marca en este evento. Un diseño de autoridad.",
      icon: "🏅",
      side: "left",
      image: "/imagenes/linea de tiempo/2013 NISSAN .jpeg"
    },
    {
      title: "Foton Expo Transporte",
      year: "2014",
      desc: "Autoridad industrial",
      details: "Autoridad industrial. Arquitectura de gran formato para imponer presencia. Estructuras aéreas limpias que enmarcaban maquinaria pesada.",
      icon: "🚛",
      side: "right",
      image: "/imagenes/linea de tiempo/2014 FOTON.jpeg"
    },
    {
      title: "Sedemi Oil & Power",
      year: "2015",
      desc: "Solidez corporativa",
      details: "Solidez corporativa. Diseño de alto impacto que proyecta la fuerza de la ingeniería mediante una arquitectura robusta y tecnología audiovisual.",
      icon: "🔧",
      side: "left",
      image: "/imagenes/linea de tiempo/2015 SEDEMI.jpeg"
    },
    {
      title: "General Cable Expo Minas",
      year: "2016",
      desc: "Disrupción material",
      details: "Disrupción material. En un entorno industrial frío, apostamos por la calidez de la madera y formas curvas, creando un espacio de negocios diferenciado.",
      icon: "💡",
      side: "right",
      image: "/imagenes/linea de tiempo/2016 GENERAL CABLEC .jpeg"
    },
    {
      title: "Audi Euroshow",
      year: "2017",
      desc: "Velocidad estática",
      details: "Velocidad estática. Una puesta en escena diseñada para evocar movimiento, curvas continuas y gráficos inmensos para resaltar la deportividad alemana.",
      icon: "🏁",
      side: "left",
      image: "/imagenes/linea de tiempo/2017 AUDI  .jpeg"
    },
    {
      title: "Renault Automundo (Cemexpo)",
      year: "2018",
      desc: "La despedida dorada",
      details: "La despedida dorada. Premio al 'Mejor Stand' en la última edición histórica de Cemexpo. Elegancia minimalista que otorgó a Renault su primer galardón en este certamen.",
      icon: "🥇",
      side: "right",
      image: "/imagenes/linea de tiempo/2018 RENAULT.jpeg"
    },
    {
      title: "Mercedes-Benz Euro Show",
      year: "2019",
      desc: "Lujo minimalista",
      details: "Lujo minimalista. 'The best or nothing'. Una estructura de arco blanco como obras de arte, priorizando la sobriedad.",
      icon: "⚫",
      side: "left",
      image: "/imagenes/linea de tiempo/2019 MERCEDEZ BENZ.jpeg"
    },
    {
      title: "Produbanco Casa Clave",
      year: "2020",
      desc: "Banca acogedora",
      details: "Banca acogedora. Fusión de modernismo corporativo con la calidez de la madera y el paisajismo para conectar emocionalmente con el cliente inmobiliario.",
      icon: "🏢",
      side: "right",
      image: "/imagenes/linea de tiempo/2020 PRODUBANCO.jpeg"
    },
    {
      title: "Renault Automundo - Guayaquil",
      year: "2021",
      desc: "El retorno presencial",
      details: "El retorno presencial. Lideramos la reactivación post-pandemia con un diseño de planta abierta que priorizó la seguridad, la experiencia y la identidad visual.",
      icon: "🔄",
      side: "left",
      image: "/imagenes/linea de tiempo/2021 RENUALT.jpeg"
    },
    {
      title: "Grupo Elite Expo Flor Ecuador",
      year: "2022",
      desc: "La gran fusión",
      details: "La gran fusión. Diseño y construcción del stand más grande de la feria (220 m²). Un hito arquitectónico en madera para el holding florícola más importante.",
      icon: "🌺",
      side: "right",
      image: "/imagenes/linea de tiempo/2022 GRUPO ELITE .jpeg"
    },
    {
      title: "Renault Autoshow",
      year: "2023",
      desc: "Confianza renovada",
      details: "Confianza renovada. Continuamos siendo el aliado estratégico de la marca, entregando una evolución de su identidad especial con madera y dinamismo.",
      icon: "🎯",
      side: "left",
      image: "/imagenes/linea de tiempo/2023 RENAULT .jpeg"
    },
    {
      title: "Grupo Elite Expo Flor Ecuador",
      year: "2024",
      desc: "La galería monumental",
      details: "La galería monumental. Rompimos nuestro propio récord diseñando nuevamente el stand más grande de la feria (320 m²). Un concepto de 'Galería de Arte' admirado masivamente.",
      icon: "🎨",
      side: "right",
      image: "/imagenes/linea de tiempo/2024 GRUPO ELITE.jpeg"
    },
    {
      title: "BAIC - Foton Automundo",
      year: "2025",
      desc: "Sinergia automotriz",
      details: "Sinergia automotriz. Diseño integral para dos marcas en un mismo espacio. Una arquitectura unificada que respeta cada identidad, consolidando nuestra alianza por segunda edición consecutiva.",
      icon: "🚙",
      side: "left",
      image: "/imagenes/linea de tiempo/2025 BAIC - FOTON.jpeg"
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
    <main ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f14] to-[#14141a] text-white relative overflow-hidden">
      {/* Navbar */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg" : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
          <div className={["text-xl font-bold tracking-wider transition-colors", scrolled ? "text-gray-800" : "text-white"].join(" ")}>
            STANDS
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/stands#sobre-nosotros" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Sobre nosotros</a>
            <a href="/stands#clientes" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Clientes</a>
            <Link to="/stands/timeline" className={[scrolled ? "text-gray-900 font-semibold" : "text-white font-semibold"].join(" ")}>Línea de tiempo</Link>
            <a href="/stands#trabajos-destacados" className={[scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"].join(" ")}>Trabajos destacados</a>
            <Link to="/" className={["px-4 py-2 rounded-lg border transition-all", scrolled ? "border-gray-300 text-gray-800 hover:bg-gray-100" : "border-white/50 text-white hover:bg-white/10"].join(" ")}>Volver</Link>
          </nav>
          <Link to="/" className={["md:hidden text-sm px-4 py-2 rounded-lg border transition-all", scrolled ? "border-gray-300 text-gray-800 hover:bg-gray-100" : "border-white/50 text-white hover:bg-white/10"].join(" ")}>
            Volver
          </Link>
        </div>
      </header>

      {/* Fondo geométrico animado - Intensidad reducida */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-70">
        {/* Capa de gradientes radiales animados */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            left: '20%',
            top: '10%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)',
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
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.06) 0%, transparent 70%)',
            filter: 'blur(70px)'
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            left: '50%',
            bottom: '20%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.05) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
          animate={{
            x: [-20, 20, -20],
            y: [0, -30, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Formas geométricas grandes - opacidad reducida */}
        <motion.div
          className="absolute w-[500px] h-[500px] border border-yellow-400/15"
          style={{ 
            left: '10%', 
            top: '15%',
            transform: 'rotate(45deg)'
          }}
          animate={{ 
            rotate: [45, 75, 45],
            scale: [1, 1.15, 1],
            borderColor: ['rgba(234, 179, 8, 0.15)', 'rgba(234, 179, 8, 0.25)', 'rgba(234, 179, 8, 0.15)']
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] border border-yellow-400/12"
          style={{ 
            right: '10%', 
            top: '30%',
            transform: 'rotate(30deg)'
          }}
          animate={{ 
            rotate: [30, 60, 30],
            scale: [1, 1.25, 1],
            borderColor: ['rgba(234, 179, 8, 0.12)', 'rgba(234, 179, 8, 0.22)', 'rgba(234, 179, 8, 0.12)']
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Círculos adicionales - opacidad reducida */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full border border-yellow-400/10"
          style={{ 
            left: '60%', 
            top: '10%',
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            borderColor: ['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)']
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full border border-yellow-400/10"
          style={{ 
            left: '15%', 
            bottom: '15%',
          }}
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            borderColor: ['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.25)', 'rgba(234, 179, 8, 0.1)']
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Líneas diagonales decorativas - opacidad reducida */}
        <motion.div
          className="absolute h-[800px] w-[2px] bg-gradient-to-b from-transparent via-yellow-400/15 to-transparent"
          style={{ left: '25%', top: '-10%', transform: 'rotate(15deg)' }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scaleY: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute h-[800px] w-[2px] bg-gradient-to-b from-transparent via-yellow-400/15 to-transparent"
          style={{ right: '30%', top: '-10%', transform: 'rotate(-15deg)' }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scaleY: [1, 1.2, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Partículas flotantes - opacidad reducida */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              backgroundColor: 'rgba(234, 179, 8, 0.25)',
              boxShadow: '0 0 8px rgba(234, 179, 8, 0.3)'
            }}
            animate={{ 
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 3 + (i % 4), 
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Estrellas brillantes - opacidad reducida */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${(i * 47 + 20) % 100}%`,
              top: `${(i * 67 + 15) % 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full" 
                 style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5)' }} />
          </motion.div>
        ))}
      </div>

      {/* Botón volver arriba */}
      <AnimatePresence>
        {scrollProgress > 0.1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all hover:scale-110 group"
          >
            <svg 
              className="w-6 h-6 text-black group-hover:-translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Título principal */}
      <div className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Nuestra Historia
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Más de 22 años creando experiencias inolvidables en stands y diseño de espacios comerciales
        </motion.p>
        
        {/* Indicador de scroll */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-sm text-yellow-400/70">Scroll para explorar</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline Vertical con Scroll */}
      <div ref={timelineRef} className="relative py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto relative">
          {/* Línea vertical en zig-zag (solo visible en desktop) - 24 proyectos */}
          <svg
            className="absolute left-0 right-0 top-0 bottom-0 hidden md:block pointer-events-none z-0"
            style={{ height: '100%', minHeight: `${milestones.length * 550}px` }}
            viewBox={`0 0 1200 ${milestones.length * 550}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0.5)" />
                <stop offset="50%" stopColor="rgba(234, 179, 8, 0.8)" />
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0.5)" />
              </linearGradient>
              
              {/* Gradiente para el glow animado */}
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(234, 179, 8, 0.2)">
                  <animate attributeName="stop-color" 
                    values="rgba(234, 179, 8, 0.2); rgba(234, 179, 8, 0.6); rgba(234, 179, 8, 0.2)" 
                    dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="rgba(234, 179, 8, 0.6)">
                  <animate attributeName="stop-color" 
                    values="rgba(234, 179, 8, 0.6); rgba(234, 179, 8, 1); rgba(234, 179, 8, 0.6)" 
                    dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="rgba(234, 179, 8, 0.2)">
                  <animate attributeName="stop-color" 
                    values="rgba(234, 179, 8, 0.2); rgba(234, 179, 8, 0.6); rgba(234, 179, 8, 0.2)" 
                    dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>

              {/* Filtro de glow */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Línea de fondo completa (siempre visible pero sutil) */}
            <path
              d={milestones.map((_, index) => {
                const y = index * 550 + 275;
                const x = index % 2 === 0 ? 400 : 800;
                
                if (index === 0) {
                  return `M ${x} ${y}`;
                } else {
                  return `L ${x} ${y}`;
                }
              }).join(' ')}
              stroke="rgba(234, 179, 8, 0.15)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10 5"
            />
            
            {/* Línea de glow que crece con el scroll */}
            <motion.path
              d={milestones.map((_, index) => {
                const y = index * 550 + 275;
                const x = index % 2 === 0 ? 400 : 800;
                
                if (index === 0) {
                  return `M ${x} ${y}`;
                } else {
                  return `L ${x} ${y}`;
                }
              }).join(' ')}
              stroke="url(#glowGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              style={{ 
                pathLength: scrollYProgress
              }}
            />
            
            {/* Línea principal en zig-zag - se dibuja con el scroll */}
            <motion.path
              d={milestones.map((_, index) => {
                const y = index * 550 + 275;
                const x = index % 2 === 0 ? 400 : 800;
                
                if (index === 0) {
                  return `M ${x} ${y}`;
                } else {
                  return `L ${x} ${y}`;
                }
              }).join(' ')}
              stroke="url(#lineGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              style={{ 
                pathLength: scrollYProgress,
                filter: 'drop-shadow(0 0 14px rgba(234, 179, 8, 0.8))'
              }}
            />
            
            {/* Puntos brillantes más grandes en la línea */}
            {milestones.map((_, index) => {
              const y = index * 550 + 275;
              const x = index % 2 === 0 ? 400 : 800;
              return (
                <g key={`point-group-${index}`}>
                  {/* Círculo de glow */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="16"
                    fill="rgba(234, 179, 8, 0.2)"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.2 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                  />
                  {/* Círculo principal */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="rgba(234, 179, 8, 0.9)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 1))' }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Línea vertical simple para móvil */}
          <div className="absolute left-8 top-0 md:hidden" style={{ height: `${milestones.length * 400}px` }}>
            {/* Línea de fondo sutil */}
            <div className="relative w-1 h-full bg-gradient-to-b from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 rounded-full" />
            
            {/* Línea que crece con el scroll */}
            <motion.div 
              className="absolute top-0 left-0 w-1 rounded-full bg-gradient-to-b from-yellow-500/70 via-yellow-400/90 to-yellow-500/70"
              style={{ 
                height: mobileLineHeight,
                boxShadow: '0 0 10px rgba(234, 179, 8, 0.6), 0 0 20px rgba(234, 179, 8, 0.4)'
              }}
            />
            
            {/* Puntos en la línea móvil */}
            {milestones.map((_, index) => (
              <motion.div
                key={`mobile-point-${index}`}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-400"
                style={{ 
                  top: `${index * (100 / milestones.length)}%`,
                  boxShadow: '0 0 8px rgba(234, 179, 8, 0.8), 0 0 12px rgba(234, 179, 8, 0.5)'
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              />
            ))}
          </div>

          {/* Milestones */}
          <div className="space-y-32 md:space-y-48 relative z-10">
            {milestones.map((milestone, index) => (
              <TimelineNode
                key={index}
                milestone={milestone}
                index={index}
                isSelected={selectedNode === index}
                onSelect={() => setSelectedNode(selectedNode === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sección final */}
      <div className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-yellow-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Construyendo el futuro juntos
          </motion.h2>
          <motion.p
            className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Desde 2003, cada stand que diseñamos cuenta una historia única de éxito e innovación.
          </motion.p>
          <motion.p
            className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hemos trabajado con las marcas más prestigiosas del sector automotriz, financiero, tecnológico y agrícola,
            transformando espacios en experiencias memorables que conectan marcas con personas.
          </motion.p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div 
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-400/20 hover:border-yellow-400/40 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">23+</div>
              <div className="text-sm text-white/60">Años de Experiencia (2003-2025)</div>
            </motion.div>
            <motion.div 
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-400/20 hover:border-yellow-400/40 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-sm text-white/60">Proyectos Realizados</div>
            </motion.div>
            <motion.div 
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-400/20 hover:border-yellow-400/40 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">15+</div>
              <div className="text-sm text-white/60">Premios Ganados</div>
            </motion.div>
            <motion.div 
              className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-400/20 hover:border-yellow-400/40 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-sm text-white/60">Satisfacción</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {selectedNode !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-[#1a1a24] via-[#14141a] to-[#0a0a0f] rounded-3xl max-w-4xl w-full border-2 border-yellow-400/40 shadow-2xl shadow-yellow-500/20 relative overflow-hidden"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent pointer-events-none" />
              
              {/* Imagen grande del proyecto */}
              {milestones[selectedNode]?.image ? (
                <div className="relative w-full h-64 md:h-96 overflow-hidden">
                  <img
                    src={milestones[selectedNode]?.image}
                    alt={milestones[selectedNode]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] via-transparent to-transparent opacity-80" />
                  
                  {/* Icono y año flotante */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <div className="text-5xl md:text-6xl filter drop-shadow-lg">
                      {milestones[selectedNode]?.icon}
                    </div>
                    <div className="px-4 py-2 bg-yellow-400/90 backdrop-blur-sm rounded-lg">
                      <span className="text-black font-bold text-xl md:text-2xl">
                        {milestones[selectedNode]?.year}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Header sin imagen para el modal */
                <div className="relative w-full bg-gradient-to-br from-yellow-400/15 via-yellow-500/10 to-transparent p-10 md:p-16 text-center border-b border-yellow-400/20">
                  <div className="text-7xl md:text-8xl mb-6 filter drop-shadow-2xl">
                    {milestones[selectedNode]?.icon}
                  </div>
                  <div className="inline-block px-8 py-4 bg-yellow-400/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-yellow-500/30">
                    <span className="text-black font-bold text-3xl md:text-4xl">{milestones[selectedNode]?.year}</span>
                  </div>
                </div>
              )}
              
              {/* Contenido de texto */}
              <div className="relative z-10 p-6 md:p-10">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-3">
                  {milestones[selectedNode]?.title}
                </div>
                <div className="text-lg md:text-xl text-yellow-300/90 mb-4 font-semibold">
                  {milestones[selectedNode]?.desc}
                </div>
                <div className="text-base md:text-lg text-white/80 mb-8 leading-relaxed">
                  {milestones[selectedNode]?.details}
                </div>
                
                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50 hover:scale-105"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-yellow-400/50 text-yellow-400 font-bold hover:bg-yellow-400/10 transition-all hover:scale-105"
                  >
                    Ver más proyectos
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Componente para cada nodo de la timeline
function TimelineNode({ milestone, index, isSelected, onSelect }) {
  const nodeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const x = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    milestone.side === 'left' ? [-100, 0, 0] : [100, 0, 0]
  );

  return (
    <motion.div
      ref={nodeRef}
      className={`relative flex items-center ${
        milestone.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col gap-8 md:gap-16`}
      style={{ opacity, scale }}
    >
      {/* Contenido del milestone */}
      <motion.div
        className={`flex-1 ${milestone.side === 'left' ? 'md:text-right' : 'md:text-left'} text-center`}
        style={{ x }}
      >
        <motion.div
          className="inline-block overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a24]/90 to-[#0f0f14]/90 border border-yellow-400/20 hover:border-yellow-400/40 transition-all backdrop-blur-sm group cursor-pointer max-w-2xl"
          whileHover={{ scale: 1.05, borderColor: 'rgba(234, 179, 8, 0.6)' }}
          onClick={onSelect}
        >
          {/* Imagen del proyecto */}
          {milestone.image ? (
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <motion.img
                src={milestone.image}
                alt={milestone.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent opacity-60" />
              
              {/* Año flotante sobre la imagen */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 bg-yellow-400/90 backdrop-blur-sm rounded-lg">
                <span className="text-black font-bold text-lg md:text-xl">{milestone.year}</span>
              </div>
            </div>
          ) : (
            /* Header sin imagen - con icono y año grande */
            <div className="relative w-full bg-gradient-to-br from-yellow-400/10 via-yellow-500/5 to-transparent p-8 md:p-12 text-center border-b border-yellow-400/10">
              <div className="text-6xl md:text-7xl mb-4 filter drop-shadow-lg">
                {milestone.icon}
              </div>
              <div className="inline-block px-6 py-3 bg-yellow-400/90 backdrop-blur-sm rounded-xl">
                <span className="text-black font-bold text-2xl md:text-3xl">{milestone.year}</span>
              </div>
            </div>
          )}
          
          {/* Contenido de texto */}
          <div className="p-6 md:p-8">
            {/* Título */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
              {milestone.title}
            </h3>
            
            {/* Descripción */}
            <p className="text-sm md:text-base text-white/70 mb-2 leading-relaxed font-semibold">
              {milestone.desc}
            </p>
            
            {/* Preview de detalles */}
            <p className="text-xs md:text-sm text-white/50 mb-4 leading-relaxed line-clamp-2">
              {milestone.details}
            </p>
            
            {/* Indicador de más info */}
            <div className={`flex items-center ${milestone.side === 'left' ? 'md:justify-end' : 'md:justify-start'} justify-center gap-2 text-xs text-yellow-400/70 group-hover:text-yellow-400 transition-colors`}>
              <span>Ver proyecto completo</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Nodo central (solo visible en desktop) */}
      <div className="relative z-10 hidden md:block">
        {/* Línea conectora horizontal */}
        <motion.div
          className={`absolute top-1/2 ${
            milestone.side === 'left' ? 'left-full' : 'right-full'
          } w-16 h-0.5 bg-gradient-to-${
            milestone.side === 'left' ? 'r' : 'l'
          } from-yellow-400/50 to-transparent`}
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Círculo del nodo */}
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.2 }}
          onClick={onSelect}
        >
          {/* Pulso de fondo */}
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/30"
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.5, 0, 0.5] 
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Círculo principal */}
          <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-black to-[#1a1a1f] border-4 ${
            isSelected ? 'border-yellow-300 shadow-2xl shadow-yellow-400/60' : 'border-yellow-400 shadow-xl shadow-yellow-400/30'
          } flex items-center justify-center text-5xl overflow-hidden transition-all duration-300`}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent" />
            <span className="relative z-10 filter drop-shadow-lg">{milestone.icon}</span>
            
            {isSelected && (
              <motion.div
                className="absolute inset-0 border-4 border-yellow-300 rounded-full"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Espaciador (lado opuesto en desktop) */}
      <div className="hidden md:block flex-1" />

      {/* Nodo móvil (solo visible en móvil) */}
      <motion.div
        className="md:hidden relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSelect}
      >
        {/* Pulso */}
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-400/30 -m-3"
          animate={{ 
            scale: [1, 1.4, 1], 
            opacity: [0.5, 0, 0.5] 
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Círculo */}
        <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-black to-[#1a1a1f] border-4 ${
          isSelected ? 'border-yellow-300 shadow-xl shadow-yellow-400/60' : 'border-yellow-400 shadow-lg shadow-yellow-400/30'
        } flex items-center justify-center text-4xl`}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full" />
          <span className="relative z-10">{milestone.icon}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}