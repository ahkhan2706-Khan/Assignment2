// 12 records with stable IDs. stock = portions left today.
export const ITEMS = [
  { id: 'm1', name: 'Chicken Karahi Box', category: 'Meals', price: 650, stock: 10, veg: false, spicy: 3, kcal: 720, prep: 25, desc: 'Peshawari-style karahi with 2 rotis and salad.' },
  { id: 'm2', name: 'Daal Chawal Bowl', category: 'Meals', price: 380, stock: 14, veg: true, spicy: 1, kcal: 560, prep: 15, desc: 'Masoor daal tadka over steamed rice, achar on the side.' },
  { id: 'm3', name: 'Beef Pulao Box', category: 'Meals', price: 590, stock: 5, veg: false, spicy: 2, kcal: 810, prep: 30, desc: 'Yakhni pulao with raita and kachumber.' },
  { id: 'm4', name: 'Chana Chaat Bowl', category: 'Meals', price: 320, stock: 3, veg: true, spicy: 2, kcal: 430, prep: 10, desc: 'Chickpeas, yoghurt, tamarind, crisp papri.' },
  { id: 'm5', name: 'Alfredo Pasta Tub', category: 'Meals', price: 560, stock: 8, veg: false, spicy: 0, kcal: 690, prep: 20, desc: 'Creamy chicken pasta, reheats in 3 minutes.' },
  { id: 'b1', name: 'Exam Week Bundle (5 days)', category: 'Bundles', price: 2900, stock: 4, veg: false, spicy: 2, kcal: 3200, prep: 45, desc: 'Five lunches: Mon–Fri rotation. Delivered together.' },
  { id: 'b2', name: 'Veg Week Bundle (5 days)', category: 'Bundles', price: 2200, stock: 6, veg: true, spicy: 1, kcal: 2500, prep: 45, desc: 'Five vegetarian lunches, no repeats.' },
  { id: 's1', name: 'Frozen Samosa Pack (12)', category: 'Sides', price: 420, stock: 9, veg: false, spicy: 1, kcal: 900, prep: 5, collectionOnly: true, desc: 'Frozen, so collection only. Fry or air-fry at home.' },
  { id: 's2', name: 'Frozen Paratha Pack (6)', category: 'Sides', price: 300, stock: 12, veg: true, spicy: 0, kcal: 960, prep: 5, collectionOnly: true, desc: 'Frozen, so collection only.' },
  { id: 's3', name: 'Mint Raita Cup', category: 'Sides', price: 90, stock: 20, veg: true, spicy: 0, kcal: 80, prep: 2, desc: 'Cool mint yoghurt.' },
  { id: 'd1', name: 'Doodh Patti Flask', category: 'Drinks', price: 180, stock: 7, veg: true, spicy: 0, kcal: 210, prep: 8, desc: 'Strong tea in a 500 ml thermal flask.' },
  { id: 'd2', name: 'Rooh Afza Sharbat (1 L)', category: 'Drinks', price: 150, stock: 0, veg: true, spicy: 0, kcal: 260, prep: 2, desc: 'Sold out today – back tomorrow.' },
];
export const CATEGORIES = ['All', 'Meals', 'Bundles', 'Sides', 'Drinks'];
