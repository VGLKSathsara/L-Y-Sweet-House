const stats = [
  { value: '🪷 5+', label: 'Pooja Watti' },
  { value: '🍬 6+', label: 'Sweet Items' },
  { value: '🧸 5+', label: 'Toy Items'   },
  { value: '📲 24/7', label: 'WhatsApp Order' },
]

export default function About() {
  return (
    <>
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                About Us
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-5 leading-tight">
                Welcome to<br />LY Sweet &amp; Fancy House
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Located in the heart of Kataragama New Town, just minutes from the sacred Kataragama Devalaya and Kirivehera Temple. We provide high-quality pooja watti, traditional sweet items, and toys for devotees and families visiting this holy city.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Whether you're preparing for devalaya pooja, celebrating a festival, or buying gifts for children — we have everything you need. Order via WhatsApp for easy pickup or delivery.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map(s => (
                  <div key={s.label} className="bg-brand-50 border border-brand-100 rounded-2xl p-4 text-center">
                    <div className="font-bold text-lg text-brand-700 mb-1">{s.value}</div>
                    <div className="text-[11px] text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Location card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-location-dot text-brand-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900">Prime Location</h3>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  '📍 NO/59,C, New Town, Kataragama',
                  '🚶 5 min walk to Kataragama Devalaya',
                  '🚶 8 min walk to Kirivehera Temple',
                  '🅿️ Easy parking available',
                  '🏪 Nearby: Cargills, Sathosa, Restaurants',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">{item}</li>
                ))}
              </ul>
              <a
                href="https://maps.app.goo.gl/fi8dtkp7spiLS9sC9"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <i className="fa-solid fa-map-location-dot" /> View on Google Maps
              </a>

              {/* Open hours badge */}
              <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-700 font-medium">Open daily · 5:00 AM – 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandesiya info banner */}
      <div className="py-12 px-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto flex gap-5 items-start">
          <span className="text-4xl flex-shrink-0">🏺</span>
          <div>
            <h3 className="font-display font-bold text-amber-900 text-lg mb-2">Bandesiya Deposit Policy</h3>
            <p className="text-amber-800 text-sm leading-relaxed mb-1">
              For pooja wattiya above Rs. 3,000, a <strong>large bandesiya</strong> is provided. <strong>Rs. 500 deposit</strong> is automatically included in the price.
            </p>
            <p className="text-amber-700 text-sm leading-relaxed">
              ✅ <strong>If you return the bandesiya</strong> → Rs. 500 refunded &nbsp;|&nbsp; ✅ <strong>If you keep it</strong> → Deposit kept<br />
              📋 Keep your order slip for bandesiya return reference.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
