import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactUs from "../../src/pages/ContactUs"; // adjust import to your structure
import '@testing-library/jest-dom/extend-expect';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Success" }),
  })
);

describe("ContactUs Page", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders all form fields", () => {
    render(<ContactUs />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("updates form fields on input", () => {
    render(<ContactUs />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Test Subject" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Hello there!" } });

    expect(screen.getByLabelText(/name/i).value).toBe("Alice");
    expect(screen.getByLabelText(/email/i).value).toBe("alice@example.com");
    expect(screen.getByLabelText(/subject/i).value).toBe("Test Subject");
    expect(screen.getByLabelText(/message/i).value).toBe("Hello there!");
  });

  it("submits form and shows success popup", async () => {
    render(<ContactUs />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Bob" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "bob@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Hello" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "This is a test." } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    );
  });

  it("alerts on failed submission", async () => {
    // Override fetch to fail
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    window.alert = jest.fn(); // mock alert

    render(<ContactUs />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Fail" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "fail@example.com" } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: "Oops" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Fail test" } });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Failed to send message. Please try again.")
    );
  });
});
