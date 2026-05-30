export const POOJA_WATTI = [
  {
    id: 'pw1000',
    name: 'Pooja Wattiya — Rs. 1,000',
    price: 1000,
    description: 'Palathuru varga 5k',
    details: ['Palathuru varga 5'],
    emoji: '🌸',
    hasBandesiya: false,
    imageUrl: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776494844/1000-puja_rvmyim.jpg',
  },
  {
    id: 'pw2000',
    name: 'Pooja Wattiya — Rs. 2,000',
    price: 2000,
    description: 'Palathuru varga 7k',
    details: ['Palathuru varga 7'],
    emoji: '🌺',
    hasBandesiya: false,
    imageUrl: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776494844/2000-puja_hmoscv.jpg',
  },
  {
    id: 'pw3000',
    name: 'Pooja Wattiya — Rs. 3,000',
    price: 3000,
    description: 'Palathuru varga 10k · Loku bandesiyakata',
    details: ['Palathuru varga 10', 'Loku plastic bandesiya'],
    emoji: '🪷',
    hasBandesiya: true,
    imageUrl: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776494846/3000-puja_phvgui.jpg',
  },
  {
    id: 'pw4000',
    name: 'Pooja Wattiya — Rs. 4,000',
    price: 4000,
    description: 'Palathuru varga 11k · Kevili varga 5k · Loku bandesiyakata',
    details: ['Palathuru varga 11', 'Kevili varga 5', 'Loku bandesiya'],
    emoji: '🌷',
    hasBandesiya: true,
    imageUrl: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776494845/4000-puja_byibsp.jpg',
  },
  {
    id: 'pw5000',
    name: 'Pooja Wattiya — Rs. 5,000',
    price: 5000,
    description: 'Palathuru varga 13k · Kevili varga 7k · Loku bandesiyakata',
    details: ['Palathuru varga 13', 'Kevili varga 7', 'Loku bandesiya'],
    emoji: '💐',
    hasBandesiya: true,
    imageUrl: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776494844/5000-puja_mp6x15.jpg',
  },
  {
    id: 'pw300',
    name: 'Lemon Garland (දෙහි මාලය) — Rs. 300',
    price: 300,
    description: 'Vahanayata Arakshava',
    details: ['Vahanayata Arakshava', 'Yana ena gamanata arakshava'],
    emoji: '🍋',
    hasBandesiya: false,
    imageUrl: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776494846/lemon-puja_gzizdf.jpg',
  },
]

export const SWEET_ITEMS = [
  { id: 'sw001', name: 'Kokis',     price: 150, emoji: '🍪', description: 'Traditional Sri Lankan crispy sweet', hasBandesiya: false },
  { id: 'sw002', name: 'Aluwa',     price: 200, emoji: '🍬', description: 'Soft milk-based sweet',               hasBandesiya: false },
  { id: 'sw003', name: 'Kavum',     price: 180, emoji: '🍮', description: 'Traditional oil cake',                hasBandesiya: false },
  { id: 'sw004', name: 'Dodol',     price: 250, emoji: '🍫', description: 'Rich jaggery sweet',                  hasBandesiya: false },
  { id: 'sw005', name: 'Kalu Dodol',price: 300, emoji: '🟫', description: 'Dark rich dodol',                     hasBandesiya: false },
  { id: 'sw006', name: 'Aggala',    price: 100, emoji: '🫓', description: 'Rice flour sweet balls',              hasBandesiya: false },
]

export const TOY_ITEMS = [
  { id: 'ty001', name: 'Small Toy Set',   price: 350, emoji: '🧸', description: 'Colourful small toy set for kids', hasBandesiya: false },
  { id: 'ty002', name: 'Toy Car',         price: 500, emoji: '🚗', description: 'Friction-powered toy car',          hasBandesiya: false },
  { id: 'ty003', name: 'Doll',            price: 450, emoji: '🪆', description: 'Soft fabric doll',                  hasBandesiya: false },
  { id: 'ty004', name: 'Bubble Set',      price: 200, emoji: '🫧', description: 'Bubble wand and soap set',          hasBandesiya: false },
  { id: 'ty005', name: 'Colouring Book',  price: 280, emoji: '🖍️', description: 'Kids colouring book with crayons',  hasBandesiya: false },
]

export const ALL_PRODUCTS = [...POOJA_WATTI, ...SWEET_ITEMS, ...TOY_ITEMS]

export const GALLERY_IMAGES = [
  ...POOJA_WATTI.filter(p => p.imageUrl).map(p => ({ src: p.imageUrl, caption: p.name, category: 'Pooja Watti' })),
  { src: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776496214/image-3_w1ibl0.jpg',  caption: 'Shop 1', category: 'Pooja Watti' },
  { src: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776496211/image-4_wewsfx.jpg',  caption: 'Shop 2', category: 'Pooja Watti' },
  { src: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776496210/image-2_ozn5ix.jpg',  caption: 'Shop 3', category: 'Pooja Watti' },
  { src: 'https://res.cloudinary.com/dbxpxk912/image/upload/v1776496210/image-1_ey01yu.jpg',  caption: 'Shop 4', category: 'Pooja Watti' },
]
