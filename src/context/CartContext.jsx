import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { cartReducer, initialState } from './cartReducer.js';

const CartContext = createContext(null);
const KEY = 'storefront-cart';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || initialState; }
  catch { return initialState; }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
  }, [state]);

  const value = useMemo(() => ({
    items: state.items,
    dispatch,
    count: state.items.reduce((n, i) => n + i.qty, 0),
    total: state.items.reduce((n, i) => n + i.qty * i.price, 0),
  }), [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
