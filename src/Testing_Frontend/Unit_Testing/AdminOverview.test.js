import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AdminOverview } from '../../AdminDashboardPage';

describe('AdminOverview', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mock-token');

    global.fetch = jest.fn((url) => {
      if (url.includes('/dashboard')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ users: 12, products: 34, sales: 560 }),
        });
      } else if (url.includes('sales')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ period: 'March', sales: 200 }]),
        });
      } else if (url.includes('user-activity')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ newSignups: [], activeUsers: [] }),
        });
      } else if (url.includes('products')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ mostSoldItems: [] }),
        });
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders dashboard data correctly', async () => {
    render(<AdminOverview />);

    await waitFor(() => {
      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('March: £200')).toBeInTheDocument();
    });
  });
});
