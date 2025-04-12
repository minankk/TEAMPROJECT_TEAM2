import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import AdminDashboardPage from '../../AdminDashboardPage';

describe('AdminDashboardPage', () => {
  test('renders sidebar and outlet correctly', () => {
    render(
      <MemoryRouter initialEntries={['/admin/overview']}>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboardPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Products Management/i })).toBeInTheDocument();
  });
});
