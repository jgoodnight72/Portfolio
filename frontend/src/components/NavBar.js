import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import downloadLogo from '../assets/global/download_logo.png';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  return (
    <nav className="navbar">
      <div className="nav-standard-view">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <a href="/Jennifer-Traeger-Resume.pdf" download className="resume-link" onClick={() => setDropdownOpen(false)}>
              <img className="download-logo" src={downloadLogo} alt="Download"/>
              Resume
            </a>
          </li>
        </ul>
      </div>
      <div className="nav-mobile-view" ref={dropdownRef}>
        <button className="nav-dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
          Menu <span className={`nav-dropdown-arrow${dropdownOpen ? ' open' : ''}`}>▼</span>
        </button>
        <ul className={`nav-dropdown-list${dropdownOpen ? ' open' : ''}`}>
          <li><Link to="/" onClick={() => setDropdownOpen(false)}>Home</Link></li>
          <li><Link to="/projects" onClick={() => setDropdownOpen(false)}>Projects</Link></li>
          <li><Link to="/blog" onClick={() => setDropdownOpen(false)}>Blog</Link></li>
          <li><Link to="/contact" onClick={() => setDropdownOpen(false)}>Contact</Link></li>
          <li>
            <a href="/Jennifer-Traeger-Resume.pdf" download className="resume-link" onClick={() => setDropdownOpen(false)} >
              <img className="download-logo" src={downloadLogo} alt="Download"/>
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
