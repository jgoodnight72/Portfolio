import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />*/}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
