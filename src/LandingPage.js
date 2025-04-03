import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";
import ReviewCarousel from "./ReviewCarousel";
import VinylGenres from "./VinylGenres";
import VinylHistory from "./VinylHistory";
import VIP_lounge_landing from "./VIP_lounge_landing"

// Import Hero Section Images
import Recordstore from "./assets/VINYL_STORE_HERO_LANDING.jpeg";
import Musicplayer from "./assets/VIP_HERO_LANDING.jpeg";
import Vinylhand from "./assets/VVREOCRD_HERO_LANDING.jpeg";

// Import Staff Picks Images
import Barbie from "./assets/barbie_sleeve.jpg";
import Eminem from "./assets/EminemTheMarshallMathersLP.jpg";
import HotelCalifornia from "./assets/hotelcalifornia_sleeve.jpg";
import Sweetener from "./assets/ArianaGrandeSweetener.webp";
import Nirvana from "./assets/NirvanaNevermind.webp";
import Oasis from "./assets/oasis_sleeve.jpg";
import PinkFloyd from "./assets/pinkfloyd_sleeve.png";
import TheBeatles from "./assets/TheBeatleAbbyRoad.webp";

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

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(".hero");
      if (hero) {
        let scrollPos = window.scrollY;
        hero.style.backgroundPositionY = `${scrollPos * 0.5}px`; // Parallax effect
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <p>We are your local record store - online.  A record store created and stocked by vinyl lovers for vinyl lovers.</p>
          <button className="shop-all-button" onClick={() => window.location.href = "/products"}>
            Shop All <span className="arrow">→</span>
          </button>
        </div>
        <img src={images[currentImage]} alt="Vinyl Collection" className="hero-image fade-image" />
      </section>

          {/* vinyl history section */}
          <VinylHistory />

          {/* Customer Reviews Section */}
          <ReviewCarousel />

{/* Staff Picks - Infinite Scrolling Carousel */}
<section className="staff-picks">
  <div className="staff-picks-header">
    <h2 className="staff-picks-title">Vault Weekly</h2>
    <p className="staff-subtitle">Handpicked by the team, updated each week with fresh tracks you’ll love!</p>
  </div>

  <div className="staff-carousel">
    <div className="staff-picks-container">
      <div className="infinite-scroll">
        {infinitePicks.map((item, index) => (
          <a href="http://localhost:3000/products" key={index} className="vinyl-item-link">
            <div className="vinyl-item">
              <img src={item.img} alt={item.title} className="vinyl-image" />
              <h3 className="vinyl-title">{item.title}</h3>
              <p className="vinyl-price">{item.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>

  <div>
    <button className="shop-all-button" onClick={() => window.location.href = "http://localhost:3000/products"}>
      Shop All <span className="arrow">→</span>
    </button>
  </div>
</section>

      {/* Vinyl Genre Showcase */}
      <VinylGenres />

       {/* VIP Section Intro */}
      <VIP_lounge_landing />

    </div>
  );
}

export default LandingPage;
