import React, { useState } from 'react';
import Lottie from 'lottie-react';
import foxHello from './fox_hello.json';
import './Home.css';
import './NavBar.css';

function Home() {
  const skillIcons = {
    Frontend: [
      { icon: <img className="skill-icon" src="/skills/react.svg" alt="React" />, label: 'React' },
      { icon: <img className="skill-icon" src="/skills/html.svg" alt="CSS/HTML" />, label: 'HTML/CSS' },
      { icon: <img className="skill-icon" src="/skills/javascript.svg" alt="JavaScript" />, label: 'JavaScript' },
    ],
    Backend: [
      { icon: <img className="skill-icon" src="/skills/dotnet.svg" alt=".NET" />, label: 'C#/VB.NET' },
      { icon: <img className="skill-icon" src="/skills/database.svg" alt="Microsoft SQL Server" />, label: 'SQL' },
      { icon: <img className="skill-icon" src="/skills/javascript.svg" alt="Java" />, label: 'Java' },
      { icon: <img className="skill-icon" src="/skills/springboot.svg" alt="Spring Boot" />, label: 'Spring Boot' },
    ],
    DevOps: [
      { icon: <img className="skill-icon" src="/skills/aws.svg" alt="AWS" />, label: 'AWS' },
      { icon: <img className="skill-icon" src="/skills/docker.svg" alt="Docker" />, label: 'Docker' },
      { icon: <img className="skill-icon" src="/skills/jenkins.svg" alt="Jenkins" />, label: 'Jenkins' },
    ],
    Practices: [
      { icon: <img className="skill-icon" src="/skills/agile.svg" alt="Agile" />, label: 'Agile/Scrum' },
      { icon: <img className="skill-icon" src="/skills/OOP.svg" alt="OOP" />, label: 'OOP' },
      { icon: <img className="skill-icon" src="/skills/TDD.svg" alt="TDD" />, label: 'TDD' },
    ],
    Tools: [
      { icon: <img className="skill-icon" src="/skills/VS.svg" alt="Visual Studio" />, label: 'Visual Studio' },
      { icon: <img className="skill-icon" src="/skills/intellijidea.svg" alt="IntelliJ IDEA" />, label: 'IntelliJ IDEA' },
      { icon: <img className="skill-icon" src="/skills/github.svg" alt="GitHub" />, label: 'GitHub' },
      { icon: <img className="skill-icon" src="/skills/atlassian.svg" alt="Atlassian" />, label: 'Atlassian' },
    ]
  };
  const skillCategories = Object.keys(skillIcons);
  const [selectedSkill, setSelectedSkill] = useState(skillCategories[0]);

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
      <div className="skills">
        <h2>My Skills</h2>
        <div>
          {Object.keys(skillIcons).map(skill => (
            <button
              key={skill}
              className={`btn-skills${selectedSkill === skill ? ' active' : ''}`}
              onClick={() => setSelectedSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
        <div className="icons-grid">
          {selectedSkill && skillIcons[selectedSkill] && skillIcons[selectedSkill].map((item, idx) => (
            <div
              className={`icon-card animate-glide`}
              key={`${selectedSkill}-${idx}`}
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              <div className="icon">{item.icon}</div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
