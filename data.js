// ============================================================
//  LY SWEET & FANCY HOUSE — Data Configuration
//  Edit this file to add/remove/update products & settings
// ============================================================

const CONFIG = {
  shopName: 'LY Sweet & Fancy House',
  address: 'O/59,C , L.Y Sweet and Fancy House, New Town, Katharagama',
  phone: '0703714386',
  whatsapp: '94703714386',
  mapsUrl: 'https://maps.app.goo.gl/fi8dtkp7spiLS9sC9',
  // Bandesiya deposit — Rs. 500 extra, refunded if returned
  bandesiyaDeposit: 500,
}

// ============================================================
//  POOJA WATTI — Price tiers
//  Keys are display labels shown on the card
// ============================================================
const POOJA_WATTI = [
  {
    id: 'pw1000',
    name: 'Pooja Wattiya — Rs. 1,000',
    price: 1000,
    description: 'Palathuru varga 5k',
    details: ['Palathuru varga 5'],
    emoji: '🌸',
    hasBandesiya: false,
  },
  {
    id: 'pw2000',
    name: 'Pooja Wattiya — Rs. 2,000',
    price: 2000,
    description: 'Palathuru varga 7k',
    details: ['Palathuru varga 7'],
    emoji: '🌺',
    hasBandesiya: false,
  },
  {
    id: 'pw3000',
    name: 'Pooja Wattiya — Rs. 3,000',
    price: 3000,
    description: 'Palathuru varga 10k · Loku bandesiyakata',
    details: ['Palathuru varga 10', 'Loku bandesiya'],
    emoji: '🪷',
    hasBandesiya: true,
  },
  {
    id: 'pw4000',
    name: 'Pooja Wattiya — Rs. 4,000',
    price: 4000,
    description: 'Palathuru varga 11k · Kevili varga 5k · Loku bandesiyakata',
    details: ['Palathuru varga 11', 'Kevili varga 5', 'Loku bandesiya'],
    emoji: '🌷',
    hasBandesiya: true,
  },
  {
    id: 'pw5000',
    name: 'Pooja Wattiya — Rs. 5,000',
    price: 5000,
    description: 'Palathuru varga 13k · Kevili varga 7k · Loku bandesiyakata',
    details: ['Palathuru varga 13', 'Kevili varga 7', 'Loku bandesiya'],
    emoji: '💐',
    hasBandesiya: true,
  },
]

// ============================================================
//  SWEET ITEMS
//  Add/remove sweets here. price = per unit or per pack.
// ============================================================
const SWEET_ITEMS = [
  {
    id: 'sw001',
    name: 'Kokis',
    price: 150,
    unit: 'pack',
    emoji: '🍪',
    description: 'Traditional Sri Lankan crispy sweet',
  },
  {
    id: 'sw002',
    name: 'Aluwa',
    price: 200,
    unit: 'pack',
    emoji: '🍬',
    description: 'Soft milk-based sweet',
  },
  {
    id: 'sw003',
    name: 'Kavum',
    price: 180,
    unit: 'pack',
    emoji: '🍮',
    description: 'Traditional oil cake',
  },
  {
    id: 'sw004',
    name: 'Dodol',
    price: 250,
    unit: 'pack',
    emoji: '🍫',
    description: 'Rich jaggery sweet',
  },
  {
    id: 'sw005',
    name: 'Kalu Dodol',
    price: 300,
    unit: 'pack',
    emoji: '🟫',
    description: 'Dark rich dodol',
  },
  {
    id: 'sw006',
    name: 'Aggala',
    price: 100,
    unit: 'pack',
    emoji: '🫓',
    description: 'Rice flour sweet balls',
  },
]

// ============================================================
//  TOY ITEMS
//  Add/remove toys here.
// ============================================================
const TOY_ITEMS = [
  {
    id: 'ty001',
    name: 'Small Toy Set',
    price: 350,
    unit: 'set',
    emoji: '🧸',
    description: 'Colourful small toy set for kids',
  },
  {
    id: 'ty002',
    name: 'Toy Car',
    price: 500,
    unit: 'piece',
    emoji: '🚗',
    description: 'Friction-powered toy car',
  },
  {
    id: 'ty003',
    name: 'Doll',
    price: 450,
    unit: 'piece',
    emoji: '🪆',
    description: 'Soft fabric doll',
  },
  {
    id: 'ty004',
    name: 'Bubble Set',
    price: 200,
    unit: 'set',
    emoji: '🫧',
    description: 'Bubble wand and soap set',
  },
  {
    id: 'ty005',
    name: 'Colouring Book',
    price: 280,
    unit: 'book',
    emoji: '🖍️',
    description: 'Kids colouring book with crayons',
  },
]

// Merge all for easy lookup
const ALL_PRODUCTS = [...POOJA_WATTI, ...SWEET_ITEMS, ...TOY_ITEMS]
