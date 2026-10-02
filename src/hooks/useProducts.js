import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/api.js';

export default function useProducts(params) {
  const [state, setState] = useState({ products: [], total: 0, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify(params);

  useEffect(() => {
    let ignore = false; // avoids race conditions when params change quickly
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchProducts(params)
      .then((d) => !ignore && setState({ products: d.products, total: d.total, loading: false, error: null }))
      .catch((e) => !ignore && setState({ products: [], total: 0, loading: false, error: e.message }));
    return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);
  return { ...state, retry };
}
