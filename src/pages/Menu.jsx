import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import ItemCard from '../components/ItemCard.jsx';
import { CATEGORIES } from '../data/items.js';

export default function Menu() {
  const { items, status, retry, lines, setQty, count, subtotal } = useStore();
  // Filters live in the URL, so Back/refresh/links keep them (Problem 1).
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const cat = params.get('cat') || 'All';
  const sort = params.get('sort') || 'name';
  const veg = params.get('veg') === '1';
  const update = (key, value) => setParams((p) => {
    const n = new URLSearchParams(p);
    if (value && value !== 'All' && value !== 'name') n.set(key, value); else n.delete(key);
    return n;
  }, { replace: true });

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = items.filter((i) =>
      (cat === 'All' || i.category === cat) &&
      (!veg || i.veg) &&
      (!term || `${i.name} ${i.desc}`.toLowerCase().includes(term)));
    return [...list].sort((a, b) =>
      sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : a.name.localeCompare(b.name));
  }, [items, q, cat, sort, veg]);

  // Selected items hidden by the current filters are reported, not lost.
  const hidden = items.filter((i) => lines[i.id] && !shown.includes(i));

  if (status === 'loading') return <p role="status">Loading today's menu…</p>;
  if (status === 'error') return (
    <div className="notice" role="alert">
      <p>We couldn't load the menu. Check your connection and try again.</p>
      <button className="btn" onClick={retry}>Retry</button>
    </div>
  );
  if (items.length === 0) return <p>No meals are listed today. Please check back tomorrow.</p>;

  return (
    <>
      <h1>Today's menu</h1>
      <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
        <label>Search
          <input type="search" value={q} onChange={(e) => update('q', e.target.value)} placeholder="karahi, daal…" />
        </label>
        <label>Category
          <select value={cat} onChange={(e) => update('cat', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Sort by
          <select value={sort} onChange={(e) => update('sort', e.target.value)}>
            <option value="name">Name</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <label className="check">
          <input type="checkbox" checked={veg} onChange={(e) => update('veg', e.target.checked ? '1' : '')} /> Vegetarian only
        </label>
      </form>

      <p aria-live="polite">{shown.length} of {items.length} items shown.</p>
      {hidden.length > 0 && (
        <p className="badge ok">
          {hidden.length} selected item{hidden.length > 1 ? 's are' : ' is'} hidden by filters: {hidden.map((i) => `${i.name} ×${lines[i.id]}`).join(', ')}. They are still in your order.
        </p>
      )}

      {shown.length === 0 ? (
        <div className="empty">
          <p>No items match "{q}"{cat !== 'All' ? ` in ${cat}` : ''}{veg ? ' (vegetarian)' : ''}.</p>
          <button className="btn" onClick={() => setParams({}, { replace: true })}>Clear all filters</button>
        </div>
      ) : (
        <ul className="grid">
          {shown.map((i) => <ItemCard key={i.id} item={i} qty={lines[i.id] || 0} onChange={(n) => setQty(i.id, n)} />)}
        </ul>
      )}

      {count > 0 && (
        <div className="bar">
          <span>{count} item{count > 1 ? 's' : ''} · Rs {subtotal}</span>
          <Link className="btn" to="/checkout">Review and order</Link>
        </div>
      )}
    </>
  );
}
