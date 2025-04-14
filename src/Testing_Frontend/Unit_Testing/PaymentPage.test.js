// PaymentPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaymentPage from '../../PaymentPage';

// Mocks
const cartItems = [{ product_id: 1, name: 'Test Vinyl', price: 10, quantity: 2 }];
const totalAmount = 20;
const mockNavigate = jest.fn();

// Default mock for router
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: () => ({ state: { cartItems, totalAmount } }),
    useNavigate: () => mockNavigate,
  };
});

describe('PaymentPage', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders payment form and summary', () => {
    render(<PaymentPage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Secure Payment/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: £20.00/i)).toBeInTheDocument();
  });

  test('submits payment and navigates on success', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ orderId: '123456', tracking_number: 'TRACK123' }),
    });

    render(<PaymentPage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/1234 5678/i), { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(screen.getByPlaceholderText(/MM\/YY/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByPlaceholderText('123'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/123 Main Street/i), { target: { value: '1 Test Way' } });

    fireEvent.click(screen.getByText(/Pay Now/i));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/order-success', {
        state: { trackingNumber: 'TRACK123' },
      });
    });
  });
});
