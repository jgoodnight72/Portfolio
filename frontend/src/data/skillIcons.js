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

export const skillIcons = {
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
