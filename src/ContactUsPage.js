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
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="record-shelf"></div>
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with us below.</p>
      </header>
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          {['name', 'email', 'subject', 'message'].map((field, index) => (
            <div key={field} className="form-group" style={{ '--index': index }}>
              {field !== 'message' ? (
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  placeholder=" "
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <textarea
                  id={field}
                  name={field}
                  rows="5"
                  placeholder=" "
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              )}
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            </div>
          ))}
          <button type="submit">Send Message</button>
        </form>
      </div>

    </div>
  );
}

export default ContactUs;