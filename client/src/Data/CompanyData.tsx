import { IconMapPin,  IconSearch } from "@tabler/icons-react";

export const dropdownData = [
  {
    title: "Company Title",
    icon: IconSearch,
    options: ["Meta", "Google", "Amazon", "Microsoft", "Spotify"],

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
];

export interface Company {
  id: number;
  logo: string;
  name: string;
  job: string[];
  location: string;
  employees: number;
  website: string;
  industry: string;
  founded: number;
  coverImage: string;
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
    founded: 1998,
    coverImage: "https://picsum.photos/id/1015/800/300",
    website: "https://www.google.com",
    industry: "Technology",
    description: "Google specializes in Internet-related services and products, including search, advertising, and cloud computing."
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/facebook.com",
    name: "Facebook",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Menlo Park, CA, USA",
    employees: 71970,
    founded: 2004,
    coverImage: "https://picsum.photos/id/1016/800/300",
    website: "https://www.facebook.com",
    industry: "Social Media",
    description: "Facebook, now Meta, is a social media and technology company connecting people and communities globally."
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/netflix.com",
    name: "Netflix",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Los Gatos, CA, USA",
    employees: 11400,
    founded: 1997,
    coverImage: "https://picsum.photos/id/1018/800/300",
    website: "https://www.netflix.com",
    industry: "Entertainment",
    description: "Netflix is a streaming entertainment service offering TV shows, movies, and original content worldwide."
  },
  {
    id: 4,
    logo: "https://cdn.worldvectorlogo.com/logos/amazon-dark.svg",
    name: "Amazon",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Seattle, WA, USA",
    employees: 1608000,
    founded: 1994,
    coverImage: "https://picsum.photos/id/1020/800/300",
    website: "https://www.amazon.com",
    industry: "E-commerce",
    description: "Amazon is a global e-commerce and cloud computing company providing online retail, AWS, and digital services."
  },
  {
    id: 5,
    logo: "https://cdn.worldvectorlogo.com/logos/apple-13.svg",
    name: "Apple",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Cupertino, CA, USA",
    employees: 164000,
    founded: 1976,
    coverImage: "https://picsum.photos/id/1021/800/300",
    website: "https://www.apple.com",
    industry: "Technology",
    description: "Apple designs, manufactures, and markets smartphones, computers, and digital services, including the App Store."
  },
  {
    id: 6,
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
    name: "Microsoft",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Redmond, WA, USA",
    employees: 221000,  
    founded: 1975,
    coverImage: "https://picsum.photos/id/1022/800/300",
    website: "https://www.microsoft.com",
    industry: "Technology",
    description: "Microsoft develops, licenses, and supports software, services, devices, and solutions worldwide."
  },
  {
    id: 7,
    logo: "https://logo.clearbit.com/tesla.com",
    name: "Tesla",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Palo Alto, CA, USA",
    employees: 127855,
    founded: 2003,
    coverImage: "https://picsum.photos/id/1023/800/300",
    website: "https://www.tesla.com",
    industry: "Automotive",
    description: "Tesla designs and manufactures electric vehicles, energy storage systems, and solar products."
  },
  {
    id: 8,
    logo: "https://logo.clearbit.com/uber.com",
    name: "Uber",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "San Francisco, CA, USA",
    employees: 35000,
    founded: 2009,
    coverImage: "https://picsum.photos/id/1024/800/300",
    website: "https://www.uber.com",
    industry: "Transportation",
    description: "Uber provides ride-hailing, food delivery, and freight transportation services globally."
  },
  {
    id: 9,
    logo: "https://logo.clearbit.com/airbnb.com",
    name: "Airbnb",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "San Francisco, CA, USA",
    employees: 6146,
    founded: 2008,
    coverImage: "https://picsum.photos/id/1025/800/300",
    website: "https://www.airbnb.com",
    industry: "Hospitality",
    description: "Airbnb operates an online marketplace for lodging, primarily homestays for vacation rentals."
  },
  {
    id: 10,
    logo: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg",
    name: "Spotify",
    job: ["Software Engineer", "Product Manager", "Data Scientist","Full Stack Developer","UX Designer","Frontend Developer","Backend Developer"],
    location: "Stockholm, Sweden",
    employees: 8800,
    founded: 2006,
    coverImage: "https://picsum.photos/id/1026/800/300",
    website: "https://www.spotify.com",
    industry: "Music Streaming",
    description: "Spotify is a digital music, podcast, and video streaming service offering millions of tracks globally."
  }
];
