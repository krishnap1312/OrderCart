import React, { useState } from 'react';
import './Contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <section className="contact-us">
      <div className="contact-us-content">
        <h1>Contact Us</h1>
        <p>We would love to hear from you! Whether you have a question, feedback, or simply want to say hello, feel free to get in touch with us.</p>
        <div className="contact-details">
          <div className="contact-info">
            <h2>Our Address</h2>
            <p>Street Number-1 SwithLane, Massaratti</p>
            <h2>Phone</h2>
            <p>+9123654789</p>
            <h2>Email</h2>
            <p>Restaurant@email.com</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
