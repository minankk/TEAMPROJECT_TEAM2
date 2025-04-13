import React, { useState, useEffect } from "react";
import "./LandNewsletter.css";
import newsletterImage from "./assets/newsletter_vv_1by1.jpeg";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  useEffect(() => {
    const vinyl = document.querySelector(".vinyl-svg");
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (vinyl) {
        vinyl.style.transform = `rotate(${scrollY * 0.1}deg) scale(1.05)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="newsletter-section">
      <div className="newsletter-wrapper">
        <div className="newsletter-text-content">
          <h3 className="newsletter-header">Stay in the loop</h3>
          <div className="newsletter-underline" />
          <p className="newsletter-subtext">
            Sign up to our Newsletter for special deals, rare vinyl drops, and insider news.
            As a subscriber, you'll also get exclusive early access to new arrivals and
            special announcements about upcoming events in the Vinyl Vault community.
            Don't miss out on the latest treasures for your collection!
          </p>
        </div>

        <div className="newsletter-form-wrapper">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Subscribe Now</button>
            </form>
          ) : (
            <p className="newsletter-thankyou">You're all set! 🎵</p>
          )}
        </div>

        <div className="newsletter-image-box">
          <img src={newsletterImage} alt="Newsletter visual: glowing record and key" />
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
