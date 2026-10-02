import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import Rating from '../components/Rating.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(0);

  useEffect(() => {
    let ignore = false;
    setProduct(null); setError(null); setImg(0);
    fetchProduct(id).then((p) => !ignore && setProduct(p)).catch((e) => !ignore && setError(e.message));
    return () => { ignore = true; };
  }, [id]);

  if (error) return <ErrorMessage message={error} />;
  if (!product) return <p className="msg">Loading…</p>;

  const discounted = product.price * (1 - product.discountPercentage / 100);
  return (
    <section className="detail">
      <Link to="/">← All products</Link>
      <div className="detail-body">
        <div>
          <img className="hero" src={product.images[img] || product.thumbnail} alt={product.title} />
          <div className="thumbs">
            {product.images.map((src, i) => (
              <button key={src} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} aria-pressed={i === img}>
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1>{product.title}</h1>
          <Rating value={product.rating} />
          <p className="price">${discounted.toFixed(2)} <s>${product.price.toFixed(2)}</s> <small>{Math.round(product.discountPercentage)}% off</small></p>
          <p>{product.description}</p>
          <p className={product.stock > 0 ? 'in-stock' : 'out-stock'}>
            {product.stock > 0 ? `In stock (${product.stock} left)` : 'Out of stock'}
          </p>
          <button disabled={product.stock === 0}
            onClick={() => dispatch({ type: 'ADD', product: { ...product, price: +discounted.toFixed(2) } })}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
