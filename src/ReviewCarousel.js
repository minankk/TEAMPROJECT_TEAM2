import React from "react";
import "./ReviewCarousel.css";

const reviews = [
  { name: "Alice", rating: 5, text: "Amazing quality! The sound is incredible." },
  { name: "John", rating: 4, text: "Great selection and fast delivery!" },
  { name: "Maria", rating: 5, text: "Perfect packaging and great prices." },
];

function ReviewCarousel() {
  return (
    <section className="reviews parallax">
      <h2>What Our Customers Say</h2>
      <div className="review-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p className="review-text">"{review.text}"</p>
            <p className="review-name">- {review.name}</p>
            <div className="stars">{"★".repeat(review.rating)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReviewCarousel;
