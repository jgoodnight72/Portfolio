import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="profile">
        <img src="/profile.jpeg" alt="Your Name" className="profile-photo" />
        <h1>Your Name</h1>
        <p>Basic information about you goes here.</p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">View Resume</a>
      </div>
    </div>
  );
}

export default Home;
