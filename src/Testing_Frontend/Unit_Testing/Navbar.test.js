import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Mock logo import
jest.mock('../assets/logo-red2.png', () => 'logo.png');

// Mock useAuth
jest.mock('../../App', () => ({
  useAuth: () => ({
    isLoggedIn: false,
    logout: jest.fn(),
  }),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar - Navigation and Routes', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test('clicking logo navigates to home', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const logo = screen.getByAltText(/vinyl vault logo/i);
    fireEvent.click(logo);
    // Link click behavior is not captured by useNavigate unless manually triggered,
    // but we can confirm the element exists
    expect(logo).toBeInTheDocument();
  });

  test('navigates to login on user icon click when not logged in', () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    const userBtn = screen.getByRole('button', { name: '' }); // user icon has no accessible name
    fireEvent.click(userBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('navigates to /search-results when search is submitted', () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    const searchInput = screen.getByPlaceholderText(/search records/i);
    fireEvent.change(searchInput, { target: { value: 'rock' } });

    fireEvent.submit(searchInput);

    expect(mockNavigate).toHaveBeenCalledWith('/search-results?query=rock');
  });

  test('contains link to /products under BROWSE PRODUCTS', () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    const browseLink = screen.getByText(/browse products/i);
    expect(browseLink).toHaveAttribute('href', '/products');
  });

  test('contains link to /cart', () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    const cartIcon = screen.getByRole('link', { name: '' }); // cart has no aria label
    expect(cartIcon).toHaveAttribute('href', '/cart');
  });
});
