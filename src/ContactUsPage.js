import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import "./ContactUsPage.css";
import SuccessPopup from "./SuccessPopup"; // adjust path if needed

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".contact-form-container",
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
    try {
      const response = await fetch("http://localhost:5001/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with us below:</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          {['name', 'email', 'subject'].map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                placeholder=" "
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div key="message" className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {showSuccess && (
        <SuccessPopup
          message="Message sent successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}

export default ContactUs;
