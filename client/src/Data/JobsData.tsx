import {
  IconBriefcase,
  IconMapPin,
  IconRecharging,
  IconSearch,
} from "@tabler/icons-react";

// Dropdown filter data
export const dropdownData = [
  {
    title: "Job Title",
    icon: IconSearch,
    options: [
      "Product Designer",
      "Frontend Developer",
      "Backend Engineer",
      "Data Analyst",
      "UI/UX Designer",
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
    title: "Experience",
    icon: IconBriefcase,
    options: ["Entry Level", "Intermediate", "Expert"],
  },
  {
    title: "Job Type",
    icon: IconRecharging,
    options: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"],
  },
];

// Job list data
export const jobList = [
  {
    jobTitle: "Product Designer",
    company: "Meta",
    applicants: 25,
    experience: "Entry Level",
    jobType: "Full Time",
    location: "New York",
    package: "32 LPA",
  },
  {
    jobTitle: "Frontend Developer",
    company: "Google",
    applicants: 40,
    experience: "Intermediate",
    jobType: "Full Time",
    location: "London",
    package: "28 LPA",
  },
  {
    jobTitle: "Backend Engineer",
    company: "Amazon",
    applicants: 18,
    experience: "Expert",
    jobType: "Contract",
    location: "Berlin",
    package: "45 LPA",
  },
  {
    jobTitle: "Data Analyst",
    company: "Microsoft",
    applicants: 30,
    experience: "Entry Level",
    jobType: "Internship",
    location: "Delhi",
    package: "12 LPA",
  },
  {
    jobTitle: "UI/UX Designer",
    company: "Spotify",
    applicants: 22,
    experience: "Intermediate",
    jobType: "Freelance",
    location: "Toronto",
    package: "20 LPA",
  },
];
