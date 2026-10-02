import { memo } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating.jsx';

function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <h3>{product.title}</h3>
      </Link>
      <Rating value={product.rating} />
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => onAdd(product)} aria-label={`Add ${product.title} to cart`}>Add to cart</button>
    </article>
  );
}
export default memo(ProductCard);
