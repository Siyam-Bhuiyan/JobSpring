// dynamic header based on user role


import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { Avatar, Indicator } from "@mantine/core";
import { IconBell, IconSettings } from "@tabler/icons-react";
import { Briefcase } from "tabler-icons-react";
import AdminNavLinks from "./NavLink/AdminNavLink";
import NavLinks from "./NavLink/NavLink";
import RecruiterNavLinks from "./NavLink/RecruiterNavLink";
import JobSeekerNavLinks from "./NavLink/JobSeekerNavLink";
import { users, type UserData } from "../../Data/UserData";

const Header = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // For example, pick the first user as logged-in
    setUserData(users[0]);   //admin
    //setUserData(users[1]); //job seeker
    //setUserData(users[2]); //recruiter
  }, []);

  const role = userData?.role;
  const name = userData?.name;
  const avatar = userData?.avatar;

  const renderHome = () => {
    switch (role) {
      case "admin":
        return <Link to="/admin">JobSpring</Link>;
      case "job-seeker":
        return <Link to="/job-seeker">JobSpring</Link>;
      case "recruiter":
        return <Link to="/recruiter">JobSpring</Link>;
      default:
        return <Link to="/">JobSpring</Link>;
    }
  };

  const renderNavLinks = () => {
    switch (role) {
      case "admin":
        return <AdminNavLinks />;
      case "job-seeker":
        return <JobSeekerNavLinks />;
      case "recruiter":
        return <RecruiterNavLinks />;
      default:
        return <NavLinks />;
    }
  };

  return (
    <div className="w-full bg-mine-shaft-950 text-white px-6 h-28 flex justify-between items-center">
      {/* Logo */}
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold">{userData ? renderHome() : <Link to="/">JobSpring</Link>}</div>
      </div>

      {/* Role-based navigation */}
      {userData ? renderNavLinks() : <NavLinks />}

      {/* Profile / Login */}
      {userData ? (
        <div className="flex gap-5 items-center">
          <Link
            to="/"
            className="flex gap-3 items-center px-3 py-2 rounded-full hover:bg-mine-shaft-900 transition"
          >
            <div>{name}</div>
            <Avatar src={avatar} alt="Profile Picture" />
          </Link>

          <div className="bg-crete-900 p-2 rounded-full hover:bg-mine-shaft-800 transition">
            <IconSettings />
          </div>

          <div className="bg-crete-900 p-2 hover:bg-mine-shaft-800 transition rounded-full">
            <Indicator color="pink" offset={6} size={8} position="top-end">
              <IconBell />
            </Indicator>
          </div>

          <Link
            to="/login"
            className="p-2 rounded-full text-white hover:bg-mine-shaft-800 transition"
          >
            Log Out
          </Link>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          <Link
            to="/login"
            className="p-2 rounded-full text-white hover:bg-mine-shaft-800 transition"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-bright-sun-500 p-2 rounded-full text-white hover:bg-bright-sun-400 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
