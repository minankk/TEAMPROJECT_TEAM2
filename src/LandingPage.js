import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";
import ReviewCarousel from "./ReviewCarousel";
import VinylGenres from "./VinylGenres";

// Import Hero Section Images
import Recordstore from "./assets/recordstore.jpg";
import Musicplayer from "./assets/music-player.jpg";
import Vinylhand from "./assets/vinyl-hand.jpg";

// Import Staff Picks Images
import Barbie from "./assets/Barbie.webp";
import Eminem from "./assets/Eminem.webp";
import HotelCalifornia from "./assets/HotelCalifornia.png";
import Sweetener from "./assets/Sweetener.webp";
import Nirvana from "./assets/nirvana_nvm_record.jpg";
import Oasis from "./assets/OasisWhastthestory.webp";
import PinkFloyd from "./assets/pinkfloyd_darkside.webp";
import TheBeatles from "./assets/abbey_road.webp";

const images = [Recordstore, Musicplayer, Vinylhand];

// Ensure these four always appear first
const staffPicks = [
  { img: Barbie, title: "Barbie The Album", price: "£25.00" },
  { img: Eminem, title: "The Marshall Mathers LP", price: "£30.00" },
  { img: HotelCalifornia, title: "Hotel California", price: "£20.00" },
  { img: Sweetener, title: "Sweetener", price: "£22.00" },
  { img: Nirvana, title: "Nevermind", price: "£28.00" },
  { img: Oasis, title: "(What's the Story) Morning Glory?", price: "£27.00" },
  { img: PinkFloyd, title: "The Dark Side of the Moon", price: "£35.00" },
  { img: TheBeatles, title: "Abbey Road", price: "£32.00" },
];

// Duplicate for seamless infinite scrolling
const infinitePicks = [...staffPicks, ...staffPicks];

function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);

  // Auto-slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle infinite scrolling effect
  const scrollCarousel = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = 300;
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });

    // Reset position when reaching the duplicated end
    setTimeout(() => {
      if (direction === 1 && container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else if (direction === -1 && container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    }, 500);
  };

  const [scrolling, setScrolling] = useState(true);

  useEffect(() => {
    let interval;
    if (scrolling) {
      interval = setInterval(() => {
        scrollCarousel(1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [scrolling]);

  const handleMouseEnter = () => setScrolling(false);
  const handleMouseLeave = () => setScrolling(true);


  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text fade-in">
          <h1>Enjoyment in Every Sound</h1>
          <p>We are your local record store - online. A record store created and stocked by vinyl lovers for vinyl lovers.</p>
          <button className="shop-all-button" onClick={() => window.location.href = "/products"}>
            Shop All <span className="arrow">→</span>
          </button>
        </div>
        <img src={images[currentImage]} alt="Vinyl Collection" className="hero-image fade-image" />
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Sign Up</h3>
          <p>Join us to gain access to exclusive vinyl collections.</p>
          <button onClick={() => window.location.href = "/signup"}>Sign Up</button>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Search</h3>
          <p>Browse our vast collection, by genre, artist, or year.</p>
          <button>Search</button>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Get the Best Deals</h3>
          <p>Find the best offers and discounts on high-quality vinyl records.</p>
          <button onClick={() => window.location.href = "/products"}>Shop Now</button>
        </div>
      </section>

      {/* Staff Picks - Infinite Scrolling Carousel */}
      <section className="staff-picks">
        <hr className="section-divider" /> {/* Top Divider */}

        <div className="staff-picks-header">
        <h2 className="staff-picks-title">STAFF PICKS</h2>
        <p className="staff-subtitle">Our team handpicks the hottest tracks, refreshed weekly.</p>
        </div>

        <div className="staff-carousel">
          <div className="staff-picks-container">
            <div className="infinite-scroll">
              {infinitePicks.map((item, index) => (
                <div className="item-landing" key={index}>
                  <img src={item.img} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p className="price">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
        <button className="shop-all-button" onClick={() => window.location.href = "/products"}>
          Shop All <span className="arrow">→</span>
        </button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <ReviewCarousel />

      {/* Vinyl Genre Showcase */}
      <VinylGenres />
    </div>
  );
}

export default LandingPage;
