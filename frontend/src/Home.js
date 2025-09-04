import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import foxHello from './fox_hello.json';
import './Home.css';
import './NavBar.css';

function Home() {
  const yearsExperience = new Date().getFullYear() - 2021;
  const skillIcons = {
    Frontend: [
      { icon: <img className="skill-icon" src="/skills/react.svg" alt="React" />, label: 'React' },
      { icon: <img className="skill-icon" src="/skills/html.svg" alt="CSS/HTML" />, label: 'HTML/CSS' },
      { icon: <img className="skill-icon" src="/skills/javascript.svg" alt="JavaScript" />, label: 'JavaScript' },
      { icon: <img className="skill-icon" src="/skills/blazor.svg" alt="Blazor" />, label: 'Blazor' },
      { icon: <img className="skill-icon" src="/skills/bootstrap.svg" alt="Bootstrap" />, label: 'Bootstrap' },
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
  const opusWorkHistory = [
    "Concurrent, full-stack development and maintenance of four public facing websites such as wisconsinvip2.org and ctemissions.com, on a small team of four developers",
    "Collaborate closely with Project Managers, QA, Technical Leads, and Business Stakeholders to design and implement features that support balance between code reusability and specific customer requirements",
    "Displayed ownership of my software quality by writing comprehensive automated tests to ensure consistent, reliable performance",
    "Independently streamlined and documented deployment processes, later adopted by other teams, improving cross-team efficiency and consistency"
  ]
  const cigWorkHistory = [
    "Collaborate with an agile team of twelve to design, develop, maintain and test two full-stack web/desktop applications",
    "Established and documented a standardized training program for three junior developers to assist with onboarding and mentorship"
  ]
  const cigInternshipHistory = [
    "Wrote an automated test suite that reduced bugs and manual testing time",
    "Write SQL scripts and update SQL packages to resolve bugs",
    "Featured as Intern of the Month on company newsletter and website"
  ]
  const educationHistory = [
    "Graduated 2021 Cum Laude and BSCS Outstanding Student Award Recipient",
    "Placed 2nd in EWU Programming Competition",
    "BA in Music with Emphasis in Piano"
  ]

  return (
    <div className="home-container">
      <div className="profile">
        <div className="profile-content-float">
          <img src="/global/profile.jpeg" alt="Jennifer Traeger" className="profile-photo-float" />
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
              details: opusWorkHistory,
              icon: <img src="/history/opus-logo.png" alt="Opus Icon" className="history-icons" />
            },
            {
              company: 'Capital Insurance Group',
              role: 'Software Developer II',
              years: '2021 - 2023',
              details: cigWorkHistory,
              icon: <img src="/history/cig-logo.jpeg" alt="CIG Icon" className="history-icons" />
            },
            {
              company: 'Capital Insurance Group',
              role: 'Technology Associate',
              years: '2020 - 2021',
              details: cigInternshipHistory,
              icon: <img src="/history/cig-logo.jpeg" alt="CIG Intern Icon" className="history-icons" />
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
              icon: <img src="/history/ewu-logo.svg" alt="EWU Icon" className="history-icons" />
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

export default Home;
