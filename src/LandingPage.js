import React from "react";
import "./LandingPage.css";
import Carousel3 from "./assets/Carousel3.jpg";
import Barbie from "./assets/Barbie.webp";
import Eminem from "./assets/Eminem.webp";
import HotelCalifornia from "./assets/HotelCalifornia.png";
import Sweetener from "./assets/Sweetener.webp";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Enjoyment in Every Sound</h1>
          <p>
            We are your local record store - online. A record store created and stocked by vinyl lovers for vinyl lovers.
          </p>
          <button className="shop-all-button">
            Shop All <span className="arrow">→</span>
          </button>
        </div>
        <img src={Carousel3} alt="Vinyl Collection" className="hero-image" />
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Sign Up</h3>
          <p>Join us to gain access to exclusive vinyl collections.</p>
          <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Search</h3>
          <p>Browse our vast collection, filter by genre, artist, or year.</p>
          <button>Search</button>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Get the Best Deals</h3>
          <p>Find the best offers and discounts on high-quality vinyl records.</p>
          <button>Shop Now</button>
        </div>
      </section>

      {/* Staff Picks Section */}
      <section className="staff-picks">
        <div className="staff-picks-header">
          <h2>STAFF PICKS</h2>
          <button className="shop-all-button">
            Shop All <span className="arrow">→</span>
          </button>
        </div>
        <div className="staff-picks-grid">
          <div className="item-landing">
            <img src={Barbie} alt="Barbie Vinyl" />
            <h3>Barbie The Album</h3>
            <p>£25.00</p>
          </div>
          <div className="item-landing">
            <img src={Eminem} alt="Eminem Vinyl" />
            <h3>The Marshall Mathers LP</h3>
            <p>£30.00</p>
          </div>
          <div className="item-landing">
            <img src={HotelCalifornia} alt="Hotel California Vinyl" />
            <h3>Hotel California</h3>
            <p>£20.00</p>
          </div>
          <div className="item-landing">
            <img src={Sweetener} alt="Sweetener Vinyl" />
            <h3>Sweetener</h3>
            <p>£22.00</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
