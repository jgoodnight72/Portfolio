import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* <li><a href="/projects">Projects</a></li> 
        <li><a href="/blog">Blog</a></li>*/}
        <li><Link to="/contact">Contact</Link></li>
        <li>
          <a href="/Jennifer-Traeger-Resume.pdf" download className="resume-link">
            <img className="download-logo" src="/global/download_logo.png" alt="Download"/>
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
