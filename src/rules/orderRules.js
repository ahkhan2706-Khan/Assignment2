// Business rules for Pindi Prep. Pure functions: used by the UI AND by tests/orderRules.test.js.
export const MAX_PER_ITEM = 6;          // Rule 1 (availability): max portions of one item per order
export const MIN_DELIVERY_ORDER = 800;  // Rule 3 (pricing): minimum subtotal for delivery (Rs)
export const DELIVERY_FEE = 150;        // Rs, waived at FREE_DELIVERY_AT
export const FREE_DELIVERY_AT = 2500;
export const AREAS = ['H-12', 'G-13', 'I-8', 'F-10', 'Bahria Town'];

// Rule 1: allowed quantity = smaller of per-order limit and remaining stock.
export function maxQtyFor(item) {
  return Math.max(0, Math.min(MAX_PER_ITEM, item.stock));
}

export function checkQuantity(qty, item) {
  const max = maxQtyFor(item);
  if (!Number.isInteger(qty) || qty < 1) return { ok: false, max, message: 'Quantity must be a whole number of at least 1.' };
  if (max === 0) return { ok: false, max, message: `${item.name} is sold out.` };
  if (qty > max) return { ok: false, max, message: `Only ${max} of ${item.name} allowed (limit ${MAX_PER_ITEM} per order, ${item.stock} in stock).` };
  return { ok: true, max, message: '' };
}

export function deliveryFee(subtotal, mode) {
  if (mode !== 'delivery' || subtotal === 0 || subtotal >= FREE_DELIVERY_AT) return 0;
  return DELIVERY_FEE;
}

// Rules 2 + 3: collection-only items can't be delivered; delivery needs area + minimum.
export function fulfilmentProblems({ lines, mode, area, subtotal }) {
  const problems = [];
  if (mode !== 'delivery') return problems;
  if (!AREAS.includes(area)) problems.push('Choose a delivery area from the list.');
  if (subtotal < MIN_DELIVERY_ORDER) problems.push(`Delivery needs at least Rs ${MIN_DELIVERY_ORDER}. Add Rs ${MIN_DELIVERY_ORDER - subtotal} more or switch to collection.`);
  const blocked = lines.filter((l) => l.item.collectionOnly).map((l) => l.item.name);
  if (blocked.length) problems.push(`${blocked.join(', ')} ${blocked.length > 1 ? 'are' : 'is'} collection only. Remove it or switch to collection.`);
  return problems;
}
