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
  logo: string;
  role: string;
  duration: string;
  description: string;
  location: string;
}

export interface Certification {
  title: string;
  logo: string;
  issuer: string;
  year: string;
  issued: string;
  credentialId: string;
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
        logo: "https://logo.clearbit.com/google.com",
        role: "UX/UI Designer",
        duration: "2018 - Present",
        location: "Los Angeles, United States",
        description: "Designed user-centric interfaces for Adobe Creative Cloud tools.",
      },
    ],
    certifications: [
      {
        title: "Certified UX Designer",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Interaction Design Foundation",
        year: "2020",
        issued: "2020",
        credentialId: "UX123",
      },
      {
        title: "Figma Advanced",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Coursera",
        year: "2021",
        issued: "2021",
        credentialId: "FIGMA123",
      },
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
        logo: "https://logo.clearbit.com/google.com",
        role: "Lead Full Stack Developer",
        duration: "2016 - Present",
        location: "Gotham, United States",
        description: "Architected and developed internal enterprise systems.",
      },
    ],
    certifications: [
      {
        title: "AWS Certified Developer",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Amazon",
        year: "2019",
        issued: "2019",
        credentialId: "AWS123",
      },
      {
        title: "MongoDB Professional",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "MongoDB University",
        year: "2020",
        issued: "2020",
        credentialId: "MONGO123",
      },
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
    about:
      "Data Analyst skilled in data visualization and predictive analytics...",
    expectedCtc: "25 - 40 LPA",
    location: "Metropolis, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Clark",
    coverImage: "https://picsum.photos/id/1021/800/300",
    experienceDetails: [
      {
        company: "Daily Planet",
        logo: "https://logo.clearbit.com/google.com",
        role: "Junior Data Analyst",
        duration: "2022 - Present",
        location: "Metropolis, United States",
        description: "Worked on extracting insights from large news datasets.",
      },
    ],
    certifications: [
      {
        title: "Data Analyst Nanodegree",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Udacity",
        year: "2022",
        issued: "2022",
        credentialId: "DAN123",
      },
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
    about:
      "Cybersecurity expert with a focus on threat detection and risk management.",
    expectedCtc: "45 - 70 LPA",
    location: "Moscow, Russia",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Natasha",
    coverImage: "https://picsum.photos/id/1033/800/300",
    experienceDetails: [
      {
        company: "S.H.I.E.L.D.",
        logo: "https://logo.clearbit.com/google.com",
        role: "Cybersecurity Specialist",
        duration: "2021 - Present",
        location: "Moscow, Russia",
        description:
          "Led red team exercises and strengthened enterprise cyber defenses.",
      },
    ],
    certifications: [
      {
        title: "Certified Ethical Hacker",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "EC-Council",
        year: "2021",
        issued: "2021",
        credentialId: "CEH123",
      },
      {
        title: "CompTIA Security+",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "CompTIA",
        year: "2022",
        issued: "2022",
        credentialId: "CS123",
      },
    ],
    resume: {
      title: "Natasha_Romanoff_Resume.pdf",
      fileUrl: "/resumes/natasha-romanoff.pdf",
    },
  },
  {
    id: 5,
    name: "Tony Stark",
    role: "AI Researcher",
    company: "Stark Industries",
    experience: "10 Years",
    topskills: ["AI", "ML", "Deep Learning"],
    about: "Pioneer in AI systems and futuristic tech innovations.",
    expectedCtc: "80 - 120 LPA",
    location: "Malibu, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Tony",
    coverImage: "https://picsum.photos/id/1050/800/300",
    experienceDetails: [
      {
        company: "Stark Industries",
        logo: "https://logo.clearbit.com/google.com",
        role: "Chief AI Scientist",
        duration: "2013 - Present",
        location: "Malibu, United States",
        description: "Built JARVIS & FRIDAY AI systems.",
      },
    ],
    certifications: [
      {
        title: "MIT AI Certification",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "MIT",
        year: "2012",
        issued: "2012",
        credentialId: "AI123",
      },
    ],
    resume: {
      title: "Tony_Stark_Resume.pdf",
      fileUrl: "/resumes/tony-stark.pdf",
    },
  },
  {
    id: 6,
    name: "Peter Parker",
    role: "Frontend Developer",
    company: "Daily Bugle",
    experience: "2 Years",
    topskills: ["HTML", "CSS", "JavaScript"],
    about: "Frontend engineer passionate about interactive UI experiences.",
    expectedCtc: "20 - 35 LPA",
    location: "Queens, United States",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Peter",
    coverImage: "https://picsum.photos/id/1062/800/300",
    experienceDetails: [
      {
        company: "Daily Bugle",
        logo: "https://logo.clearbit.com/google.com",
        role: "Frontend Developer",
        duration: "2021 - Present",
        location: "Queens, United States",
        description: "Developed user-friendly news web apps.",
      },
    ],
    certifications: [
      {
        title: "React Developer Certification",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Meta",
        year: "2021",
        issued: "2021",
        credentialId: "REACT123",
      },
    ],
    resume: {
      title: "Peter_Parker_Resume.pdf",
      fileUrl: "/resumes/peter-parker.pdf",
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
      logo: "https://logo.clearbit.com/google.com",
      role: "Lead Product Designer",
      duration: "2015 - Present",
      location: "Sokovia",
      description: "Designed and iterated user-friendly products for global clients.",
    },
  ],
  certifications: [
    { title: "Design Thinking Certification", logo: "https://logo.clearbit.com/google.com", issuer: "IDEO U", year: "2018", issued: "2018", credentialId: "DT123" },
    { title: "Advanced UX Research", logo: "https://logo.clearbit.com/google.com", issuer: "Coursera", year: "2019", issued: "2019", credentialId: "UXR123" },
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
      logo: "https://logo.clearbit.com/google.com",
      role: "Frontend Developer",
      duration: "2022 - Present",
      location: "Queens, United States",
      description: "Built responsive websites and optimized UI performance.",
    },
  ],
  certifications: [
    { title: "React Developer", logo: "https://logo.clearbit.com/google.com", issuer: "Meta", year: "2022", issued: "2022", credentialId: "REACT123" },
    { title: "JavaScript Algorithms", logo: "https://logo.clearbit.com/google.com", issuer: "freeCodeCamp", year: "2021", issued: "2021", credentialId: "JS123" },
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
      logo: "https://logo.clearbit.com/google.com",
      role: "Cloud Architect",
      duration: "2021 - Present",
      location: "Washington, D.C., United States",
      description: "Deployed hybrid cloud solutions and managed Kubernetes clusters.",
    },
  ],
  certifications: [
    { title: "AWS Solutions Architect", logo: "https://logo.clearbit.com/google.com", issuer: "Amazon", year: "2021", issued: "2021", credentialId: "AWS123" },
    { title: "Azure Cloud Expert", logo: "https://logo.clearbit.com/google.com", issuer: "Microsoft", year: "2022", issued: "2022", credentialId: "AZURE123" },
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
      logo: "https://logo.clearbit.com/google.com",
      role: "Business Analyst",
      duration: "2020 - Present",
      location: "Wakanda",
      description: "Managed stakeholder requirements and data-driven strategies.",
    },
  ],
  certifications: [
    { title: "Certified Business Analyst Professional", logo: "https://logo.clearbit.com/google.com", issuer: "IIBA", year: "2021", issued: "2021", credentialId: "CBA123" },
    { title: "Agile Business Analyst", logo: "https://logo.clearbit.com/google.com", issuer: "Scrum Alliance", year: "2022", issued: "2022", credentialId: "ABA123" },
  ],
  resume: {
    title: "TChalla_Resume.pdf",
    fileUrl: "/resumes/tchalla.pdf",
  },
}
];

