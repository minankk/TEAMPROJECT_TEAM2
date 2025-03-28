import React from "react";
import "./TermsandConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to our Terms and Conditions page. By using our website, you agree to comply with and be bound by the following terms and conditions.
        Please read them carefully before using our services.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using our website, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.
      </p>

      <h2>2. Use of the Website</h2>
      <ul>
        <li>2.1: You agree not to use this website for any unlawful or prohibited activities.</li>
        <li>2.2: You must be at least 18 years old or have parental consent to use our services.</li>
        <li>2.3: Unauthorized use of this website may result in legal action.</li>
      </ul>

      <h2>3. Account and Security</h2>
      <ul>
        <li>3.1: You are responsible for maintaining the confidentiality of your account and password.</li>
        <li>3.2: Any suspicious activity should be reported to us immediately.</li>
        <li>3.3: We reserve the right to terminate accounts found violating our terms.</li>
      </ul>

      <h2>4. Orders and Payments</h2>
      <ul>
        <li>4.1: All orders are subject to availability and confirmation of payment.</li>
        <li>4.2: We reserve the right to cancel any order due to pricing errors or suspected fraud.</li>
        <li>4.3: Prices are subject to change without notice.</li>
      </ul>

      <h2>5. Shipping and Delivery</h2>
      <ul>
        <li>5.1: Shipping times may vary depending on the destination location.</li>
        <li>5.2: We are not responsible for delays caused by external factors such as customs or couriers.</li>
        <li>5.3: Any incorrect shipping information provided by the user may result in delays or order cancellations.</li>
      </ul>

      <h2>6. Returns and Refunds</h2>
      <ul>
        <li>6.1: Returns are accepted within 14 days of receiving the product.</li>
        <li>6.2: Items must be in their original condition and packaging.</li>
        <li>6.3: Refunds will be processed within 7-10 business days after the returned item is received.</li>
      </ul>
    </div>
  );
};

export default TermsAndConditions;
