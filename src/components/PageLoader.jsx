export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center shadow-lg shadow-brand-200 animate-[loaderPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]"
        style={{ animation: 'loaderPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <img src="/logo.png" alt="" className="w-14 h-14 object-contain rounded-xl" />
      </div>
      <p className="font-display font-bold text-brand-600 text-base tracking-wide animate-fade-in-up">
        LY Sweet &amp; Fancy House
      </p>
      <div className="flex gap-2">
        {[0, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-brand-500 animate-dot-pulse"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      <style>{`
        @keyframes loaderPop {
          from { opacity:0; transform:scale(0.7); }
          to   { opacity:1; transform:scale(1); }
        }
      `}</style>
    </div>
  )
}
