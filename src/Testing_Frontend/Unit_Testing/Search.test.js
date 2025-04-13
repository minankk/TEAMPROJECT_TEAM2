import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchResults from '../../SearchResults';

// Mock fetch to simulate search result
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          products: [
            {
              product_id: 1,
              album_name: 'Test Album',
              artist_name: 'Test Artist',
              genre_name: 'Rock',
              price: 20.0,
              cover_image_url: '/test-image.jpg',
            },
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('displays search results based on query', async () => {
  render(
    <MemoryRouter initialEntries={['/search?query=album']}>
      <Routes>
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Search Results for "album"/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText(/Test Artist/i)).toBeInTheDocument();
  });
});
