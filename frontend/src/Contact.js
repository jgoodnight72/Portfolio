import React from 'react';
import './App.css';
import './Contact.css';
import Lottie from 'lottie-react';
import mapPointer from './map_pointer.json';

function Contact() {
  return (
    <div className="contact-container">
        <div>
            <div className="contact-header">
                <div className="contact-header-text">
                    <h2>Contact Me</h2>
                    <p>I am always open to new opportunities. Feel free to reach out using any of the following!</p>
                </div>
                <Lottie className="pointer-animation" animationData={mapPointer} />
            </div>
            <form className="contact-form" action="https://formsubmit.co/jgoodnight7272@gmail.com" method="POST">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
                <button type="submit">Send</button>
            </form>
            <div className="logos">
                <a href="mailto:jgoodnight7272@gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src="/socials/email-logo.png" alt="Email Logo"/>
                </a>
                <a href="https://www.linkedin.com/in/jtraeger/" target="_blank" rel="noopener noreferrer">
                    <img src="/socials/linkedin-logo.png" alt="LinkedIn Logo" />
                </a>
                <a href="https://github.com/jgoodnight72" target="_blank" rel="noopener noreferrer">
                    <img src="/socials/git-logo.png" alt="GitHub Logo" />
                </a>
            </div>
        </div>
    </div>
  );
}

export default Contact;
