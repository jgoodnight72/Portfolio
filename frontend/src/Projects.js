import React from "react";
import { Link } from "react-router-dom";
import projects from "./data/projects.json";
import "./Projects.css";
import portfolioImg from './assets/projects/portfolio.png';
import comingSoonImg from './assets/projects/comingsoon.jpeg';

function Projects() {
  // Map project IDs to imported images
  const imageMap = {
    Portfolio: portfolioImg,
    WidgetBoard: comingSoonImg
  };
  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>My Projects</h2>
      </div>
      <div className="projects-cards">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}`} className="project-link" key={project.id} style={{ textDecoration: 'none' }}>
            <div className="project-card">
              <img className="project-photo" src={imageMap[project.id]} alt={`${project.title} screenshot`} />
              <div className="project-description">
                <h3>{project.title}</h3>
                {project.tags.map((tag, index) => (
                  <span className="project-tag" key={index}>{tag}</span>
                ))}
                <p>{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Projects;
