import test from 'node:test';
import assert from 'node:assert/strict';
import { checkQuantity, MAX_PER_ITEM } from '../src/rules/orderRules.js';

const item = { name: 'Chicken Karahi Box', stock: 10 };

test('valid quantity is accepted', () => {
  assert.equal(checkQuantity(3, item).ok, true);
});
test('exactly the limit (6) is accepted', () => {
  assert.equal(checkQuantity(MAX_PER_ITEM, item).ok, true);
});
test('one above the limit (7) is rejected with a message', () => {
  const r = checkQuantity(7, item);
  assert.equal(r.ok, false);
  assert.match(r.message, /limit 6/);
});
test('stock lower than the limit caps the quantity', () => {
  assert.equal(checkQuantity(3, { ...item, stock: 2 }).ok, false);
});
