import React from 'react';
import './App.css';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <p>You can reach me at:</p>
      <ul>
        <li>Email: <a href="mailto:jennifer.traeger@email.com">jennifer.traeger@email.com</a></li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/jennifertraeger" target="_blank" rel="noopener noreferrer">linkedin.com/in/jennifertraeger</a></li>
      </ul>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
