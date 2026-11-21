import { maxQtyFor, MAX_PER_ITEM } from '../rules/orderRules.js';

// Quantity stepper. The limit is shown beside the control (Rule 1).
export default function QtyControl({ item, qty, onChange }) {
  const max = maxQtyFor(item);
  if (max === 0) return <p className="badge out">Sold out</p>;
  return (
    <div className="qty">
      {qty === 0 ? (
        <button className="btn" onClick={() => onChange(1)}>Add to order</button>
      ) : (
        <div className="stepper" role="group" aria-label={`Quantity of ${item.name}`}>
          <button className="btn secondary" aria-label={`Remove one ${item.name}`} onClick={() => onChange(qty - 1)}>−</button>
          <output aria-live="polite">{qty}</output>
          <button className="btn secondary" aria-label={`Add one ${item.name}`} disabled={qty >= max} onClick={() => onChange(qty + 1)}>+</button>
        </div>
      )}
      <small>
        {qty >= max && qty > 0 ? `Limit reached: ${max} max. ` : ''}
        Up to {MAX_PER_ITEM} per order{item.stock < MAX_PER_ITEM ? `, only ${item.stock} left` : ''}.
      </small>
    </div>
  );
}
