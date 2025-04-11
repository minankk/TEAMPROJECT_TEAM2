import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Overview } from '../../DashboardPage'; // Adjust the path if needed

// Mock fetch globally
beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

test('renders Overview with mocked API response', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      username: "JohnDoe",
      message: "Welcome back!",
      orderCount: 5,
      wishlistCount: 2,
      walletBalance: 99.99,
      isVIP: true,
      benefits: { tier: "Gold", discount: 0.15 }
    }),
  });

  render(<Overview />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/JohnDoe/)).toBeInTheDocument();
    expect(screen.getByText(/Orders:/i).nextSibling.textContent).toBe("5");
    expect(screen.getByText(/Gold/)).toBeInTheDocument();
    expect(screen.getByText(/15%/)).toBeInTheDocument();
  });
});
