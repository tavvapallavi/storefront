export const initialState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const p = action.product;
      const exists = state.items.find((i) => i.id === p.id);
      const items = exists
        ? state.items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.items, { id: p.id, title: p.title, price: p.price, thumbnail: p.thumbnail, qty: 1 }];
      return { items };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) };
    case 'SET_QTY':
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
          .filter((i) => i.qty > 0),
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}
