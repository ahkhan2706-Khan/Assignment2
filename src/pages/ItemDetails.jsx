import { Link, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import QtyControl from '../components/QtyControl.jsx';

export default function ItemDetails() {
  const { id } = useParams();
  const { items, status, retry, lines, setQty } = useStore();
  if (status === 'loading') return <p role="status">Loading…</p>;
  if (status === 'error') return <div className="notice" role="alert"><p>Could not load this item.</p><button className="btn" onClick={retry}>Retry</button></div>;
  const item = items.find((i) => i.id === id);
  if (!item) return (
    <div className="empty">
      <h1>We couldn't find "{id}"</h1>
      <p>This item may have been removed or the link is wrong.</p>
      <Link className="btn" to="/">Back to the menu</Link>
    </div>
  );
  return (
    <article>
      <Link to="/">← Back to menu</Link>
      <h1>{item.name}</h1>
      <p className="price">Rs {item.price}</p>
      <p>{item.desc}</p>
      <dl>
        <dt>Diet</dt><dd>{item.veg ? 'Vegetarian' : 'Contains meat'}</dd>
        <dt>Spice level</dt><dd>{item.spicy} of 3</dd>
        <dt>Calories</dt><dd>{item.kcal} kcal</dd>
        <dt>Ready in</dt><dd>{item.prep} minutes</dd>
        <dt>Availability</dt><dd>{item.stock === 0 ? 'Sold out today' : `${item.stock} left today`}</dd>
        <dt>Fulfilment</dt><dd>{item.collectionOnly ? 'Collection only (frozen item)' : 'Delivery or collection'}</dd>
      </dl>
      <QtyControl item={item} qty={lines[item.id] || 0} onChange={(n) => setQty(item.id, n)} />
    </article>
  );
}
