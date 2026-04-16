/* ═══════════════════════════════════════════════════════════════
   L.Y. Sweet & Fancy House — data.js
   All static data: pooja items, products, extras.
   Images sourced from Unsplash (free, no attribution required).
   ═══════════════════════════════════════════════════════════════ */

/* ── POOJA WATTI BUILDER DATA ──────────────────────────────── */

const POOJA_FRUITS = [
  {
    id: 'f1',
    name: 'Red Banana (රතු කෙසෙල් / செவ்வாழை)',
    unit: 'pc',
    default: 1,
  },
  {
    id: 'f2',
    name: 'Ambul Banana (ඇඹුල් කෙසෙල් / சீனி வாழை)',
    unit: 'pc',
    default: 3,
  },
  { id: 'f3', name: 'Mango (අඹ / மாம்பழம்)', unit: 'pc', default: 1 },
  { id: 'f4', name: 'Apple (ඇපල් / ஆப்பிள்)', unit: 'pc', default: 1 },
  { id: 'f5', name: 'Grapes (මිදි / திராட்சை)', unit: 'g', default: 100 },
  { id: 'f6', name: 'Orange (දොඩම් / ஆரஞ்சு)', unit: 'pc', default: 1 },
  { id: 'f7', name: 'Pineapple (අන්නාසි / அன்னாசி)', unit: 'pc', default: 1 },
  { id: 'f8', name: 'Pomegranate (දෙළුම් / மாதுளை)', unit: 'pc', default: 1 },
  { id: 'f9', name: 'Woodapple (දිවුල් / விளாம்பழம்)', unit: 'pc', default: 1 },
  { id: 'f10', name: 'Coconut (පොල් / தேங்காய்)', unit: 'pc', default: 1 },
  { id: 'f11', name: 'King Coconut (තැඹිලි / இளநீர்)', unit: 'pc', default: 1 },
]

const POOJA_SWEETS = [
  { id: 's1', name: 'Aasmi (ආස්මී / ஆஸ்மி)', unit: 'pc', default: 1 },
  {
    id: 's2',
    name: 'Konda Kewum (කොණ්ඩ කැවුම් / கொண்டை பணியாரம்)',
    unit: 'pcs',
    default: 2,
  },
  {
    id: 's3',
    name: 'Undu Walalu (උඳු වළලු / உளுந்து வடை)',
    unit: 'pcs',
    default: 2,
  },
  {
    id: 's4',
    name: 'Thala Kerali (තල කැරලි / எள் உருண்டை)',
    unit: 'pcs',
    default: 2,
  },
  { id: 's5', name: 'Maskat (මස්කට් / மஸ்கட்)', unit: 'pcs', default: 2 },
  {
    id: 's6',
    name: 'Puhul Dosi (පුහුල් දෝසි / பூசணி இனிப்பு)',
    unit: 'g',
    default: 100,
  },
  { id: 's7', name: 'Bundi (බුන්දි / பூந்தி)', unit: 'g', default: 100 },
]

const POOJA_SACRED = [
  {
    id: 'sc1',
    name: 'Flower Garland (මල් මාලය / பூமாலை)',
    unit: 'pc',
    default: 1,
  },
  {
    id: 'sc2',
    name: 'Fabric Offering (රෙදි පූජාව / வஸ்திரம்)',
    unit: 'yd',
    default: 1,
  },
  {
    id: 'sc3',
    name: 'Incense Sticks (හඳුන්කූරු / ஊதுபத்தி)',
    unit: 'pack',
    default: 1,
  },
  { id: 'sc4', name: 'Camphor (කපුරු / கற்பூரம்)', unit: 'pc', default: 1 },
]

const EXTRAS = [
  { id: 'e1', emoji: '🌸', label: 'Extra Garland' },
  { id: 'e2', emoji: '🕯️', label: 'Oil Lamp' },
  { id: 'e3', emoji: '🌿', label: 'Neem Leaves' },
  { id: 'e4', emoji: '🎋', label: 'Pooja Basket' },
  { id: 'e5', emoji: '🥥', label: 'Extra Coconut' },
  { id: 'e6', emoji: '🍌', label: 'Banana Bunch' },
]

/* ── SHOP PRODUCTS ─────────────────────────────────────────── */
// img: Unsplash photo IDs used via https://images.unsplash.com/photo-{id}?w=400&q=80

