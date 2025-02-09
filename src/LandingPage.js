import React, { useEffect, useState } from "react";
import "./LandingPage.css";

function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slides = document.querySelectorAll('.carousel-item');
    const carouselInner = document.querySelector('.carousel-inner');
    const nextButton = document.querySelector('.carousel-control-next');
    const prevButton = document.querySelector('.carousel-control-prev');

    if (!carouselInner || !nextButton || !prevButton) {
      console.error("Carousel elements not found");
      return;
    }

    const showSlide = (index) => {
      if (index >= slides.length) {
        setCurrentSlide(0);
      } else if (index < 0) {
        setCurrentSlide(slides.length - 1);
      } else {
        setCurrentSlide(index);
      }
      const offset = -currentSlide * 100;
      document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
    };

    showSlide(currentSlide);

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    return () => {
      nextButton.removeEventListener('click', nextSlide);
      prevButton.removeEventListener('click', prevSlide);
    };
  }, [currentSlide]);

  return (
    <div className="landing-container">
      <section className="banner">
        <div className="banner-content">
          <div className="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/Carousel1.jpg" alt="Slide 1" />
              </div>
              <div className="carousel-item">
                <img src="/images/Carousel2.jpg" alt="Slide 2" />
              </div>
              <div className="carousel-item">
                <img src="/images/Carousel3.jpg" alt="Slide 3" />
              </div>
            </div>
            <button className="carousel-control-prev">❮</button>
            <button className="carousel-control-next">❯</button>
          </div>
        </div>
      </section>

      {/* New Section Added Below */}
      <section className="steps-section">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Sign Up</h3>
          <p>Join us and gain access to exclusive vinyl collections. Register now!</p>
          <button>Sign Up</button>
        </div>

        <div className="step">
          <div className="step-number">2</div>
          <h3>Search</h3>
          <p>Explore a vast collection of vinyl records based on genre, artist, or year.</p>
          <button>Search</button>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <h3>Get the Best Deals</h3>
          <p>Find the best offers and discounts on high-quality vinyl records.</p>
          <button>Shop Now</button>
        </div>
      </section>

 {/* Editor's Choice Section */}
 <section className="content">
        <h2 className="items-title">Editor's Choice</h2>
        <div className="items-carousel">
          {/* Product 1 */}
          <div className="item">
            <img src="/images/Barbie.webp" alt="Product 1" />
            <div className="item-details">
              <h3 className="item-title">Barbie the Album Original Soundtrack</h3>
              <p className="item-price">$25.00</p>
              {/*<button>Explore More</button>*/}
            </div>
          </div>

          {/* Product 2 */}
          <div className="item">
            <img src="/images/Eminem.webp" alt="Product 2" />
            <div className="item-details">
              <h3 className="item-title">The Marshall Mathers LP</h3>
              <p className="item-price">$30.00</p>
              {/*<button>Explore More</button>*/}
            </div>
          </div>

          {/* Product 3 */}
          <div className="item">
            <img src="/images/HotelCalifornia.png" alt="Product 3" />
            <div className="item-details">
              <h3 className="item-title">Hotel California</h3>
              <p className="item-price">$20.00</p>
              {/*<button>Explore More</button>*/}
            </div>
          </div>

          {/* Product 4 */}
          <div className="item">
            <img src="/images/Sweetener.webp" alt="Product 4" />
            <div className="item-details">
              <h3 className="item-title">Sweetener</h3>
              <p className="item-price">$22.00</p>
              {/* <button>Explore More</button> */}
            </div>
          </div>
        </div>
        <div className="shop-all-container">
          <button className="shop-all-button">Shop All</button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
