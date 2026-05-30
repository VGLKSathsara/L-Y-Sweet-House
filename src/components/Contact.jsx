const cards = [
  {
    href: 'https://wa.me/94767726820',
    icon: <i className="fa-brands fa-whatsapp text-2xl" />,
    iconBg: 'bg-green-100 text-green-700',
    label: 'WhatsApp',
    value: '0767 726 820',
    hint: 'Click to chat & order',
    external: true,
  },
  {
    href: 'tel:0767726820',
    icon: <i className="fa-solid fa-phone text-xl" />,
    iconBg: 'bg-blue-100 text-blue-700',
    label: 'Call Us',
    value: '0767 726 820',
    hint: 'Direct inquiries',
    external: false,
  },
  {
    href: 'https://maps.app.goo.gl/fi8dtkp7spiLS9sC9',
    icon: <i className="fa-solid fa-map-location-dot text-xl" />,
    iconBg: 'bg-brand-100 text-brand-700',
    label: 'Location',
    value: 'NO/59,C · New Town, Kataragama',
    hint: 'Open in Google Maps →',
    external: true,
    wide: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="inline-block bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Contact Us
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-2">Get In Touch</h2>
          <p className="text-gray-500 text-sm">Order via WhatsApp or call us for inquiries</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map(card => (
            <a
              key={card.label}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noreferrer' : undefined}
              className={`flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-50 hover:-translate-y-0.5 transition-all duration-200 group ${card.wide ? 'sm:col-span-2' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg} group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{card.label}</div>
                <div className="font-semibold text-gray-900 text-sm">{card.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{card.hint}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
