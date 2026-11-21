import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Confirmation() {
  const { order } = useStore();
  if (!order) return <div className="empty"><h1>No recent order</h1><Link className="btn" to="/">Browse the menu</Link></div>;
  return (
    <section>
      <h1 className="success">Order placed (simulated)</h1>
      <p>Reference <strong>{order.id}</strong> for {order.name}. Nothing was charged and no real order was sent.</p>
      <p>{order.mode === 'delivery' ? `Delivery to ${order.area}` : 'Collection at FAST gate 2'}, slot {order.slot}.</p>
      <ul>{order.lines.map((l) => <li key={l.id}>{l.name} × {l.qty}: Rs {l.price * l.qty}</li>)}</ul>
      <p>Subtotal Rs {order.subtotal} · Delivery Rs {order.fee} · <strong>Total Rs {order.total}</strong></p>
      <Link className="btn" to="/">Order something else</Link>
    </section>
  );
}
