import { useRef, useState, useEffect } from "react";

export default function IntroVideo({ onEnded }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const playSafe = () => {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {});
      }
    };

    if (v.readyState >= 2) {
      setReady(true);
      playSafe();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 50%, rgba(255,255,255,0.08), rgba(0,0,0,1))",
      }}
    >
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        playsInline
        preload="metadata"
        poster="/imagenes/logo.png"
        onCanPlay={() => setReady(true)}
        onEnded={onEnded}
        onError={onEnded}
      >
        <source src="/intro.webm" type="video/webm" />
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        className="absolute bottom-6 right-6 px-4 py-2 text-xs tracking-widest uppercase bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md backdrop-blur"
        onClick={onEnded}
      >
        Saltar intro
      </button>
    </div>
  );
}
