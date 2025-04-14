import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartPage from '../../pages/CartPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Optional: mock fetch if your CartPage fetches cart data
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            product_id: 1,
            album_name: 'Cart Album',
            quantity: 2,
            price: 25.0,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('navigates to CheckoutPage from CartPage', async () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<div>Checkout Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for data to load (if applicable)
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
  });

  const checkoutButton = screen.getByRole('button', { name: /checkout/i });
  fireEvent.click(checkoutButton);

  expect(screen.getByText(/checkout page/i)).toBeInTheDocument();
});
