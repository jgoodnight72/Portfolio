import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';
import NotFound from './NotFound';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogDetail from './BlogDetail';
import ProjectDetail from './ProjectDetail';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
