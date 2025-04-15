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

      {/* Gradient Wrapper for Page Content */}
      <div className="about-gradient-wrapper">
        {/* Welcome Section */}
        <section className="about-welcome" data-aos="fade-up">
          <p>
            We’re a crew of <strong>Computer Science students</strong> united by our love for <strong>music</strong> and <strong>technology. </strong>
            Our mission? To create a space where <strong>vinyl enthusiasts</strong> can <strong>discover, collect, and immerse</strong>
            themselves in the <strong>timeless world of records.</strong>
          </p>
        </section>

        {/* Main Content */}
        <section className="about-content">
          <div className="about-text" data-aos="fade-right">
            <p>
              <strong>Music has always been more than just sound;</strong> it's an experience, a memory, and a connection.
              In the digital era, where streaming dominates, we wanted to preserve the <strong>authentic charm of vinyl records.</strong>
            </p>
            <p>
              We built this website to <strong>bridge the gap between classic and modern music lovers.</strong> Every record tells a story,
              and we want to make sure that story reaches the right hands. Our goal is to <strong>create a seamless shopping experience,</strong>
              providing a curated collection of high-quality vinyl records at the best prices.
            </p>
            <p>
              Thank you for being a part of our journey. <strong>Explore, listen, and experience music the way it was meant to be!</strong>
            </p>
            <p>- With Love, the Vinyl Vault team</p>
          </div>

          <Tilt className="about-image">
            <img src={TeamImage} alt="Our Team" className="team-photo" />
          </Tilt>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
