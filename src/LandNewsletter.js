import React, { useState, useEffect } from "react";
import "./LandNewsletter.css";
import newsletterImage from "./assets/newsletter_vv_1by1.jpeg";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return;

    const payload = {
      email: email.trim(),
      preferences: ["landing"], // ← can be changed to "footer" if needed
    };

    // If logged in, append user_id from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded?.user_id) {
          payload.user_id = decoded.user_id;
        }
      } catch (err) {
        console.error("Token decoding failed:", err);
        setError("Login session error. Please re-login.");
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5001/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Subscription failed.");
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setError(err.message || "Something went wrong.");
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
              <button type="submit" className="newsletter-button">
                Subscribe Now
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          ) : (
            <p className="newsletter-thankyou">You're all set! 🎵</p>
          )}
        </div>

        <div className="newsletter-image-box">
          <img
            src={newsletterImage}
            alt="Newsletter visual: glowing record and key"
          />
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
