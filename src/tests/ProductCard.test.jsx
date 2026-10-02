import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

const product = { id: 1, title: 'Desk Lamp', price: 24.5, rating: 4.2, thumbnail: 'lamp.png' };

describe('ProductCard', () => {
  it('shows title and price, and calls onAdd when the button is clicked', async () => {
    const onAdd = vi.fn();
    render(<MemoryRouter><ProductCard product={product} onAdd={onAdd} /></MemoryRouter>);
    expect(screen.getByText('Desk Lamp')).toBeInTheDocument();
    expect(screen.getByText('$24.50')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /add desk lamp to cart/i }));
    expect(onAdd).toHaveBeenCalledWith(product);
  });
});
