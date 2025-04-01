import React, { useEffect } from "react";
import "./AboutUs.css";
import TeamImage from "./assets/2c211e7f-0031-4b29-a72e-b0f26d29cebc.JPG";
import BackstoryVid from "./assets/the_vault_backstory.mp4";
import Tilt from "react-parallax-tilt";

function AboutUs() {
  useEffect(() => {
    const AOS = require("aos");
    AOS.init();
  }, []);

  return (
    <div className="about-container">
      {/* Hero Section with Video Background */}
      <div className="about-hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={BackstoryVid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Welcome Section */}
      <section className="about-welcome" data-aos="fade-up">
        <p>
          We’re a crew of Computer Science students united by our love for music and technology.
          Our mission? To create a space where vinyl enthusiasts can discover, collect, and immerse
          themselves in the timeless world of records.
        </p>
      </section>

      {/* Main Content */}
      <section className="about-content">
        {/* Text Section */}
        <div className="about-text" data-aos="fade-right">
          <p>
            Music has always been more than just sound; it's an experience, a memory, and a connection.
            In the digital era, where streaming dominates, we wanted to preserve the authentic charm of vinyl records.
          </p>
          <p>
            We built this website to bridge the gap between classic and modern music lovers. Every record tells a story,
            and we want to make sure that story reaches the right hands. Our goal is to create a seamless shopping experience,
            providing a curated collection of high-quality vinyl records at the best prices.
          </p>
          <p>
            Whether you're a seasoned collector or a newcomer discovering the warmth of vinyl, our platform is designed to make
            your journey smooth and enjoyable. With a user-friendly interface, personalised recommendations, and a growing
            community, we are more than just a store, we are a home for vinyl enthusiasts.
          </p>
          <p>
            Thank you for being a part of our journey. Explore, listen, and experience music the way it was meant to be!
          </p>
          <p>- With Love, the Vinyl Vault team</p>
        </div>

        {/* Team Image with Smooth Hover Effect */}
        <Tilt className="about-image">
          <img src={TeamImage} alt="Our Team" className="team-photo" />
        </Tilt>
      </section>
    </div>
  );
}

export default AboutUs;
