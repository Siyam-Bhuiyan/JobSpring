export interface Company {
  id: number;
  logo: string;
  name: string;
  job: string[];
  location: string;
  employees: number;
  description: string;
}

export const companyData: Company[] = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/google.com",
    name: "Google",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Mountain View, CA, USA",
    employees: 156500,
    description: "Google specializes in Internet-related services and products, including search, advertising, and cloud computing."
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/facebook.com",
    name: "Facebook",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Menlo Park, CA, USA",
    employees: 71970,
    description: "Facebook, now Meta, is a social media and technology company connecting people and communities globally."
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/netflix.com",
    name: "Netflix",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Los Gatos, CA, USA",
    employees: 11400,
    description: "Netflix is a streaming entertainment service offering TV shows, movies, and original content worldwide."
  },
  {
    id: 4,
    logo: "https://logo.clearbit.com/amazon.com",
    name: "Amazon",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Seattle, WA, USA",
    employees: 1608000,
    description: "Amazon is a global e-commerce and cloud computing company providing online retail, AWS, and digital services."
  },
  {
    id: 5,
    logo: "https://logo.clearbit.com/apple.com",
    name: "Apple",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Cupertino, CA, USA",
    employees: 164000,
    description: "Apple designs, manufactures, and markets smartphones, computers, and digital services, including the App Store."
  },
  {
    id: 6,
    logo: "https://logo.clearbit.com/microsoft.com",
    name: "Microsoft",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Redmond, WA, USA",
    employees: 221000,
    description: "Microsoft develops, licenses, and supports software, services, devices, and solutions worldwide."
  },
  {
    id: 7,
    logo: "https://logo.clearbit.com/tesla.com",
    name: "Tesla",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Palo Alto, CA, USA",
    employees: 127855,
    description: "Tesla designs and manufactures electric vehicles, energy storage systems, and solar products."
  },
  {
    id: 8,
    logo: "https://logo.clearbit.com/uber.com",
    name: "Uber",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "San Francisco, CA, USA",
    employees: 35000,
    description: "Uber provides ride-hailing, food delivery, and freight transportation services globally."
  },
  {
    id: 9,
    logo: "https://logo.clearbit.com/airbnb.com",
    name: "Airbnb",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "San Francisco, CA, USA",
    employees: 6146,
    description: "Airbnb operates an online marketplace for lodging, primarily homestays for vacation rentals."
  },
  {
    id: 10,
    logo: "https://logo.clearbit.com/spotify.com",
    name: "Spotify",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Stockholm, Sweden",
    employees: 8800,
    description: "Spotify is a digital music, podcast, and video streaming service offering millions of tracks globally."
  }
];
