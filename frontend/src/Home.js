import React from 'react';
import Lottie from 'lottie-react';
import foxHello from './fox_hello.json';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <a href="/Resume.pdf" download className="resume-link">
              <img className="download-logo" src="/download_logo.png" alt="Download"/>
              Resume
            </a>
          </li>
        </ul>
      </nav>
      <div className="profile">
        <div className="profile-content-float">
          <img src="/profile.jpeg" alt="Jennifer Traeger" className="profile-photo-float" />
          <div className="profile-header">
            <h1>Hello, I'm Jenni</h1>
            <Lottie className="fox-animation" animationData={foxHello} />
          </div>
          <p className="profile-description-float">
            I am a <strong>Full-Stack Software Developer</strong> on the Public Websites team at Opus Inspections with 
            <strong> 5 years of experience</strong>. I thrive in fast-paced, sprint-driven environments where 
            meeting deadlines is essential, and I bring strong organizational skills that result in highly reusable, 
            maintainable solutions. Multifaceted across databases, user interfaces, and third-party integrations, I take 
            pride in building software that balances technical precision with real-world impact. I hold a <strong>Bachelor’s 
            Degree in Computer Science</strong> from Eastern Washington University. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
