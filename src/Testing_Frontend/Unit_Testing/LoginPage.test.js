import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../LoginPage';

// Mock useAuth
jest.mock('../../App', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ token: 'fakeToken' }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('LoginPage Validation', () => {
  test('shows error when login fields are empty', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Submit the form with empty fields
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Wait for error message from validation logic
    await waitFor(() => {
      expect(screen.getByText(/both fields are required/i)).toBeInTheDocument();
    });

    // Ensure fetch was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('shows error if password is missing', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username or email/i), {
      target: { value: 'user@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/both fields are required/i)).toBeInTheDocument();
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
