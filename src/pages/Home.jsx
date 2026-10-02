import { useState, useEffect, useCallback } from 'react';
import useDebounce from '../hooks/useDebounce.js';
import useProducts from '../hooks/useProducts.js';
import { fetchCategories } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Skeleton from '../components/Skeleton.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const LIMIT = 12;
const SORTS = {
  '': { label: 'Featured' },
  'price-asc': { label: 'Price: low to high', sortBy: 'price', order: 'asc' },
  'price-desc': { label: 'Price: high to low', sortBy: 'price', order: 'desc' },
  'rating-desc': { label: 'Top rated', sortBy: 'rating', order: 'desc' },
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const debounced = useDebounce(search, 300);
  const { dispatch } = useCart();

  useEffect(() => { fetchCategories().then(setCategories).catch(() => {}); }, []);
  useEffect(() => { setPage(1); }, [debounced, category, sort]);

  const { products, total, loading, error, retry } = useProducts({
    search: debounced, category, page, limit: LIMIT, ...SORTS[sort],
  });
  const add = useCallback((product) => dispatch({ type: 'ADD', product }), [dispatch]);
  const pages = Math.ceil(total / LIMIT);

  return (
    <section>
      <div className="toolbar">
        <input type="search" placeholder="Search products" aria-label="Search products"
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <select aria-label="Filter by category" value={category}
          onChange={(e) => { setCategory(e.target.value); setSearch(''); }}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}>
          {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      {loading && <Skeleton count={LIMIT} />}
      {error && <ErrorMessage message={error} onRetry={retry} />}
      {!loading && !error && products.length === 0 && <p className="msg">No products match your search. Try a different word or category.</p>}
      {!loading && !error && products.length > 0 && (
        <div className="grid">
          {products.map((p) => <ProductCard key={p.id} product={p} onAdd={add} />)}
        </div>
      )}

      {pages > 1 && (
        <nav className="pager" aria-label="Pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page === pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </nav>
      )}
    </section>
  );
}
