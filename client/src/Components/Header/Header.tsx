// dynamic header based on user role

import { Link } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { Briefcase } from "tabler-icons-react";
import AdminNavLinks from "./NavLink/AdminNavLink";
import NavLinks from "./NavLink/NavLink";
import RecruiterNavLinks from "./NavLink/RecruiterNavLink";
import JobSeekerNavLinks from "./NavLink/JobSeekerNavLink";
import PreUniversityNavLinks from "../../PreUniversity/PreUniversityNavLink";
import { useAuth } from "../../auth/auth";
import SettingsDropdown from "../Profile/SettingsDropdown";
import NotificationsDropdown from "../Profile/NotificationDropdown";
const Header = () => {
  const { user } = useAuth();

  const role = user?.role;
  const name = user?.name;
  const avatar = "https://via.placeholder.com/40";

  const renderHome = () => {
    switch (role) {
      case "admin":
        return <Link to="/admin">JobSpring</Link>;
      case "user":
        return <Link to="/job-seeker">JobSpring</Link>;
      case "recruiter":
        return <Link to="/recruiter">JobSpring</Link>;
      case "preuniversity":
        return <Link to="/pre-university">JobSpring</Link>;
      default:
        return <Link to="/">JobSpring</Link>;
    }
  };

  const renderNavLinks = () => {
    switch (role) {
      case "admin":
        return <AdminNavLinks />;
      case "user":
        return <JobSeekerNavLinks />;
      case "recruiter":
        return <RecruiterNavLinks />;
      case "preuniversity":
        return <PreUniversityNavLinks />;
      default:
        return <NavLinks />;
    }
  };

  return (
    <div className="sticky top-0 z-50 shadow-md w-full bg-mine-shaft-950 text-white px-6 h-28 flex justify-between items-center">
      {/* Logo */}
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold">
          {user ? renderHome() : <Link to="/">JobSpring</Link>}
        </div>
      </div>

      {/* Role-based navigation */}
      {user ? renderNavLinks() : <NavLinks />}

      {/* Profile / Login */}
      {user ? (
        <div className="flex gap-5 items-center">
          <Link
            to="/profile"
            className="flex gap-3 items-center px-3 py-2 rounded-full hover:bg-mine-shaft-900 transition"
          >
            <div>{name}</div>
            <Avatar src={avatar} alt="Profile Picture" />
          </Link>
          <SettingsDropdown />
          <NotificationsDropdown />
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
