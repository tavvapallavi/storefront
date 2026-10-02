const BASE = 'https://dummyjson.com';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

// Builds the right endpoint for search / category / plain listing, with sort + pagination.
export function fetchProducts({ search = '', category = '', sortBy = '', order = 'asc', page = 1, limit = 12 }) {
  const skip = (page - 1) * limit;
  const sort = sortBy ? `&sortBy=${sortBy}&order=${order}` : '';
  const paging = `limit=${limit}&skip=${skip}${sort}`;
  if (search) return get(`/products/search?q=${encodeURIComponent(search)}&${paging}`);
  if (category) return get(`/products/category/${category}?${paging}`);
  return get(`/products?${paging}`);
}
export const fetchProduct = (id) => get(`/products/${id}`);
export const fetchCategories = () => get('/products/categories');
