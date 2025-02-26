import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>1.1: We collect personal details such as name, email, and address when you create an account.</li>
        <li>1.2: Payment information is securely processed through third-party payment gateways.</li>
        <li>1.3: We collect browsing data for analytics and service improvement.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>2.1: To process and fulfill your orders.</li>
        <li>2.2: To provide customer support and service updates.</li>
        <li>2.3: To improve user experience through personalized recommendations.</li>
      </ul>

      <h2>3. Data Security</h2>
      <ul>
        <li>3.1: We implement security measures to protect your data from unauthorized access.</li>
        <li>3.2: Your payment details are encrypted and not stored on our servers.</li>
        <li>3.3: We do not share your personal information with third parties without your consent.</li>
      </ul>

      <h2>4. Your Rights</h2>
      <ul>
        <li>4.1: You have the right to access, modify, or delete your personal data.</li>
        <li>4.2: You can opt out of marketing emails at any time.</li>
        <li>4.3: To request data removal, contact our support team.</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
