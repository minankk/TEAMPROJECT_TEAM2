import React from "react";
import "./DeliveryInformation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons"; // Import the solid style icon

const DeliveryInformation = () => {
  return (
    <div className="delivery-info-container">
      <h1>Delivery Information</h1>
      <p>
        At Vinyl Vault, we're committed to delivering your treasured vinyl records safely and efficiently. Please take a moment to review our delivery guidelines below.
      </p>

      <section>
        <h2>1. Delivery Timeframes</h2>
        <p>We understand you're eager to spin your new records! Here are our estimated delivery times:</p>
        <ul>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>Standard Delivery:</strong> 3-5 business days. This is our most economical option and covers most of the UK.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>Express Delivery:</strong> 1-2 business days. For those who can't wait, choose our express service at checkout for faster delivery. (Additional charges apply)</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>International Delivery:</strong> Delivery times vary significantly based on your location and customs procedures. Please allow 7-21 business days for international orders. You will receive a more specific estimate at checkout.</li>
        </ul>
      </section>

      <section>
        <h2>2. Shipping Costs</h2>
        <p>Our shipping costs are designed to be fair and transparent:</p>
        <ul>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>UK Standard Shipping:</strong> FREE on all orders over £50. For orders under £50, a flat rate of £3.99 applies.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>UK Express Delivery:</strong> Calculated at checkout based on the weight and size of your order.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> <strong>International Shipping:</strong> Fees are calculated at checkout based on the destination country, weight, and dimensions of your package. Please note that you may be responsible for import duties and taxes levied by your country.</li>
        </ul>
      </section>

      <section>
        <h2>3. Tracking Your Order</h2>
        <p>Stay informed about your delivery every step of the way:</p>
        <ul>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Once your order is processed and shipped, you will receive a confirmation email containing your <strong>tracking number</strong> and a link to our order tracking page.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> You can track the real-time status of your delivery by visiting our <a href="/track-your-order">Order Tracking</a> page and entering your tracking number.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> If you experience any delays or have concerns about your delivery, please don't hesitate to contact our dedicated <a href="/contact-us">Customer Support Team</a>, quoting your order number.</li>
        </ul>
      </section>

      <section>
        <h2>4. Failed or Delayed Deliveries</h2>
        <p>While we strive for perfection, occasional issues can arise:</p>
        <ul>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> If a delivery attempt is unsuccessful, our courier will typically leave a notification card with instructions for arranging a re-delivery or collecting your package from a local depot.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Please ensure that the shipping address you provide is accurate and complete. We are not responsible for delays or non-delivery caused by incorrect or incomplete addresses.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> In the event of unforeseen circumstances or courier-related issues that cause a delay, we will do our best to keep you informed.</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> If your package appears to be lost, please report this to our <a href="/contact-us">Customer Support Team</a> within 7 days of the expected delivery date so we can investigate.</li>
        </ul>
      </section>

      <section>
        <h2>5. Delivery Partners</h2>
        <p>We partner with reputable and reliable couriers to ensure your records arrive in excellent condition. Our primary delivery partners include:</p>
        <ul>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> Royal Mail (for standard UK deliveries)</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> DPD (for express UK and some international deliveries)</li>
          <li><FontAwesomeIcon icon={faCompactDisc} style={{ marginRight: '10px' }} /> DHL/FedEx (for most international deliveries)</li>
        </ul>
      </section>

      <p className="additional-info">
        For any further questions or specific delivery inquiries, please visit our <a href="/faqs">FAQs</a> page or contact our <a href="/contact-us">Customer Support Team</a>. Thank you for choosing Vinyl Vault!
      </p>
    </div>
  );
};

export default DeliveryInformation;
