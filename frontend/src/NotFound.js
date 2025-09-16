import React from 'react';
import './NotFound.css';
import Lottie from 'lottie-react';
import foxAnimation from './assets/animations/fox_programmer.json';

function NotFound() {
  return (
    <div className="not-found-container" >
        <div className="not-found-header">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Lottie className="fox-programmer-animation" animationData={foxAnimation} />
        </div>
    </div>
  );
}

export default NotFound;
