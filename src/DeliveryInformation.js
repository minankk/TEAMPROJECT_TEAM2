import React from "react";
import "./DeliveryInformation.css";

const DeliveryInformation = () => {
  return (
    <div className="delivery-info-container">
      <h1>Delivery Information</h1>
      <p>
        We aim to provide a seamless and efficient delivery service for our customers. Please read our delivery policy below.
      </p>

      <h2>1. Delivery Timeframes</h2>
      <ul>
        <li>1.1: Standard delivery takes 3-5 business days.</li>
        <li>1.2: Express delivery is available for an additional charge and takes 1-2 business days.</li>
        <li>1.3: International delivery times vary based on location and customs regulations.</li>
      </ul>

      <h2>2. Shipping Costs</h2>
      <ul>
        <li>2.1: Standard shipping is free for orders over £50.</li>
        <li>2.2: Express delivery costs are calculated at checkout.</li>
        <li>2.3: International shipping fees depend on destination and package weight.</li>
      </ul>

      <h2>3. Tracking Your Order</h2>
      <ul>
        <li>3.1: Once your order is shipped, you will receive a tracking number via email.</li>
        <li>3.2: Use our order tracking page to check the status of your delivery.</li>
        <li>3.3: If your package is delayed, please contact our support team.</li>
      </ul>

      <h2>4. Failed or Delayed Deliveries</h2>
      <ul>
        <li>4.1: If a delivery attempt fails, our courier will leave a notice for re-delivery.</li>
        <li>4.2: We are not responsible for delays caused by incorrect addresses or courier issues.</li>
        <li>4.3: Lost packages should be reported within 7 days of the expected delivery date.</li>
      </ul>
    </div>
  );
};

export default DeliveryInformation;
