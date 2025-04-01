import React from "react";
import "./ReviewCarousel.css";
import { FaCheckCircle } from "react-icons/fa"; // Import tick icon from react-icons

const reviews = [
  { name: "Alice P.", rating: 5, text: "Amazing quality! The sound is incredible.", date: "11 Dec 2024" },
  { name: "John B.", rating: 4, text: "Great selection and fast delivery!", date: "15 Jan 2025" },
  { name: "Maria K.", rating: 5, text: "Perfect packaging and great prices.", date: "3 Feb 2025" },
  { name: "David R.", rating: 4, text: "Wide variety of choices, very satisfied!", date: "20 Feb 2025" },
  { name: "Emma S.", rating: 5, text: "Superb customer service and amazing sound!", date: "5 Mar 2025" },
  { name: "Lucas T.", rating: 3, text: "Good selection but shipping took longer than expected.", date: "10 Mar 2025" },
  { name: "Sophia L.", rating: 5, text: "Absolutely love my vinyls! Will buy again.", date: "18 Mar 2025" },
];

function ReviewCarousel() {
  return (
    <section className="review-section">
      <h2 className="review-title">Review Roundup</h2>
      <p className="review-subtitle">Customer Feedback from Our Vinyl Aficionados:</p>
      <div className="review-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="stars">{"★".repeat(review.rating)}</div>
            <p className="review-text">"{review.text}"</p>
            <p className="review-name">- {review.name}</p>
            <div className="verified-badge">
              <FaCheckCircle className="tick-icon" /> Verified Purchase • {review.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReviewCarousel;
