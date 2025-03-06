import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./ContactUsPage.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    gsap.fromTo(
      ".contact-page .contact-form-container",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* 🎵 Spinning Vinyl Record */}
      <div className="vinyl-record"></div>

      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with us below.</p>
      </header>

      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" id="name" name="name" placeholder=" " value={formData.name} onChange={handleChange} required />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-group">
            <input type="email" id="email" name="email" placeholder=" " value={formData.email} onChange={handleChange} required />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-group">
            <input type="text" id="subject" name="subject" placeholder=" " value={formData.subject} onChange={handleChange} required />
            <label htmlFor="subject">Subject</label>
          </div>

          <div className="form-group">
            <textarea id="message" name="message" rows="5" placeholder=" " value={formData.message} onChange={handleChange} required></textarea>
            <label htmlFor="message">Message</label>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
