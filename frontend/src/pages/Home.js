import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { foxHello } from '../assets/animations';
import './Home.css';
import '../components/NavBar.css';
import {
  reactIcon,
  htmlIcon,
  javascriptIcon,
  blazorIcon,
  bootstrapIcon,
  dotnetIcon,
  databaseIcon,
  springbootIcon,
  awsIcon,
  dockerIcon,
  jenkinsIcon,
  agileIcon,
  oopIcon,
  tddIcon,
  vsIcon,
  intellijIcon,
  githubIcon,
  atlassianIcon
} from '../assets/skills';
import { profilePhoto } from '../assets/global';
import { opusLogo, cigLogo, ewuLogo } from '../assets/history';
import { workHistory } from '../data/workHistory';
import { educationHistory } from '../data/educationHistory';

function Home() {

  /* Constants */

  const yearsExperience = new Date().getFullYear() - 2021;
  const skillIcons = {
    Frontend: [
      { icon: <img className="skill-icon" src={reactIcon} alt="React" />, label: 'React' },
      { icon: <img className="skill-icon" src={htmlIcon} alt="CSS/HTML" />, label: 'HTML/CSS' },
      { icon: <img className="skill-icon" src={javascriptIcon} alt="JavaScript" />, label: 'JavaScript' },
      { icon: <img className="skill-icon" src={blazorIcon} alt="Blazor" />, label: 'Blazor' },
      { icon: <img className="skill-icon" src={bootstrapIcon} alt="Bootstrap" />, label: 'Bootstrap' },
    ],
    Backend: [
      { icon: <img className="skill-icon" src={dotnetIcon} alt=".NET" />, label: 'C#/VB.NET' },
      { icon: <img className="skill-icon" src={databaseIcon} alt="Microsoft SQL Server" />, label: 'SQL' },
      { icon: <img className="skill-icon" src={javascriptIcon} alt="Java" />, label: 'Java' },
      { icon: <img className="skill-icon" src={springbootIcon} alt="Spring Boot" />, label: 'Spring Boot' },
    ],
    DevOps: [
      { icon: <img className="skill-icon" src={awsIcon} alt="AWS" />, label: 'AWS' },
      { icon: <img className="skill-icon" src={dockerIcon} alt="Docker" />, label: 'Docker' },
      { icon: <img className="skill-icon" src={jenkinsIcon} alt="Jenkins" />, label: 'Jenkins' },
    ],
    Practices: [
      { icon: <img className="skill-icon" src={agileIcon} alt="Agile" />, label: 'Agile/Scrum' },
      { icon: <img className="skill-icon" src={oopIcon} alt="OOP" />, label: 'OOP' },
      { icon: <img className="skill-icon" src={tddIcon} alt="TDD" />, label: 'TDD' },
    ],
    Tools: [
      { icon: <img className="skill-icon" src={vsIcon} alt="Visual Studio" />, label: 'Visual Studio' },
      { icon: <img className="skill-icon" src={intellijIcon} alt="IntelliJ IDEA" />, label: 'IntelliJ IDEA' },
      { icon: <img className="skill-icon" src={githubIcon} alt="GitHub" />, label: 'GitHub' },
      { icon: <img className="skill-icon" src={atlassianIcon} alt="Atlassian" />, label: 'Atlassian' },
    ]
  };
  const skillCategories = Object.keys(skillIcons);
  const [selectedSkill, setSelectedSkill] = useState(skillCategories[0]);
  // ...existing code...


  /* Helper Functions */

  function AccordionItem({ job }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item${open ? ' open' : ''}`}>
      <button className="accordion-title" onClick={() => setOpen(!open)}>
        {job.icon && job.icon}
        <span>{job.company}</span> — <span>{job.role}</span> <span style={{float: 'right'}}>{job.years}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0.2, 0.8] }}
            style={{ overflow: 'hidden' }}
          >
            {Array.isArray(job.details)
              ? <ul>{job.details.map((item, i) => <li key={i}>{item}</li>)}</ul>
              : job.details}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Render */

  return (
    <div className="home-container">
      <div className="profile">
        <div className="profile-content-float">
          <img src={profilePhoto} alt="Jennifer Traeger" className="profile-photo-float" />
          <div className="profile-header">
            <h1>Hello, I'm Jenni</h1>
            <Lottie className="fox-animation" animationData={foxHello} />
          </div>
          <p className="profile-description-float">
            I am a <strong>Full-Stack Software Developer</strong> on the Public Websites team at Opus Inspections with 
            <strong> {yearsExperience} years of experience</strong>. I thrive in fast-paced, sprint-driven environments where 
            meeting deadlines is essential, and I bring strong organizational skills that result in highly reusable, 
            maintainable solutions. Multifaceted across databases, user interfaces, and third-party integrations, I take 
            pride in building software that balances technical precision with real-world impact. I hold a <strong>Bachelor’s 
            Degree in Computer Science</strong> from Eastern Washington University. 
          </p>
        </div>
      </div>
      <div className="history">
        <h2>Work History</h2>
        <div className="accordion">
          {[
            {
              company: 'Opus Inspections',
              role: 'Software Developer',
              years: '2023 - Present',
              details: workHistory.opus,
              icon: <img src={opusLogo} alt="Opus Icon" className="history-icons" />
            },
            {
              company: 'Capital Insurance Group',
              role: 'Software Developer II',
              years: '2021 - 2023',
              details: workHistory.cig,
              icon: <img src={cigLogo} alt="CIG Icon" className="history-icons" />
            },
            {
              company: 'Capital Insurance Group',
              role: 'Technology Associate',
              years: '2020 - 2021',
              details: workHistory.cigInternship,
              icon: <img src={cigLogo} alt="CIG Intern Icon" className="history-icons" />
            }
          ].map((job, idx) => (
            <AccordionItem key={idx} job={job} />
          ))}
        </div>
      </div>
      <div className="history">
        <h2>Education</h2>
        <div className="accordion">
          {[
            {
              company: 'Eastern Washington University',
              role: 'BS Computer Science',
              years: '2017 - 2021',
              details: educationHistory,
              icon: <img src={ewuLogo} alt="EWU Icon" className="history-icons" />
            }
          ].map((job, idx) => (
            <AccordionItem key={idx} job={job} />
          ))}
        </div>
      </div>
      <div className="skills">
        <h3>My Skills</h3>
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
