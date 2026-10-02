import { cartReducer, initialState } from '../context/cartReducer.js';

const product = { id: 1, title: 'Lamp', price: 10, thumbnail: 'x.png' };

describe('cartReducer', () => {
  it('adds a new product with qty 1', () => {
    const s = cartReducer(initialState, { type: 'ADD', product });
    expect(s.items).toEqual([{ ...product, qty: 1 }]);
  });
  it('increments qty when the product already exists', () => {
    let s = cartReducer(initialState, { type: 'ADD', product });
    s = cartReducer(s, { type: 'ADD', product });
    expect(s.items[0].qty).toBe(2);
  });
  it('removes an item when qty drops to 0', () => {
    let s = cartReducer(initialState, { type: 'ADD', product });
    s = cartReducer(s, { type: 'SET_QTY', id: 1, qty: 0 });
    expect(s.items).toHaveLength(0);
  });
  it('clears the cart', () => {
    let s = cartReducer(initialState, { type: 'ADD', product });
    expect(cartReducer(s, { type: 'CLEAR' }).items).toHaveLength(0);
  });
});
