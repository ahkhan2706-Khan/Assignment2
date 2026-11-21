import { Link, NavLink, Outlet } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { MIN_DELIVERY_ORDER, DELIVERY_FEE, FREE_DELIVERY_AT } from '../rules/orderRules.js';

export default function Layout() {
  const { count, total, notices, dismissNotices, demo, setDemo, items } = useStore();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <Link to="/" className="brand">Khan Foods</Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/checkout">Order ({count}) · Rs {total}</NavLink>
        </nav>
      </header>
      {/* Problem 2: charges and minimums are visible on every screen, not only at checkout */}
      <p className="strip">
        Delivery Rs {DELIVERY_FEE}, free from Rs {FREE_DELIVERY_AT}. Minimum delivery order Rs {MIN_DELIVERY_ORDER}. Collection from FAST gate 2 has no minimum.
      </p>
      <main id="main">
        {notices.length > 0 && (
          <div className="notice" role="alert">
            <strong>Your order was updated:</strong>
            <ul>{notices.map((n, i) => <li key={i}>{n}</li>)}</ul>
            <button className="btn secondary" onClick={dismissNotices}>Got it</button>
          </div>
        )}
        <Outlet />
      </main>
      <footer className="demo">
        <p>Simulated shop for coursework. No real orders or payments.</p>
        <fieldset>
          <legend>Demo controls</legend>
          <label>
            <input type="checkbox" checked={demo.fail} onChange={(e) => setDemo((d) => ({ ...d, fail: e.target.checked }))} />
            Simulate loading failure
          </label>
          <button
            className="btn secondary"
            onClick={() => setDemo((d) => ({ ...d, soldOut: d.soldOut.length ? [] : ['m1', 'm3'] }))}
            disabled={!items.length && !demo.soldOut.length}
          >
            {demo.soldOut.length ? 'Restore stock' : 'Sell out two burgers'}
          </button>
        </fieldset>
      </footer>
    </>
  );
}
