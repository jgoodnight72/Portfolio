import React, { useState } from 'react';
import '../App.css';
import emailLogo from '../assets/socials/email-logo.png';
import linkedinLogo from '../assets/socials/linkedin-logo.png';
import gitLogo from '../assets/socials/git-logo.png';
import './Contact.css';
import Lottie from 'lottie-react';
import mapPointer from '../assets/animations/map_pointer.json';

function Contact() {
    const [message, setMessage] = useState("");
    const maxMessageLength = 200;
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
                    <input type="text" id="name" name="name" required maxLength={40} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required maxLength={60} />
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        maxLength={maxMessageLength}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    ></textarea>
                    <div className="char-count">
                        {maxMessageLength - message.length} / {maxMessageLength}
                    </div>
                    <button type="submit">Send</button>
                </form>
                <div className="logos">
                    <a href="mailto:jgoodnight7272@gmail.com" target="_blank" rel="noopener noreferrer">
                        <img src={emailLogo} alt="Email Logo"/>
                    </a>
                    <a href="https://www.linkedin.com/in/jtraeger/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinLogo} alt="LinkedIn Logo" />
                    </a>
                    <a href="https://github.com/jgoodnight72" target="_blank" rel="noopener noreferrer">
                        <img src={gitLogo} alt="GitHub Logo" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;
