// Polyfill must be absolutely first
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// CommonJS imports
const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const App = require('../../App.js');


// Global mock for fetch
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/login')) {
      return Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            token: 'fake-jwt-token',
            role: 'user',
            message: 'Login successful',
          }),
      });
    }

    if (url.includes('/products')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              product_id: 1,
              album_name: 'Test Album',
              artist_name: 'Artist',
              genre_name: 'Rock',
              price: 20.99,
              cover_image_url: '/test.jpg',
            },
          ]),
      });
    }

    if (url.includes('/cart')) {
      return Promise.resolve({
        json: () => Promise.resolve([{ product_id: 1, quantity: 1 }]),
      });
    }

    if (url.includes('/checkout')) {
      return Promise.resolve({
        json: () => Promise.resolve({ message: 'Order Confirmed' }),
      });
    }

    return Promise.resolve({ json: () => Promise.resolve({}) });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('user can login, browse, add to cart and checkout', async () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  // Login
  fireEvent.change(screen.getByPlaceholderText(/username or email/i), {
    target: { value: 'user@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));

  // Wait for redirect to products
  await waitFor(() => {
    expect(screen.getByText(/browse products/i)).toBeInTheDocument();
  });

  // Add to cart
  const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
  fireEvent.click(addToCartBtn);

  // Go to Cart
  const cartLink = screen.getByRole('link', { name: /cart/i });
  fireEvent.click(cartLink);

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
  });

  // Go to Checkout
  fireEvent.click(screen.getByRole('button', { name: /checkout/i }));

  fireEvent.change(screen.getByPlaceholderText(/full name/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByPlaceholderText(/shipping address/i), {
    target: { value: '123 Street' },
  });

  fireEvent.click(screen.getByRole('button', { name: /pay now/i }));

  // Confirmation
  await waitFor(() => {
    expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
  });
});
