import React from "react";
import "./DeliveryInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

const DeliveryInformation = () => {
  return (
    <div className="delivery-info-page">
      <div className="delivery-info-container">
        <h1>Delivery Information</h1>
        <p>
          At Vinyl Vault, we're committed to delivering your treasured vinyl records safely and efficiently. Please take a moment to review our delivery guidelines below.
        </p>

        <section>
          <h2>1. Delivery Timeframes</h2>
          <p>We understand you're eager to spin your new records! Here are our estimated delivery times:</p>
          <ul>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>Standard Delivery:</strong> 3–5 business days.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>Express Delivery:</strong> 1–2 business days. (Additional charges apply)</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>International Delivery:</strong> 7–21 business days depending on location.</li>
          </ul>
        </section>

        <section>
          <h2>2. Shipping Costs</h2>
          <p>Our shipping costs are designed to be fair and transparent:</p>
          <ul>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>UK Standard Shipping:</strong> FREE on orders over £50. £3.99 under £50.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>UK Express Delivery:</strong> Calculated at checkout.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>International Shipping:</strong> Calculated based on weight, location, and size.</li>
          </ul>
        </section>

        <section>
          <h2>3. Tracking Your Order</h2>
          <p>Stay informed every step of the way:</p>
          <ul>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> You’ll receive a <strong>tracking number</strong> via email once shipped.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Track your order on our <a href="/track-your-order">Order Tracking</a> page.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Questions? Contact our <a href="/contact-us">Customer Support Team</a>.</li>
          </ul>
        </section>

        <section>
          <h2>4. Failed or Delayed Deliveries</h2>
          <p>Sometimes things don’t go to plan — here’s how we handle it:</p>
          <ul>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Couriers leave instructions for re-delivery or depot collection.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Ensure your address is correct to avoid issues.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> We’ll notify you in case of unexpected courier delays.</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Suspect a lost package? Contact us within 7 days of the expected delivery.</li>
          </ul>
        </section>

        <section>
          <h2>5. Delivery Partners</h2>
          <p>We work with trusted carriers:</p>
          <ul>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Royal Mail – Standard UK deliveries</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> DPD – Express UK and some international</li>
            <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> DHL/FedEx – International shipping</li>
          </ul>
        </section>

        <p className="additional-info">
          Still have questions? Visit our <a href="/faqs">FAQs</a> or contact our <a href="/contact-us">Customer Support Team</a>. Thank you for choosing Vinyl Vault!
        </p>
      </div>
    </div>
  );
};

export default DeliveryInformation;
