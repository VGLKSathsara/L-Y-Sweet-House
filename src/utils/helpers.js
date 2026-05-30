export function escapeHtml(str) {
  if (!str) return ''
  return str.replace(/[&<>"']/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])
  )
}

export function generateOrderId() {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const ts = String(now.getTime()).slice(-6)
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `LY-${yy}${mm}${dd}-${ts}${rand}`
}

export function buildWhatsAppMsg(orderId, customerName, userId, phone1, phone2, address, items, total, note, bandesiyaDeposit) {
  const dateStr = new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })
  const lines = [
    `🛕 *LY Sweet & Fancy House — New Order*`,
    ``,
    `Order ID: *${orderId}*`,
    `Date: ${dateStr}`,
    `Customer: *${customerName}*`,
    `User ID: *${userId}*`,
    `Phone 1: *${phone1}*`,
    `Phone 2: *${phone2}*`,
    address ? `Address: ${address}` : null,
    ``,
    `*Items:*`,
    ...items.map(item => {
      let line = `• ${item.name} x${item.qty} — Rs. ${(item.price * item.qty).toLocaleString()}`
      if (item.hasBandesiya) line += `\n  ↳ 🏺 Bandesiya deposit: Rs. ${(bandesiyaDeposit * item.qty).toLocaleString()} included`
      return line
    }),
    ``,
    `*Total: Rs. ${total.toLocaleString()}*`,
    note ? `Note: ${note}` : null,
    ``,
    `Please confirm this order. Thank you! 🙏`,
  ].filter(l => l !== null)
  return lines.join('\n')
}
