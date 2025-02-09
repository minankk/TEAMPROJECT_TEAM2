import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Carousel from "./Carousel"; // Import the carousel component
import vinylImage1 from "../assets/vinyl1.jpg"; // Replace with actual images
import vinylImage2 from "../assets/vinyl2.jpg";
import vinylImage3 from "../assets/vinyl3.jpg";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Carousel Section */}
      <section className="carousel-section">
        <Carousel
          images={[vinylImage1, vinylImage2, vinylImage3]}
          altText={["Vinyl Collection", "Retro Records", "Turntable Magic"]}
        />
      </section>

      {/* Sign Up / Browse / Buy Section */}
      <section className="info-section">
        <div className="info-box">
          <h3>Sign Up</h3>
          <p>Join our community and stay updated with exclusive vinyl drops.</p>
          <Link to="/signup" className="info-button">Join Now</Link>
        </div>
        <div className="info-box">
          <h3>Browse</h3>
          <p>Explore our extensive collection of classic and modern records.</p>
          <Link to="/products" className="info-button">Start Browsing</Link>
        </div>
        <div className="info-box">
          <h3>Buy</h3>
          <p>Pick your favorites and get them delivered to your doorstep.</p>
          <Link to="/products" className="info-button">Shop Now</Link>
        </div>
      </section>

      {/* Staff Picks Section */}
      <section className="staff-picks">
        <h2>Staff Picks</h2>
        <div className="record-grid">
          <img src={vinylImage1} alt="Vinyl 1" />
          <img src={vinylImage2} alt="Vinyl 2" />
          <img src={vinylImage3} alt="Vinyl 3" />
          <img src={vinylImage1} alt="Vinyl 4" />
          <img src={vinylImage2} alt="Vinyl 5" />
          <img src={vinylImage3} alt="Vinyl 6" />
        </div>
        <Link to="/products" className="shop-all-btn">
          Shop All →
        </Link>
      </section>

      {/* Additional Sections */}
      <section className="about-vinyl">
        <h2>Why Vinyl?</h2>
        <p>
          Experience the warmth of analog sound, rich in detail and nostalgia. Vinyl records offer a unique listening journey like no other.
        </p>
      </section>

      <section className="community-section">
        <h2>Join the Club</h2>
        <p>
          Become a part of our vibrant vinyl-loving community. Discover exclusive releases, reviews, and more.
        </p>
        <Link to="/community" className="info-button">Learn More</Link>
      </section>
    </div>
  );
};

export default LandingPage;
