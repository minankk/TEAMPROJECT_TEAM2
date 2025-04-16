import React from "react";
import "./TermsandConditions.css";
import backgroundImage from "./assets/VV_background_infopages.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";

const TermsAndConditions = () => {
  return (
    <div
      className="terms-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <p>
          <FontAwesomeIcon icon={faFileContract} className="main-icon" /> Welcome to Vinyl Vault! By accessing and using our website, you agree to comply with and be bound by the following Terms and Conditions...
        </p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Vinyl Vault website (the "Website")...
          </p>
        </section>

        <section>
          <h2>2. Use of the Website</h2>
          <p>As a user of our Website, you agree to the following:</p>
          <ul>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.1: Lawful Use:</strong> You agree to use the Website only for lawful purposes...</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.2: Age Restriction:</strong> You must be at least 18 years old...</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.3: Unauthorized Access:</strong> You agree not to attempt to gain unauthorized access...</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.4: Intellectual Property:</strong> The content, design, graphics, and other materials...</li>
          </ul>
        </section>

        <section>
          <h2>3. Account and Security</h2>
          <ul>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>3.1:</strong> Keep your account credentials secure.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>3.2:</strong> Report suspicious activity promptly.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>3.3:</strong> We may suspend your account if terms are violated.</li>
          </ul>
        </section>

        <section>
          <h2>4. Orders and Payments</h2>
          <ul>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.1:</strong> Orders subject to availability and acceptance.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.2:</strong> Pricing errors may lead to cancellation/refund.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.3:</strong> Prices may change, but not retroactively.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.4:</strong> Accurate account and billing details required.</li>
          </ul>
        </section>

        <section>
          <h2>5. Shipping and Delivery</h2>
          <ul>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>5.1:</strong> Estimated times not guaranteed.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>5.2:</strong> We aren’t liable for external courier delays.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>5.3:</strong> You’re responsible for providing correct shipping info.</li>
          </ul>
        </section>

        <section>
          <h2>6. Returns and Refunds</h2>
          <ul>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.1:</strong> Return items within 14 days.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.2:</strong> Items must be in original condition.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.3:</strong> Refunds processed within 7–10 days.</li>
            <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.4:</strong> Some items are excluded from returns.</li>
          </ul>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>Vinyl Vault shall not be liable for indirect or incidental damages...</p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>These terms are governed by the laws of the United Kingdom.</p>
        </section>

        <section>
          <h2>9. Changes to These Terms</h2>
          <p>We may update these terms without prior notice.</p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>If you have any questions, please <a href="/contact-us">contact us</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
