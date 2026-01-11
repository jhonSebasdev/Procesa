export default function IntroVideo({ src, onEnded }) {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        onError={onEnded}
      />
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


