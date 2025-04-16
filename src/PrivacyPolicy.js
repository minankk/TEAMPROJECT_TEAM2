import React from "react";
import "./PrivacyPolicy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="policy-container">
        <h1>Privacy Policy</h1>
        <p>
          At Vinyl Vault, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you interact with our website and services.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect different types of information to provide and improve our services:</p>
          <ul>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Account Information:</strong> When you create an account, we collect personal details such as your name, email address, shipping and billing addresses, phone number, and password.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Payment Information:</strong> Payment details, including credit card numbers or other payment method information, are securely processed by our trusted third-party payment processors. We do not store your full payment card details on our servers.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Order Information:</strong> Details about the products you purchase, order history, and delivery information are collected to fulfill your orders and provide customer support.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Browsing Data:</strong> We automatically collect certain information about your device and browsing activity on our website, including your IP address, browser type, operating system, referring URLs, pages visited, and browsing patterns. This data helps us analyze trends, administer the site, and improve our services.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Communication Data:</strong> If you contact us for support or inquiries, we may collect and retain your communication and contact details.</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information for various purposes, including:</p>
          <ul>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Order Fulfillment:</strong> To process your orders, arrange shipping, and manage your purchases.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Customer Support:</strong> To provide assistance, respond to inquiries, and resolve any issues you may have.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Account Management:</strong> To manage your user account, including password resets and account updates.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Service Improvement:</strong> To analyze website usage, personalize your experience, and improve our website, products, and services.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Marketing Communications:</strong> With your consent, we may send you promotional emails about new products, special offers, and updates. You can opt out of these communications at any time.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>We take the security of your personal information seriously and implement reasonable measures to protect it from unauthorized access, use, or disclosure:</p>
          <ul>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> We use industry-standard encryption technologies (e.g., SSL/TLS) to secure data transmission on our website.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> Access to your personal information is restricted to authorized personnel who need it to perform their duties.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> We regularly review and update our security practices to ensure they meet current industry standards.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> While we strive to protect your personal information, please understand that no method of transmission over the internet or electronic storage is completely secure.</li>
          </ul>
        </section>

        <section>
          <h2>4. Your Rights</h2>
          <p>You have certain rights regarding your personal information:</p>
          <ul>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Access:</strong> You have the right to request access to the personal data we hold about you.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Correction:</strong> You can request that we correct any inaccurate or incomplete personal data.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Deletion:</strong> You can request the deletion of your personal data under certain circumstances.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Objection to Processing:</strong> You may object to the processing of your personal data for certain purposes, such as direct marketing.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Withdrawal of Consent:</strong> If we rely on your consent to process your personal data, you have the right to withdraw that consent at any time.</li>
            <li><FontAwesomeIcon icon={faLock} className="list-icon" /> <strong>Data Portability:</strong> You may have the right to receive your personal data in a structured, commonly used, and machine-readable format.</li>
          </ul>
          <p>To exercise any of these rights, please <a href="/contact-us">contact us</a> using the information provided below.</p>
        </section>

        <section>
          <h2>5. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
          <p>Email: <a href="mailto:info@vinylvault.com">info@vinylvault.com</a></p>
          <p>Or fill out a form on our <a href="/contact-us">contact us</a> page.</p>
        </section>

        <p className="additional-info">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Please review this policy periodically.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
