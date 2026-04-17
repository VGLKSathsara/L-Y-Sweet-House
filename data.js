// ============================================================
//  LY SWEET & FANCY HOUSE — Data Configuration
//  Add imageUrl to any product to show image instead of emoji
//  Image will be displayed from your URL
// ============================================================

const CONFIG = {
  shopName: 'LY Sweet & Fancy House',
  address: 'NO/59,C , L.Y Sweet and Fancy House, New Town, Katharagama',
  phone: '0703714386',
  whatsapp: '94703714386',
  mapsUrl: 'https://maps.app.goo.gl/fi8dtkp7spiLS9sC9',
  bandesiyaDeposit: 500,
}

// ============================================================
//  POOJA WATTI
//  Add imageUrl: "https://your-image-url.com/image.jpg" to show image
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
    // imageUrl: "https://example.com/pooja-1000.jpg"  // Add your image URL here
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
//  Add imageUrl to show product images
// ============================================================
const SWEET_ITEMS = [
  {
    id: 'sw001',
    name: 'Kokis',
    price: 150,
    unit: 'pack',
    emoji: '🍪',
    description: 'Traditional Sri Lankan crispy sweet',
    hasBandesiya: false,
    // imageUrl: "https://example.com/kokis.jpg"
  },
  {
    id: 'sw002',
    name: 'Aluwa',
    price: 200,
    unit: 'pack',
    emoji: '🍬',
    description: 'Soft milk-based sweet',
    hasBandesiya: false,
  },
  {
    id: 'sw003',
    name: 'Kavum',
    price: 180,
    unit: 'pack',
    emoji: '🍮',
    description: 'Traditional oil cake',
    hasBandesiya: false,
  },
  {
    id: 'sw004',
    name: 'Dodol',
    price: 250,
    unit: 'pack',
    emoji: '🍫',
    description: 'Rich jaggery sweet',
    hasBandesiya: false,
  },
  {
    id: 'sw005',
    name: 'Kalu Dodol',
    price: 300,
    unit: 'pack',
    emoji: '🟫',
    description: 'Dark rich dodol',
    hasBandesiya: false,
  },
  {
    id: 'sw006',
    name: 'Aggala',
    price: 100,
    unit: 'pack',
    emoji: '🫓',
    description: 'Rice flour sweet balls',
    hasBandesiya: false,
  },
]

// ============================================================
//  TOY ITEMS
//  Add imageUrl to show product images
// ============================================================
const TOY_ITEMS = [
  {
    id: 'ty001',
    name: 'Small Toy Set',
    price: 350,
    unit: 'set',
    emoji: '🧸',
    description: 'Colourful small toy set for kids',
    hasBandesiya: false,
  },
  {
    id: 'ty002',
    name: 'Toy Car',
    price: 500,
    unit: 'piece',
    emoji: '🚗',
    description: 'Friction-powered toy car',
    hasBandesiya: false,
  },
  {
    id: 'ty003',
    name: 'Doll',
    price: 450,
    unit: 'piece',
    emoji: '🪆',
    description: 'Soft fabric doll',
    hasBandesiya: false,
  },
  {
    id: 'ty004',
    name: 'Bubble Set',
    price: 200,
    unit: 'set',
    emoji: '🫧',
    description: 'Bubble wand and soap set',
    hasBandesiya: false,
  },
  {
    id: 'ty005',
    name: 'Colouring Book',
    price: 280,
    unit: 'book',
    emoji: '🖍️',
    description: 'Kids colouring book with crayons',
    hasBandesiya: false,
  },
]

const ALL_PRODUCTS = [...POOJA_WATTI, ...SWEET_ITEMS, ...TOY_ITEMS]
