export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631832725617-d28dbbb3a29a?q=80&w=1932&auto=format')" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-brand-900/75 to-brand-600/60" />

      {/* Floating decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium px-5 py-2 rounded-full mb-6 animate-fade-in-down">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          Kataragama New Town · Since 2015
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-5 animate-fade-in-up drop-shadow-xl">
          LY Sweet &amp;<br className="sm:hidden" /> Fancy House
        </h1>

        <p className="text-lg sm:text-xl font-medium text-white/90 mb-3 animate-fade-in-up [animation-delay:0.15s]">
          Premium Pooja Watti · Traditional Sweets · Toys for All Ages
        </p>

        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up [animation-delay:0.25s]">
          Quality items for your pooja, celebrations &amp; gifting needs.<br />
          Order via WhatsApp — quick confirmation &amp; delivery.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up [animation-delay:0.35s]">
          <button
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-brand-700 font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            🛍️ Browse Products
          </button>
          <a
            href="https://wa.me/94767726820"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-500/90 hover:bg-green-500 text-white font-semibold text-sm px-8 py-3.5 rounded-2xl border border-white/20 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <i className="fa-brands fa-whatsapp text-base" /> Order on WhatsApp
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-4 gap-4 max-w-lg mx-auto animate-fade-in-up [animation-delay:0.45s]">
          {[
            { v: '5+', l: 'Pooja Watti' },
            { v: '6+', l: 'Sweets' },
            { v: '5+', l: 'Toys' },
            { v: '24/7', l: 'WhatsApp' },
          ].map(s => (
            <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/15">
              <div className="font-bold text-lg text-white">{s.v}</div>
              <div className="text-[10px] text-white/60 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
