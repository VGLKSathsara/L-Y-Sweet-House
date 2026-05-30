import { useState } from 'react'

const PHONE_RE = /^0[0-9]{9}$/

export default function OrderModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', userId: '', phone1: '', phone2: '', address: '', note: '' })
  const [error, setError] = useState('')

  if (!open) return null

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Please enter your name.')
    if (!form.userId.trim()) return setError('Please enter your User ID (NIC / Passport / Driving License).')
    if (!form.phone1.trim()) return setError('Please enter Phone Number 1 (WhatsApp).')
    if (!PHONE_RE.test(form.phone1)) return setError('Phone 1 must be a 10-digit Sri Lankan number (e.g. 0712345678).')
    if (!form.phone2.trim()) return setError('Please enter Phone Number 2 (Alternative).')
    if (!PHONE_RE.test(form.phone2)) return setError('Phone 2 must be a 10-digit Sri Lankan number.')
    onSubmit(form)
    setForm({ name: '', userId: '', phone1: '', phone2: '', address: '', note: '' })
  }

  const fields = [
    { id: 'name',    label: 'Full Name *',                          type: 'text',     placeholder: 'Eg: Kamal Perera',       auto: 'name' },
    { id: 'userId',  label: 'User ID (NIC / Passport / License) *', type: 'text',     placeholder: 'Eg: 123456789V',         auto: 'off' },
    { id: 'phone1',  label: 'Phone 1 (WhatsApp) *',                type: 'tel',      placeholder: 'Eg: 0712345678',         auto: 'tel' },
    { id: 'phone2',  label: 'Phone 2 (Alternative / Family) *',    type: 'tel',      placeholder: 'Eg: 0771234567',         auto: 'tel-extension' },
    { id: 'address', label: 'Delivery Address (optional)',          type: 'text',     placeholder: 'Eg: No 5, Main St',      auto: 'street-address' },
  ]

  return (
    <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90dvh] overflow-y-auto shadow-2xl animate-pop-in" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between rounded-t-3xl">
          <h3 className="font-display font-bold text-lg text-gray-900">📲 Order Details</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 text-xl transition-colors">×</button>
        </div>

        <div className="px-6 pb-6 pt-4">
          <p className="text-xs text-gray-400 mb-5">Fill your details below. WhatsApp message will be generated automatically.</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">{error}</div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {fields.map(f => (
              <div key={f.id}>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.id]}
                  onChange={set(f.id)}
                  placeholder={f.placeholder}
                  autoComplete={f.auto}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Special Notes (optional)</label>
              <textarea
                value={form.note}
                onChange={set('note')}
                placeholder="Eg: Delivery time preference, special requirements..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors text-sm mt-2"
            >
              <i className="fa-brands fa-whatsapp text-lg" /> Send Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
