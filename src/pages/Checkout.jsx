import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import QtyControl from '../components/QtyControl.jsx';
import { AREAS, fulfilmentProblems } from '../rules/orderRules.js';

const SLOTS = ['12:30–1:00', '1:00–1:30', '1:30–2:00', '6:00–6:30'];

// Pure validator: one specific message per field.
function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your name (at least 2 characters).';
  if (!/^03\d{2}-?\d{7}$/.test(f.phone.trim())) e.phone = 'Enter a mobile number like 0300-1234567.';
  if (f.mode === 'delivery' && !f.area) e.area = 'Choose where we should deliver.';
  if (!f.slot) e.slot = 'Pick a time slot.';
  if (f.notes.length > 120) e.notes = `Notes are ${f.notes.length}/120 characters. Please shorten them.`;
  return e;
}

export default function Checkout() {
  const nav = useNavigate();
  const { cartLines, setQty, subtotal, fee, total, mode, setMode, setOrder, clearCart, status } = useStore();
  const [form, setForm] = useState({ name: '', phone: '', area: '', slot: '', notes: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const f = { ...form, mode };
  const errors = validate(f);
  const problems = fulfilmentProblems({ lines: cartLines, mode, area: form.area, subtotal });
  const show = (k) => (touched[k] || submitted) && errors[k];
  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value })); // valid input is never cleared
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  if (status === 'loading') return <p role="status">Loading…</p>;
  if (cartLines.length === 0) return <div className="empty"><h1>Your order is empty</h1><Link className="btn" to="/">Pick something from the menu</Link></div>;

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length || problems.length) return;
    setOrder({
      id: 'PP-' + Date.now().toString().slice(-6), name: form.name.trim(), mode, area: form.area, slot: form.slot,
      lines: cartLines.map((l) => ({ id: l.item.id, name: l.item.name, price: l.item.price, qty: l.qty })),
      subtotal, fee, total,
    });
    clearCart();
    nav('/confirmation');
  };

  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={form[name]} onChange={onChange} onBlur={onBlur}
        aria-invalid={!!show(name)} aria-describedby={show(name) ? `${name}-err` : undefined} {...props} />
      {show(name) && <p id={`${name}-err`} className="error">Error: {errors[name]}</p>}
    </div>
  );

  return (
    <>
      <h1>Review your order</h1>
      <ul className="lines">
        {cartLines.map(({ item, qty }) => (
          <li key={item.id}>
            <span>{item.name} · Rs {item.price} each{item.collectionOnly ? ' (collection only)' : ''}</span>
            <QtyControl item={item} qty={qty} onChange={(n) => setQty(item.id, n)} />
          </li>
        ))}
      </ul>
      <dl className="summary">
        <dt>Subtotal</dt><dd>Rs {subtotal}</dd>
        <dt>Delivery fee</dt><dd>Rs {fee}</dd>
        <dt>Total</dt><dd><strong>Rs {total}</strong></dd>
      </dl>

      <form onSubmit={submit} noValidate>
        <fieldset>
          <legend>How do you want it?</legend>
          <label><input type="radio" name="mode" checked={mode === 'delivery'} onChange={() => setMode('delivery')} /> Delivery</label>
          <label><input type="radio" name="mode" checked={mode === 'collection'} onChange={() => setMode('collection')} /> Collection (FAST gate 2)</label>
        </fieldset>
        {field('name', 'Name', { autoComplete: 'name' })}
        {field('phone', 'Mobile number', { inputMode: 'tel', placeholder: '0300-1234567' })}
        {mode === 'delivery' && (
          <div className="field">
            <label htmlFor="area">Delivery area</label>
            <select id="area" name="area" value={form.area} onChange={onChange} onBlur={onBlur} aria-invalid={!!show('area')}>
              <option value="">Select…</option>
              {AREAS.map((a) => <option key={a}>{a}</option>)}
            </select>
            {show('area') && <p className="error">Error: {errors.area}</p>}
          </div>
        )}
        <div className="field">
          <label htmlFor="slot">Time slot</label>
          <select id="slot" name="slot" value={form.slot} onChange={onChange} onBlur={onBlur} aria-invalid={!!show('slot')}>
            <option value="">Select…</option>
            {SLOTS.map((s) => <option key={s}>{s}</option>)}
          </select>
          {show('slot') && <p className="error">Error: {errors.slot}</p>}
        </div>
        {field('notes', 'Notes (optional, max 120 characters)')}

        {problems.length > 0 && (
          <div className="notice" role="alert"><strong>Can't place this order yet:</strong>
            <ul>{problems.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        )}
        <button className="btn" type="submit">Place order (simulated)</button>
      </form>
    </>
  );
}
