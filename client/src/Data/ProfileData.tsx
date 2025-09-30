import { IconBriefcase, IconMapPin } from "@tabler/icons-react";

const fields = [
  {
    label: "Name",
    placeholder: "Enter your name",
    options:["Designer", "Developer", "Manager", "Intern", "Consultant", "Engineer", "Analyst", "Administrator", "Coordinator", "Specialist", "Director", "Architect", "Strategist", "Technician", "Supervisor", "Planner", "Advisor", "Facilitator", "Liaison", "Controller"],
    value:"Software Engineer",
  },
  {
    label: "Company",
    placeholder: "Enter your company",
    options:["Google", "Facebook", "Amazon", "Apple", "Microsoft", "Netflix", "Tesla", "SpaceX", "IBM", "Intel", "Oracle", "Salesforce", "Adobe", "Uber", "Airbnb", "Twitter", "Snapchat", "LinkedIn", "Reddit", "Spotify"],
    value: "Google",
    leftSection: IconBriefcase,
  },
  {
    label: "Location",
    placeholder: "Enter your location",
    options:["Wakanda", "USA", "UK", "India", "Germany", "Canada", "Australia", "France", "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Japan", "China", "Brazil", "Mexico"],
    value: "Wakanda",
    leftSection: IconMapPin,
  }
];
export default fields;