const SWEETS_PRODUCTS = [
  {
    emoji: '🍮',
    name: 'Konda Kewum',
    desc: 'Deep-fried sweet dumplings in treacle, a festival favourite',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?w=400&q=80',
  },
  {
    emoji: '🌀',
    name: 'Undu Walalu',
    desc: 'Ring-shaped gram flour sweets, crisp and golden',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80',
  },
  {
    emoji: '🟡',
    name: 'Aasmi',
    desc: 'Delicate rice flour sweets drizzled with coconut treacle',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80',
  },
  {
    emoji: '🍯',
    name: 'Puhul Dosi',
    desc: 'Ash pumpkin preserve sweetened with jaggery',
    unit: 'per 100g',
    img: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=400&q=80',
  },
  {
    emoji: '🔵',
    name: 'Thala Kerali',
    desc: 'Sesame and coconut sweet rolls with natural sweetness',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&q=80',
  },
  {
    emoji: '🟠',
    name: 'Maskat',
    desc: 'Traditional semolina-based sweet with cashew topping',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  },
  {
    emoji: '🍬',
    name: 'Bundi',
    desc: 'Golden gram flour pearls in sugar syrup — a temple classic',
    unit: 'per 100g',
    img: 'https://images.unsplash.com/photo-1571101879741-3c63cfa47890?w=400&q=80',
  },
  {
    emoji: '🌾',
    name: 'Uguressa',
    desc: 'Traditional fermented rice cracker, light and crispy',
    unit: 'per 100g',
    img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&q=80',
  },
]

const TOYS_PRODUCTS = [
  {
    emoji: '🚗',
    name: 'Toy Car Set',
    desc: 'Pull-back friction cars, safe for ages 3+. Set of 4 colorful vehicles',
    unit: 'per set',
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80',
  },
  {
    emoji: '🧸',
    name: 'Teddy Bear',
    desc: 'Super soft plush teddy, perfect as a gift or keepsake',
    unit: 'per piece',
    badge: 'Gift Ready',
    img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=400&q=80',
  },
  {
    emoji: '🎨',
    name: 'Drawing Set',
    desc: '24-colour crayon and sketch pad set for budding artists aged 4+',
    unit: 'per set',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
  },
  {
    emoji: '🧩',
    name: 'Wooden Puzzle',
    desc: 'Colorful animal-shaped puzzle pieces, educational and fun',
    unit: 'per set',
    badge: 'Educational',
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80',
  },
  {
    emoji: '🪀',
    name: 'Spinning Top',
    desc: 'Traditional Lanka-style spinning top, durable metal & wood',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80',
  },
  {
    emoji: '🎯',
    name: 'Ring Toss Game',
    desc: 'Family ring toss game, great for outdoor play. Includes 6 rings',
    unit: 'per set',
    img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
  },
  {
    emoji: '🚂',
    name: 'Train Set',
    desc: 'Magnetic wooden railway set with engine, 3 carriages & track pieces',
    unit: 'per set',
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400&q=80',
  },
  {
    emoji: '🪁',
    name: 'Foam Dart Blaster',
    desc: 'Safe foam dart blaster toy, 6-dart pack included',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
]

const FANCY_PRODUCTS = [
  {
    emoji: '🏮',
    name: 'Decorative Oil Lamp',
    desc: 'Hand-crafted brass oil lamp for pooja rooms and home altars',
    unit: 'per piece',
    badge: 'Handcrafted',
    img: 'https://images.unsplash.com/photo-1603905731478-3cfa1c58e3a0?w=400&q=80',
  },
  {
    emoji: '🌸',
    name: 'Artificial Flower Arrangement',
    desc: 'Premium silk flower arrangement, long-lasting and vibrant',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1487530811015-780f2c4f59af?w=400&q=80',
  },
  {
    emoji: '🪞',
    name: 'Decorative Wall Mirror',
    desc: 'Ornate-framed wall mirror with floral motif border, 30×30 cm',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80',
  },
  {
    emoji: '🎁',
    name: 'Gift Hamper Box',
    desc: 'Reusable woven gift hamper box, ideal for sweets & offerings',
    unit: 'per piece',
    badge: 'Gift Ready',
    img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80',
  },
  {
    emoji: '🏺',
    name: 'Ceramic Vase',
    desc: 'Painted ceramic vase, available in 3 designs',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1578913071922-02ee8166c6fc?w=400&q=80',
  },
  {
    emoji: '🕯️',
    name: 'Scented Candle Set',
    desc: 'Jasmine & sandalwood candles, set of 3 with decorative holders',
    unit: 'per set',
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    emoji: '🧺',
    name: 'Woven Storage Basket',
    desc: 'Handwoven natural fibre basket, perfect for pooja room storage',
    unit: 'per piece',
    img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80',
  },
  {
    emoji: '✨',
    name: 'Crystal Deity Figurine',
    desc: 'Ornate crystal deity statue for your home shrine or altar',
    unit: 'per piece',
    badge: 'Premium',
    img: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=400&q=80',
  },
]
