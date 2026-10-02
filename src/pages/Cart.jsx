import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, dispatch, total } = useCart();
  if (items.length === 0) return <p className="msg">Your cart is empty. <Link to="/">Browse products</Link></p>;

  return (
    <section className="cart">
      <h1>Your cart</h1>
      {items.map((i) => (
        <div className="cart-row" key={i.id}>
          <img src={i.thumbnail} alt="" />
          <div className="grow"><strong>{i.title}</strong><p>${i.price.toFixed(2)}</p></div>
          <div className="qty">
            <button aria-label={`Decrease quantity of ${i.title}`} onClick={() => dispatch({ type: 'SET_QTY', id: i.id, qty: i.qty - 1 })}>−</button>
            <span aria-live="polite">{i.qty}</span>
            <button aria-label={`Increase quantity of ${i.title}`} onClick={() => dispatch({ type: 'SET_QTY', id: i.id, qty: i.qty + 1 })}>+</button>
          </div>
          <button className="link" onClick={() => dispatch({ type: 'REMOVE', id: i.id })}>Remove</button>
        </div>
      ))}
      <div className="summary">
        <p>Total: <strong>${total.toFixed(2)}</strong></p>
        <button className="link" onClick={() => dispatch({ type: 'CLEAR' })}>Clear cart</button>
      </div>
    </section>
  );
}
