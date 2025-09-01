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

export interface ExperienceDetail {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Resume {
  title: string;
  fileUrl: string; // could be PDF file link
}

export interface Talent {
  id: number;
  name: string;
  role: string;
  company: string;
  experience: string;
  topskills: string[];
  about: string;
  expectedCtc: string;
  location: string;
  image: string;
  coverImage: string;
  experienceDetails: ExperienceDetail[];
  certifications: Certification[];
  resume: Resume;
}

export const talents: Talent[] = [
  {
    id: 1,
    name: "Diana Prince",
    role: "UX/UI Designer",
    company: "Adobe",
    experience: "5 Years",
    topskills: ["Figma", "Sketch", "InVision"],
    about:
      "As a UX/UI Designer at Adobe, I am dedicated to crafting visually compelling and user-centric designs...",
    expectedCtc: "35 - 50 LPA",
    location: "Los Angeles, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alice",
    coverImage: "https://picsum.photos/id/1015/800/300",
    experienceDetails: [
      {
        company: "Adobe",
        role: "UX/UI Designer",
        duration: "2018 - Present",
        description: "Designed user-centric interfaces for Adobe Creative Cloud tools.",
      },
    ],
    certifications: [
      { name: "Certified UX Designer", issuer: "Interaction Design Foundation", year: "2020" },
      { name: "Figma Advanced", issuer: "Coursera", year: "2021" },
    ],
    resume: {
      title: "Diana_Prince_Resume.pdf",
      fileUrl: "/resumes/diana-prince.pdf",
    },
  },
  {
    id: 2,
    name: "Bruce Wayne",
    role: "Full Stack Developer",
    company: "Wayne Enterprises",
    experience: "7 Years",
    topskills: ["React", "Node.js", "MongoDB"],
    about: "Full Stack Developer with expertise in scalable web applications...",
    expectedCtc: "40 - 60 LPA",
    location: "Gotham, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Bruce",
    coverImage: "https://picsum.photos/id/1011/800/300",
    experienceDetails: [
      {
        company: "Wayne Enterprises",
        role: "Lead Full Stack Developer",
        duration: "2016 - Present",
        description: "Architected and developed internal enterprise systems.",
      },
    ],
    certifications: [
      { name: "AWS Certified Developer", issuer: "Amazon", year: "2019" },
      { name: "MongoDB Professional", issuer: "MongoDB University", year: "2020" },
    ],
    resume: {
      title: "Bruce_Wayne_Resume.pdf",
      fileUrl: "/resumes/bruce-wayne.pdf",
    },
  },
  {
    id: 3,
    name: "Clark Kent",
    role: "Data Analyst",
    company: "Daily Planet",
    experience: "1 Year",
    topskills: ["SQL", "Python", "Tableau"],
    about: "Data Analyst skilled in data visualization and predictive analytics...",
    expectedCtc: "25 - 40 LPA",
    location: "Metropolis, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Clark",
    coverImage: "https://picsum.photos/id/1021/800/300",
    experienceDetails: [
      {
        company: "Daily Planet",
        role: "Junior Data Analyst",
        duration: "2022 - Present",
        description: "Worked on extracting insights from large news datasets.",
      },
    ],
    certifications: [
      { name: "Data Analyst Nanodegree", issuer: "Udacity", year: "2022" },
    ],
    resume: {
      title: "Clark_Kent_Resume.pdf",
      fileUrl: "/resumes/clark-kent.pdf",
    },
  },
  {
    id: 4,
    name: "Natasha Romanoff",
    role: "Cybersecurity Specialist",
    company: "S.H.I.E.L.D.",
    experience: "2 Years",
    topskills: ["Network Security", "Penetration Testing", "Cryptography"],
    about: "Cybersecurity expert with a focus on threat detection and risk management.",
    expectedCtc: "45 - 70 LPA",
    location: "Moscow, Russia",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Natasha",
    coverImage: "https://picsum.photos/id/1033/800/300",
    experienceDetails: [
      {
        company: "S.H.I.E.L.D.",
        role: "Cybersecurity Specialist",
        duration: "2021 - Present",
        description: "Led red team exercises and strengthened enterprise cyber defenses.",
      },
    ],
    certifications: [
      { name: "Certified Ethical Hacker", issuer: "EC-Council", year: "2021" },
      { name: "CompTIA Security+", issuer: "CompTIA", year: "2022" },
    ],
    resume: {
      title: "Natasha_Romanoff_Resume.pdf",
      fileUrl: "/resumes/natasha-romanoff.pdf",
    },
  },
  {
    id: 5,
    name: "Tony Stark",
    role: "AI/ML Engineer",
    company: "Stark Industries",
    experience: "4 Years",
    topskills: ["Python", "TensorFlow", "PyTorch"],
    about: "AI/ML Engineer with deep expertise in building intelligent systems...",
    expectedCtc: "70 - 100 LPA",
    location: "New York, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tony",
    coverImage: "https://picsum.photos/id/1044/800/300",
    experienceDetails: [
      {
        company: "Stark Industries",
        role: "AI/ML Engineer",
        duration: "2019 - Present",
        description: "Developed AI systems for defense and clean energy projects.",
      },
    ],
    certifications: [
      { name: "Deep Learning Specialization", issuer: "Coursera", year: "2020" },
      { name: "TensorFlow Developer Certificate", issuer: "Google", year: "2021" },
    ],
    resume: {
      title: "Tony_Stark_Resume.pdf",
      fileUrl: "/resumes/tony-stark.pdf",
    },
  },
  {
    id: 6,
    name: "Steve Rogers",
    role: "Project Manager",
    company: "Avengers Initiative",
    experience: "6 Years",
    topskills: ["Agile", "Scrum", "Leadership"],
    about: "Experienced Project Manager with a proven track record in leading cross-functional teams.",
    expectedCtc: "30 - 45 LPA",
    location: "Brooklyn, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Steve",
    coverImage: "https://picsum.photos/id/1052/800/300",
    experienceDetails: [
      {
        company: "Avengers Initiative",
        role: "Project Manager",
        duration: "2017 - Present",
        description: "Coordinated global-scale projects and managed diverse teams.",
      },
    ],
    certifications: [
      { name: "PMP Certification", issuer: "PMI", year: "2019" },
      { name: "Scrum Master", issuer: "Scrum Alliance", year: "2020" },
    ],
    resume: {
      title: "Steve_Rogers_Resume.pdf",
      fileUrl: "/resumes/steve-rogers.pdf",
    },
  },
  {
    id: 7,
    name: "Wanda Maximoff",
    role: "Product Designer",
    company: "VisionTech",
    experience: "8 Years",
    topskills: ["Figma", "Illustrator", "User Research"],
    about: "Product Designer passionate about creating human-centered experiences.",
    expectedCtc: "28 - 42 LPA",
    location: "Sokovia",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Wanda",
    coverImage: "https://picsum.photos/id/1069/800/300",
    experienceDetails: [
      {
        company: "VisionTech",
        role: "Lead Product Designer",
        duration: "2015 - Present",
        description: "Designed and iterated user-friendly products for global clients.",
      },
    ],
    certifications: [
      { name: "Design Thinking Certification", issuer: "IDEO U", year: "2018" },
      { name: "Advanced UX Research", issuer: "Coursera", year: "2019" },
    ],
    resume: {
      title: "Wanda_Maximoff_Resume.pdf",
      fileUrl: "/resumes/wanda-maximoff.pdf",
    },
  },
  {
    id: 8,
    name: "Peter Parker",
    role: "Frontend Developer",
    company: "Parker Web Solutions",
    experience: "1 Year",
    topskills: ["JavaScript", "React", "Next.js"],
    about: "Frontend Developer specializing in modern web technologies.",
    expectedCtc: "20 - 35 LPA",
    location: "Queens, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Peter",
    coverImage: "https://picsum.photos/id/1074/800/300",
    experienceDetails: [
      {
        company: "Parker Web Solutions",
        role: "Frontend Developer",
        duration: "2022 - Present",
        description: "Built responsive websites and optimized UI performance.",
      },
    ],
    certifications: [
      { name: "React Developer", issuer: "Meta", year: "2022" },
      { name: "JavaScript Algorithms", issuer: "freeCodeCamp", year: "2021" },
    ],
    resume: {
      title: "Peter_Parker_Resume.pdf",
      fileUrl: "/resumes/peter-parker.pdf",
    },
  },
  {
    id: 9,
    name: "Carol Danvers",
    role: "Cloud Architect",
    company: "NASA",
    experience: "2 Years",
    topskills: ["AWS", "Azure", "Kubernetes"],
    about: "Cloud Architect with expertise in designing scalable cloud infrastructures.",
    expectedCtc: "55 - 80 LPA",
    location: "Washington, D.C., United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Carol",
    coverImage: "https://picsum.photos/id/1084/800/300",
    experienceDetails: [
      {
        company: "NASA",
        role: "Cloud Architect",
        duration: "2021 - Present",
        description: "Deployed hybrid cloud solutions and managed Kubernetes clusters.",
      },
    ],
    certifications: [
      { name: "AWS Solutions Architect", issuer: "Amazon", year: "2021" },
      { name: "Azure Cloud Expert", issuer: "Microsoft", year: "2022" },
    ],
    resume: {
      title: "Carol_Danvers_Resume.pdf",
      fileUrl: "/resumes/carol-danvers.pdf",
    },
  },
  {
    id: 10,
    name: "T'Challa",
    role: "Business Analyst",
    company: "Wakanda Tech",
    experience: "3 Years",
    topskills: ["Business Strategy", "Data Modeling", "Agile"],
    about: "Business Analyst bridging business goals and technology solutions.",
    expectedCtc: "32 - 48 LPA",
    location: "Wakanda",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=TChalla",
    coverImage: "https://picsum.photos/id/1099/800/300",
    experienceDetails: [
      {
        company: "Wakanda Tech",
        role: "Business Analyst",
        duration: "2020 - Present",
        description: "Managed stakeholder requirements and data-driven strategies.",
      },
    ],
    certifications: [
      { name: "Certified Business Analyst Professional", issuer: "IIBA", year: "2021" },
      { name: "Agile Business Analyst", issuer: "Scrum Alliance", year: "2022" },
    ],
    resume: {
      title: "TChalla_Resume.pdf",
      fileUrl: "/resumes/tchalla.pdf",
    },
  },
];

