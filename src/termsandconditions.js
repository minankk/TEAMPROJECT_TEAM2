import React from "react";
import "./TermsandConditions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons"; // Example icon

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        <FontAwesomeIcon icon={faFileContract} className="main-icon" /> Welcome to Vinyl Vault! By accessing and using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read these terms carefully before using our services. Your use of this website indicates your acceptance of these terms.
      </p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Vinyl Vault website (the "Website"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions (the "Terms"). If you do not agree to all of these Terms, please do not access or use our Website or services.
        </p>
      </section>

      <section>
        <h2>2. Use of the Website</h2>
        <p>As a user of our Website, you agree to the following:</p>
        <ul>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.1: Lawful Use:</strong> You agree to use the Website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Website. Prohibited behavior includes but is not limited to harassment, transmitting offensive content, or disrupting the normal flow of dialogue.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.2: Age Restriction:</strong> You must be at least 18 years old or using the Website under the direct supervision of a parent or legal guardian. By using our services, you represent and warrant that you meet these requirements.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.3: Unauthorized Access:</strong> You agree not to attempt to gain unauthorized access to any portion or feature of the Website, or any other systems or networks connected to the Website, or to any of our servers, services, or data.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>2.4: Intellectual Property:</strong> The content, design, graphics, and other materials on this Website are protected by copyright and other intellectual property laws. You may not reproduce, modify, distribute, or display our intellectual property without our prior written consent.</li>
        </ul>
      </section>

      <section>
        <h2>3. Account and Security</h2>
        <p>If you create an account on our Website, you are responsible for maintaining its security:</p>
        <ul>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>3.1: Account Confidentiality:</strong> You are responsible for maintaining the confidentiality of your username, password, and any other security information related to your account.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>3.2: Reporting Suspicious Activity:</strong> You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>3.3: Account Termination:</strong> We reserve the right to suspend or terminate your account at our sole discretion, without notice, if we believe you have violated these Terms or engaged in any activity that we deem harmful to our Website or other users.</li>
        </ul>
      </section>

      <section>
        <h2>4. Orders and Payments</h2>
        <p>When you place an order through our Website, the following terms apply:</p>
        <ul>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.1: Order Acceptance:</strong> All orders placed are subject to availability and our acceptance. We will confirm our acceptance of your order by sending you a confirmation email.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.2: Pricing Errors and Cancellation:</strong> We reserve the right to cancel any order arising from typographical or pricing errors on the Website. In the event of a cancellation, we will provide you with a full refund.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.3: Price Changes:</strong> Prices for our products are subject to change without notice. Such changes will not affect orders that have already been confirmed.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>4.4: Payment Methods:</strong> We accept various payment methods as indicated on our Website. You agree to provide current, complete, and accurate purchase and account information for all purchases made via our Website.</li>
        </ul>
      </section>

      <section>
        <h2>5. Shipping and Delivery</h2>
        <p>Our shipping and delivery terms are as follows:</p>
        <ul>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>5.1: Shipping Times:</strong> Shipping times may vary depending on the destination and the shipping method selected. Estimated delivery times are provided for your convenience but are not guaranteed.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>5.2: External Delays:</strong> We are not responsible for any delays in shipping caused by external factors beyond our control, such as customs clearance, postal service disruptions, or courier-related issues.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>5.3: Incorrect Information:</strong> It is your responsibility to provide accurate and complete shipping information. We are not liable for delays or non-delivery resulting from incorrect addresses provided by the user. Additional charges may apply for reshipping orders due to incorrect information.</li>
        </ul>
      </section>

      <section>
        <h2>6. Returns and Refunds</h2>
        <p>Our policy regarding returns and refunds is as follows:</p>
        <ul>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.1: Return Period:</strong> You may return most items within 14 days of receiving your order for a refund or exchange, subject to our Return Policy.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.2: Condition of Items:</strong> To be eligible for a return, items must be in their original, unused condition, with all original packaging, tags, and accessories intact.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.3: Refund Process:</strong> Once your returned item is received and inspected, we will process your refund within 7-10 business days. Refunds will be issued to the original payment method used for the purchase.</li>
          <li><FontAwesomeIcon icon={faFileContract} className="list-icon" /> <strong>6.4: Exclusions:</strong> Certain items may not be eligible for return or refund, such as opened software or personalized items, unless they are faulty. Please refer to our full Return Policy for details.</li>
        </ul>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by applicable law, Vinyl Vault shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Website or our services.</p>
      </section>

      <section>
        <h2>8. Governing Law</h2>
        <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
      </section>

      <section>
        <h2>9. Changes to These Terms</h2>
        <p>We reserve the right to modify or revise these Terms and Conditions at any time without prior notice. Your continued use of the Website following the posting of any changes constitutes acceptance of those changes.</p>
      </section>

      <section>
        <h2>10. Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, please <a href="http://localhost:3000/contact-us">contact us</a> at:</p>
        <p>Email: <a href="mailto:info@vinylvault.com">info@vinylvault.com</a></p>
        <p>Or fill out a form on our <a href="http://localhost:3000/contact-us">contact us</a> page.</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
