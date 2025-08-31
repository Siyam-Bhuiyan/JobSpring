import { IconMapPin, IconRecharging, IconSearch } from "@tabler/icons-react";

export interface SearchField {
  title: string;
  icon: React.ComponentType<any>;
  options: string[];
}

export const searchFields: SearchField[] = [
  {
    title: "Job Title", 
    icon: IconSearch,
    options: [
      "Designer",
      "Developer",
      "Product Manager",
      "Marketing Specialist",
      "Data Analyst",
      "Sales Executive",
      "Content Writer",
      "Customer Support",
    ],
  },
  {
    title: "Location",
    icon: IconMapPin,
    options: [
      "Delhi",
      "New York",
      "San Francisco",
      "London",
      "Berlin",
      "Tokyo",
      "Sydney",
      "Toronto",
    ],
  },
  {
    title: "Skills",
    icon: IconRecharging,
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Angular",
      "Node.js",
      "Python",
      "Java",
      "Ruby",
      "PHP",
      "SQL",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "API Development",
      "Testing and Debugging",
      "Agile Methodologies",
      "DevOps",
      "AWS",
      "Azure",
      "Google Cloud",
    ],
  },
];

export interface Talent {
  name: string;
  role: string;
  company: string;
  topskills: string[];
  about: string;
  expectedCtc: string;
  location: string;
  image: string;
}

export const talents: Talent[] = [
  {
    name: "Diana Prince",
    role: "UX/UI Designer",
    company: "Adobe",
    topskills: ["Figma", "Sketch", "InVision"],
    about:
      "As a UX/UI Designer at Adobe, I am dedicated to crafting visually compelling and user-centric designs. My expertise in Figma, Sketch, and InVision allows me to create intuitive interfaces that enhance user experience across digital platforms.",
    expectedCtc: "35 - 50 LPA",
    location: "Los Angeles, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice",
  },
  {
    name: "Bruce Wayne",
    role: "Full Stack Developer",
    company: "Wayne Enterprises",
    topskills: ["React", "Node.js", "MongoDB"],
    about:
      "Full Stack Developer with expertise in scalable web applications. Passionate about building robust systems and creating seamless user experiences from backend to frontend.",
    expectedCtc: "40 - 60 LPA",
    location: "Gotham, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bruce",
  },
  {
    name: "Clark Kent",
    role: "Data Analyst",
    company: "Daily Planet",
    topskills: ["SQL", "Python", "Tableau"],
    about:
      "Data Analyst skilled in data visualization and predictive analytics. Experienced in turning complex datasets into actionable insights for business growth.",
    expectedCtc: "25 - 40 LPA",
    location: "Metropolis, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Clark",
  },
  {
    name: "Natasha Romanoff",
    role: "Cybersecurity Specialist",
    company: "S.H.I.E.L.D.",
    topskills: ["Network Security", "Penetration Testing", "Cryptography"],
    about:
      "Cybersecurity expert with a focus on threat detection and risk management. Strong background in securing enterprise systems against modern cyber threats.",
    expectedCtc: "45 - 70 LPA",
    location: "Moscow, Russia",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Natasha",
  },
  {
    name: "Tony Stark",
    role: "AI/ML Engineer",
    company: "Stark Industries",
    topskills: ["Python", "TensorFlow", "PyTorch"],
    about:
      "AI/ML Engineer with deep expertise in building intelligent systems. Passionate about innovation in machine learning, natural language processing, and computer vision.",
    expectedCtc: "70 - 100 LPA",
    location: "New York, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tony",
  },
  {
    name: "Steve Rogers",
    role: "Project Manager",
    company: "Avengers Initiative",
    topskills: ["Agile", "Scrum", "Leadership"],
    about:
      "Experienced Project Manager with a proven track record in leading cross-functional teams. Skilled at managing resources, timelines, and project risks.",
    expectedCtc: "30 - 45 LPA",
    location: "Brooklyn, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Steve",
  },
  {
    name: "Wanda Maximoff",
    role: "Product Designer",
    company: "VisionTech",
    topskills: ["Figma", "Illustrator", "User Research"],
    about:
      "Product Designer passionate about creating human-centered experiences. Adept at blending creativity with usability to design impactful digital products.",
    expectedCtc: "28 - 42 LPA",
    location: "Sokovia",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Wanda",
  },
  {
    name: "Peter Parker",
    role: "Frontend Developer",
    company: "Parker Web Solutions",
    topskills: ["JavaScript", "React", "Next.js"],
    about:
      "Frontend Developer specializing in modern web technologies. Focused on performance optimization and building user-friendly responsive interfaces.",
    expectedCtc: "20 - 35 LPA",
    location: "Queens, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Peter",
  },
  {
    name: "Carol Danvers",
    role: "Cloud Architect",
    company: "NASA",
    topskills: ["AWS", "Azure", "Kubernetes"],
    about:
      "Cloud Architect with expertise in designing and deploying scalable cloud infrastructures. Skilled in cloud migration, DevOps practices, and system optimization.",
    expectedCtc: "55 - 80 LPA",
    location: "Washington, D.C., United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carol",
  },
  {
    name: "T'Challa",
    role: "Business Analyst",
    company: "Wakanda Tech",
    topskills: ["Business Strategy", "Data Modeling", "Agile"],
    about:
      "Business Analyst with experience in bridging business goals and technology solutions. Strong skills in requirement gathering, stakeholder management, and data-driven decision making.",
    expectedCtc: "32 - 48 LPA",
    location: "Wakanda",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=T'Challa",
  },
];
