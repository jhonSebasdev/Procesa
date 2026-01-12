import { useRef, useState, useEffect } from "react";

export default function IntroVideo({ src, onEnded }) {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Intenta comenzar la reproducción apenas haya datos suficientes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => void 0);
      }
    };
    // Si ya puede reproducir, dispara
    if (v.readyState >= 2) {
      setIsReady(true);
      tryPlay();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      // Fondo de respaldo para evitar pantallazo negro mientras carga
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 50%, rgba(255,255,255,0.08), rgba(0,0,0,1))",
      }}
    >
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        preload="auto"
        autoPlay
        muted
        playsInline
        poster="/imagenes/logo.png"
        onLoadedData={() => setIsReady(true)}
        onCanPlay={() => setIsReady(true)}
        onEnded={onEnded}
        onError={onEnded}
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        type="button"
        className="absolute bottom-6 right-6 px-4 py-2 text-xs tracking-widest uppercase bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md"
        onClick={onEnded}
      >
        Saltar intro
      </button>
    </div>
  );
}


