import React from "react";
import "./AboutUs.css";
import TeamImage from "./assets/2c211e7f-0031-4b29-a72e-b0f26d29cebc.JPG";

function AboutUs() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          Welcome to our vinyl record store! We are a group of Computer Science students who share a deep love for music.
          Our passion for technology and sound, brought us together to create a space where vinyl lovers can explore, collect, and enjoy timeless records.
        </p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Passion for Music & Tech</h2>
          <p>
            Music has always been more than just sound; it's an experience, a memory, and a connection. In the digital era,
            where streaming dominates, we wanted to preserve the authentic charm of vinyl records.
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
        <div className="about-image">
          <img src={TeamImage} alt="Our Team" />
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
