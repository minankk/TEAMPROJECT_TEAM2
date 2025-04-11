import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import "./AdminApprovalPage.css";

const AdminApprovalPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const handleApproval = async (action) => {
    try {
      const response = await fetch(`http://localhost:5001/admin-approval?email=${email}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatusMessage(data.message);
        setError("");
      } else {
        setError(data.message || "An error occurred.");
        setStatusMessage("");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      setStatusMessage("");
    }
  };

  return (
    <div id="admin-approve-page">
      <div className="form-container">
        <h1>Approve Admin Signup</h1>
        <p className="email-display"><strong>Email:</strong> {email}</p>

        {statusMessage && <p className="status-message">{statusMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="button-group">
          <button onClick={() => handleApproval("approve")}>Approve</button>
          <button onClick={() => handleApproval("reject")}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default AdminApprovalPage;
