import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../../src/pages/LoginPage"; // Adjust path
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

// Mock useNavigate and useAuth
const mockNavigate = jest.fn();
const mockLogin = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../src/pages/App", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

// Mock global fetch
global.fetch = jest.fn();

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LoginPage", () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
    mockLogin.mockClear();
  });

  it("renders login form by default", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText("Login to your Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/username or email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("switches to signup form when toggle clicked", () => {
    renderWithRouter(<LoginPage />);
    fireEvent.click(screen.getByText(/don't have an account\? sign up/i));
    expect(screen.getByText("Create an Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it("shows error if login fields are empty", async () => {
    renderWithRouter(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(await screen.findByText(/both fields are required for login/i)).toBeInTheDocument();
  });

  it("submits login form and navigates on success", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ token: "test-token" }),
    });

    renderWithRouter(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/username or email/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpass" } });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
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
