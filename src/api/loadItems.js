import { ITEMS } from '../data/items.js';
// Mock async loader. demo.fail forces a failure; demo.soldOut lists ids whose stock is set to 0 (changed availability).
export function loadItems(demo = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (demo.fail) return reject(new Error('Simulated loading failure'));
      resolve(ITEMS.map((i) => (demo.soldOut?.includes(i.id) ? { ...i, stock: 0 } : i)));
    }, 600);
  });
}
