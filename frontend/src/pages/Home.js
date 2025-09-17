import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { foxHello } from '../assets/animations';
import './Home.css';
import { profilePhoto } from '../assets/global';
import { opusLogo, cigLogo, ewuLogo } from '../assets/history';
import { workHistory } from '../data/workHistory';
import { educationHistory } from '../data/educationHistory';
import { skillIcons } from '../data/skillIcons';
import AccordionItem from '../components/AccordionItem';

function Home() {

  /* Constants */

  const yearsExperience = new Date().getFullYear() - 2021;
  const skillCategories = Object.keys(skillIcons);
  const [selectedSkill, setSelectedSkill] = useState(skillCategories[0]);


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
