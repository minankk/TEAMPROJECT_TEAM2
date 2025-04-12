import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ProductsPage from '../../ProductsPage';
 
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/wishlist')) {
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    }
 
    if (url.includes('/products')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              product_id: 1,
              album_name: 'Test Album',
              artist_name: 'Test Artist',
              genre_name: 'Rock',
              cover_image_url: '/test.jpg',
              price: '£20.00',
            },
          ]),
      });
    }
 
    return Promise.resolve({ json: () => Promise.resolve([]) });
  });
});
 
afterEach(() => {
  jest.clearAllMocks();
});
 
test('updates artist filter on change', async () => {
  render(
    <BrowserRouter>
      <ProductsPage />
    </BrowserRouter>
  );
 
  const filterBtn = screen.getByRole('button', { name: /filters/i });
  fireEvent.click(filterBtn);
 
  const [artistSelect] = await screen.findAllByRole('combobox');
 
  // Wait for artist options to populate
  await waitFor(() =>
    expect(screen.getByRole('option', { name: 'Test Artist' })).toBeInTheDocument()
  );
 
  // Simulate user selecting Test Artist
  await userEvent.selectOptions(artistSelect, 'Test Artist');
 
  expect(artistSelect.value).toBe('Test Artist');
});
 