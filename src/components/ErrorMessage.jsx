export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="msg" role="alert">
      <p>Couldn't load products: {message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
