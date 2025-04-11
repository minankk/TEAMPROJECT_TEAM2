import React from 'react'; // <-- this was also missing
import { act } from 'react'; // ✅ correct import
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductsPage from '../../ProductsPage';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // mock empty product list
    })
  );
});

test('renders banner heading', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    );
  });

  expect(screen.getByText(/browse the products/i)).toBeInTheDocument();
});
