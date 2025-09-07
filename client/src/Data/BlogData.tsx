export interface Blog {
  id: number;
  category: string;
  time: string;
  title: string;
  image: string;
  upvotes: number;
  comments: number;
  shares: number;
}

export const blogData: Blog[] = [
  {
    id: 1,
    category: "Remote Work",
    time: "6 hr. ago",
    title: "How to Stay Productive While Working From Home",
    image:
      "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 950,
    comments: 210,
    shares: 110,
  },
  {
    id: 2,
    category: "Tech Trends",
    time: "7 hr. ago",
    title: "The Rise of Remote-First Startups in 2025",
    image:
      "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 1750,
    comments: 380,
    shares: 200,
  },
  {
    id: 3,
    category: "Industry Insights",
    time: "1 day ago",
    title: "Why AI Skills Are Becoming Essential in 2025",
    image:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 2000,
    comments: 450,
    shares: 230,
  },
  {
    id: 4,
    category: "Career Growth",
    time: "8 hr. ago",
    title: "5 Soft Skills Every Employer is Looking For",
    image:
      "https://images.pexels.com/photos/3810754/pexels-photo-3810754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 780,
    comments: 180,
    shares: 90,
  },
  {
    id: 5,
    category: "Job Market",
    time: "2 days ago",
    title: "Highest Paying Tech Jobs in 2025",
    image:
      "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 2500,
    comments: 520,
    shares: 300,
  },
  {
    id: 6,
    category: "Upskilling",
    time: "12 hr. ago",
    title: "Best Online Courses to Learn Full Stack Development",
    image:
      "https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 1100,
    comments: 260,
    shares: 130,
  },
  {
    id: 7,
    category: "Work Culture",
    time: "5 hr. ago",
    title: "How Companies are Redefining Work-Life Balance",
    image:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 890,
    comments: 190,
    shares: 95,
  },
  {
    id: 8,
    category: "Career Advice",
    time: "10 hr. ago",
    title: "How to Build a Strong LinkedIn Profile in 2025",
    image:
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 1600,
    comments: 400,
    shares: 180,
  },
  {
    id: 9,
    category: "Freelancing",
    time: "3 days ago",
    title: "Is Freelancing the Future of Work?",
    image:
      "https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 1300,
    comments: 270,
    shares: 140,
  },
  {
    id: 10,
    category: "Career Advice",
    time: "3 hr. ago",
    title: "Top 10 Tips to Ace Your Next Job Interview",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    upvotes: 1200,
    comments: 300,
    shares: 150,
  },
];
