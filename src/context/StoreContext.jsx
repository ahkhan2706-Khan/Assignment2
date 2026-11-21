import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { loadItems } from '../api/loadItems.js';
import { maxQtyFor, deliveryFee } from '../rules/orderRules.js';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const read = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be blocked */ } };

export function StoreProvider({ children }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [retryKey, setRetryKey] = useState(0);
  const [lines, setLines] = useState(() => read('pp-lines', {})); // { itemId: qty }  (persisted)
  const [mode, setMode] = useState(() => read('pp-mode', 'delivery'));
  const [notices, setNotices] = useState([]);
  const [order, setOrder] = useState(() => read('pp-order', null));
  const [demo, setDemo] = useState(() => read('pp-demo', { fail: false, soldOut: [] }));

  // Load data asynchronously; ignore stale results on cleanup.
  useEffect(() => {
    let ignore = false;
    setStatus('loading');
    loadItems(demo).then((d) => { if (!ignore) { setItems(d); setStatus('ready'); } })
      .catch(() => { if (!ignore) setStatus('error'); });
    return () => { ignore = true; };
  }, [retryKey, demo]);

  // Check saved/restored selections against current data + rules.
  useEffect(() => {
    if (status !== 'ready') return;
    const msgs = []; const next = {};
    for (const [id, qty] of Object.entries(lines)) {
      const item = items.find((i) => i.id === id);
      if (!item) { msgs.push('An item in your saved order no longer exists and was removed.'); continue; }
      const max = maxQtyFor(item);
      if (max < 1) { msgs.push(`${item.name} is sold out and was removed from your order.`); continue; }
      if (qty > max) { msgs.push(`${item.name} changed from ${qty} to ${max} because only ${max} can be ordered now.`); next[id] = max; continue; }
      next[id] = qty;
    }
    if (msgs.length) { setLines(next); setNotices(msgs); }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-check when data changes
  }, [items, status]);

  useEffect(() => write('pp-lines', lines), [lines]);
  useEffect(() => write('pp-mode', mode), [mode]);
  useEffect(() => write('pp-order', order), [order]);
  useEffect(() => write('pp-demo', demo), [demo]);

  const setQty = useCallback((id, qty) => {
    setLines((prev) => {
      if (qty <= 0) { const { [id]: _removed, ...rest } = prev; return rest; }
      return { ...prev, [id]: qty };
    });
  }, []);
  const clearCart = useCallback(() => setLines({}), []);

  const cartLines = useMemo(
    () => items.filter((i) => lines[i.id]).map((item) => ({ item, qty: lines[item.id] })),
    [items, lines]
  );
  const count = cartLines.reduce((n, l) => n + l.qty, 0);
  const subtotal = cartLines.reduce((sum, l) => sum + l.item.price * l.qty, 0);
  const fee = deliveryFee(subtotal, mode);

  const value = {
    items, status, retry: () => setRetryKey((k) => k + 1),
    lines, setQty, clearCart, cartLines, count, subtotal, fee, total: subtotal + fee,
    mode, setMode, notices, dismissNotices: () => setNotices([]),
    order, setOrder, demo, setDemo,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
