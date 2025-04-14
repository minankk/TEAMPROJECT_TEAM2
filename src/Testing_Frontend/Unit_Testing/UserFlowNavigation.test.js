import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

// Polyfill for Node 16
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// ✅ Mock useAuth to break circular dependency
jest.mock('../../App', () => {
  const actualApp = jest.requireActual('../../App');
  return {
    __esModule: true,
    ...actualApp,
    useAuth: () => ({
      isLoggedIn: true,
      token: 'mock-token',
      login: jest.fn(),
      logout: jest.fn(),
    }),
  };
});

// ✅ Mock fetch responses
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/login')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mock-token' }),
      });
    }

    if (url.includes('/products')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              product_id: 1,
              album_name: 'Test Album',
              artist_name: 'Test Artist',
              genre_name: 'Rock',
              price: 19.99,
              cover_image_url: '/test.jpg',
            },
          ]),
      });
    }

    if (url.includes('/cart')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            cartItems: [
              {
                cart_id: 1,
                product_name: 'Test Album',
                price: 19.99,
                quantity: 1,
                cover_image_url: '/test.jpg',
              },
            ],
          }),
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('navigates from login to dashboard to payment page', async () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  // Log in
  fireEvent.change(screen.getByPlaceholderText(/username or email/i), {
    target: { value: 'testuser' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /log in/i }));

  // Wait for Browse Products (in navbar)
  await waitFor(() => {
    expect(screen.getByText(/browse products/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/browse products/i));

  await waitFor(() => {
    expect(screen.getByText(/browse the products/i)).toBeInTheDocument();
  });

  const addToCartButton = await screen.findByRole('button', {
    name: /add to cart/i,
  });
  fireEvent.click(addToCartButton);

  fireEvent.click(screen.getByRole('link', { name: /cart/i }));

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /checkout/i }));

  await waitFor(() => {
    expect(screen.getByText(/secure payment/i)).toBeInTheDocument();
  });
});
