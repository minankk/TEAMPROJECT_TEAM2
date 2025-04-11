import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../../LoginPage";
import { BrowserRouter } from "react-router-dom";

// ✅ Minimal mock of useAuth to prevent crash
jest.mock("../../App", () => ({
  useAuth: () => ({ login: jest.fn() }),
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LoginPage Form Validation", () => {
  it("shows error if login fields are empty", async () => {
    renderWithRouter(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
  
    // Use case-insensitive RegExp
    const errorElement = await screen.findByText(/both fields are required/i);
    expect(errorElement).toBeInTheDocument();
  });
  
  
  
  it("shows error if passwords don't match in signup", async () => {
    renderWithRouter(<LoginPage />);
    fireEvent.click(screen.getByText(/don't have an account\? sign up/i));

    fireEvent.change(screen.getByLabelText(/user name/i), { target: { value: "newuser" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "pass123" } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: "pass321" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });
});
