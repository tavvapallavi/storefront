import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));

export default function App() {
  const { count } = useCart();
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">Shelf</Link>
        <Link to="/cart" aria-label={`Cart, ${count} items`} className="cart-link">
          Cart <span className="badge">{count}</span>
        </Link>
      </header>
      <main>
        <Suspense fallback={<p className="msg">Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<p className="msg">Page not found. <Link to="/">Back to products</Link></p>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
