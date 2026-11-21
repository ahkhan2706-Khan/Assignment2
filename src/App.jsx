import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Menu from './pages/Menu.jsx';
import ItemDetails from './pages/ItemDetails.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Menu />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
