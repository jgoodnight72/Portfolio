import React from "react";
import { useParams } from "react-router-dom";
import projects from "./projects.json";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div className="project-detail-container"><h2>Project not found</h2></div>;
  }

  return (
    <div className="project-detail-container">
        <div className="project-detail-header">
            <h2>{project.title}</h2>
            <p className="project-detail-description">{project.detailDescription}</p>
        </div>
        <div className="project-detail">
            <div className="project-detail-left">
                <img src={project.image} alt={project.title} className="project-detail-image" />
            </div>
            <div className="project-detail-right">
                <h3>View Project</h3>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-detail-link">
                    <img className="project-detail-icon" src="/links/link-logo-white.png" alt="Link"/>
                    View Live
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-detail-link">
                    <img className="project-detail-icon" src="/links/git-logo-white.png" alt="Link"/>
                    View Repo
                  </a>
                )}
                <h3>Tech Stack</h3>
                <div className="project-detail-tags">
                    {project.tags.map(tag => (
                    <span key={tag} className="project-detail-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProjectDetail;
