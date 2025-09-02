// src/data/userdata.tsx
export interface UserData {
  name: string;
  role: "admin" | "job-seeker" | "recruiter" | "pre-university";
  avatar?: string;
}

// Example dummy users
export const users: UserData[] = [
  {
    name: "Alice Johnson",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=alice",
  },
  {
    name: "Bob Smith",
    role: "job-seeker",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=bob",
  },
  {
    name: "Carol Lee",
    role: "recruiter",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=carol",
  },
  {
    name: "David Brown",
    role: "pre-university",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=david",
  }
];
