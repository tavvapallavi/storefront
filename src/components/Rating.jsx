export default function Rating({ value = 0 }) {
  const full = Math.round(value);
  return (
    <span className="rating" role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}
