// 12 records with stable IDs. stock = portions left today.
export const ITEMS = [
  { id: 'm1', name: 'Khan Crunch Burger', category: 'Burgers', price: 590, stock: 10, veg: false, spicy: 3, kcal: 650, prep: 12, desc: 'Crispy spiced chicken fillet, mayo and lettuce in a toasted bun.' },
  { id: 'm2', name: 'Double Khan Stack', category: 'Burgers', price: 890, stock: 6, veg: false, spicy: 2, kcal: 980, prep: 15, desc: 'Two fillets, cheese slice and house sauce.' },
  { id: 'm3', name: 'Tikka Grill Burger', category: 'Burgers', price: 640, stock: 5, veg: false, spicy: 2, kcal: 590, prep: 14, desc: 'Grilled tikka-marinated chicken with mint chutney.' },
  { id: 'm4', name: 'Aloo Patty Burger', category: 'Burgers', price: 450, stock: 8, veg: true, spicy: 1, kcal: 520, prep: 10, desc: 'Potato and pea patty, tomato and green chutney.' },
  { id: 'c1', name: 'Fried Chicken, 2 Pieces', category: 'Chicken', price: 520, stock: 12, veg: false, spicy: 2, kcal: 640, prep: 15, desc: 'Pressure-fried, with one roll.' },
  { id: 'c2', name: 'Fire Wings (6)', category: 'Chicken', price: 480, stock: 9, veg: false, spicy: 3, kcal: 540, prep: 15, desc: 'Wings tossed in chilli-garlic glaze.' },
  { id: 'c3', name: 'Family Bucket (8 pieces)', category: 'Chicken', price: 2290, stock: 4, veg: false, spicy: 2, kcal: 2600, prep: 25, desc: 'Eight pieces, 4 rolls and a large fries.' },
  { id: 'w1', name: 'Chicken Tikka Wrap', category: 'Wraps', price: 430, stock: 11, veg: false, spicy: 2, kcal: 560, prep: 10, desc: 'Tikka strips, onion and raita in a paratha wrap.' },
  { id: 's1', name: 'Masala Fries', category: 'Sides', price: 260, stock: 20, veg: true, spicy: 2, kcal: 430, prep: 8, desc: 'Skin-on fries with chaat masala.' },
  { id: 's2', name: 'Coleslaw Cup', category: 'Sides', price: 120, stock: 0, veg: true, spicy: 0, kcal: 150, prep: 2, desc: 'Sold out today. Back tomorrow.' },
  { id: 'd1', name: 'Mint Margarita', category: 'Drinks', price: 220, stock: 14, veg: true, spicy: 0, kcal: 140, prep: 4, desc: 'Fresh mint, lemon and soda.' },
  { id: 'd2', name: 'Soft-Serve Sundae', category: 'Desserts', price: 190, stock: 7, veg: true, spicy: 0, kcal: 310, prep: 3, collectionOnly: true, desc: 'Melts in transit, so collection only.' },
];
export const CATEGORIES = ['All', 'Burgers', 'Chicken', 'Wraps', 'Sides', 'Drinks', 'Desserts'];
