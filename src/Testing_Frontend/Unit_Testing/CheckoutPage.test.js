import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '../../pages/CheckoutPage';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: 'Order confirmed' }),
      status: 200,
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('submits order successfully', async () => {
  render(<CheckoutPage />);

  fireEvent.change(screen.getByPlaceholderText(/name/i), {
    target: { value: 'John Doe' },
  });

  fireEvent.change(screen.getByPlaceholderText(/address/i), {
    target: { value: '123 Street' },
  });

  fireEvent.click(screen.getByRole('button', { name: /place order/i }));

  await waitFor(() => {
    expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
  });
});
