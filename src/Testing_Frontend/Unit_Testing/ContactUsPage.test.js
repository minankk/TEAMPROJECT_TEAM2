import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactUsPage from '../../ContactUsPage';

describe('ContactUsPage Form Validation', () => {
  test('displays required field validation on submit', async () => {
    render(<ContactUsPage />);

    // Try submitting the form without filling any fields
    fireEvent.click(screen.getByText(/send message/i));

    // These fields are required - browser-level validation
    expect(screen.getByLabelText(/name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toBeRequired();
    expect(screen.getByLabelText(/subject/i)).toBeRequired();
    expect(screen.getByLabelText(/message/i)).toBeRequired();
  });

  test('does not submit if required fields are empty', () => {
    const handleSubmit = jest.fn();
    render(<ContactUsPage onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByText(/send message/i));
    expect(handleSubmit).not.toHaveBeenCalled(); // If you had validation logic blocking it
  });
});
