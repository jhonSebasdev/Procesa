import { useRef, useState, useEffect } from "react";

export default function IntroVideo({ src, onEnded }) {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
      } catch (error) {
        // Silenciosamente maneja el error si el navegador bloquea autoplay
        console.warn("Autoplay bloqueado:", error);
      }
    };

    // Handler para cuando el video esté listo
    const handleCanPlay = () => {
      setIsReady(true);
      tryPlay();
    };

    // Agrega listener
    v.addEventListener("canplay", handleCanPlay);

    // Si ya está listo, reproduce inmediatamente
    if (v.readyState >= 2) {
      handleCanPlay();
    }

    // Cleanup
    return () => {
      v.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  // Maneja errores del video
  const handleError = () => {
    setHasError(true);
    setTimeout(onEnded, 500); // Da tiempo para mostrar el error
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 50%, rgba(255,255,255,0.08), rgba(0,0,0,1))",
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isReady && !hasError ? "opacity-100" : "opacity-0"
        }`}
        preload="auto"
        autoPlay
        muted
        playsInline
        poster="/imagenes/logo.png"
        onLoadedData={() => setIsReady(true)}
        onEnded={onEnded}
        onError={handleError}
        aria-label="Video de introducción"
      >
        <source src={src} type="video/webm" />
        {/* Fallback si webm no funciona */}
        <source src={src.replace('.webm', '.mp4')} type="video/mp4" />
      </video>

      {/* Mensaje de error (opcional) */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/70 text-sm">Cargando contenido...</p>
        </div>
      )}

      {/* Botón de saltar con mejor UX */}
      <button
        type="button"
        className="absolute bottom-6 right-6 px-5 py-2.5 text-xs font-medium tracking-widest uppercase 
                   bg-white/10 hover:bg-white/20 active:bg-white/30
                   text-white border border-white/30 rounded-lg
                   transition-all duration-200 hover:scale-105 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-white/50
                   backdrop-blur-sm"
        onClick={onEnded}
        aria-label="Saltar video de introducción"
        tabIndex={0}
      >
        Saltar intro
      </button>

      {/* Indicador de carga (opcional) */}
      {!isReady && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}