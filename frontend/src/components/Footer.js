import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      &copy; {new Date().getFullYear()} Jennifer Traeger
    </footer>
  );
}

export default Footer;
