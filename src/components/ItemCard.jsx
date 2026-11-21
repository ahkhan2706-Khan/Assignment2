import { Link } from 'react-router-dom';
import QtyControl from './QtyControl.jsx';

export default function ItemCard({ item, qty, onChange }) {
  return (
    <li className={`card${qty ? ' selected' : ''}`}>
      <h3><Link to={`/items/${item.id}`}>{item.name}</Link></h3>
      <p className="price">Rs {item.price}</p>
      <p className="meta">
        {item.veg ? 'Vegetarian' : 'Non-veg'} · Spice {item.spicy}/3 · {item.kcal} kcal · {item.prep} min
      </p>
      {/* Conditions shown in the listing so people can compare before opening details */}
      {item.collectionOnly && <p className="badge">Collection only</p>}
      {item.stock > 0 && item.stock <= 5 && <p className="badge warn">Only {item.stock} left</p>}
      {qty > 0 && <p className="badge ok">In your order: {qty}</p>}
      <QtyControl item={item} qty={qty} onChange={onChange} />
    </li>
  );
}
