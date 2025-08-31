import { Briefcase } from "tabler-icons-react";
import { Link } from "react-router-dom";
import { Avatar, Indicator } from "@mantine/core";
import { IconBell, IconSettings } from "@tabler/icons-react";
import RecruiterNavLinks from "./NavLink/RecruiterNavLink";

const Header = () => {
  return (
    <div className="w-full bg-mine-shaft-950 text-white px-6  h-28 flex justify-between items-center">
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold ">
          <Link to="/recruiter">JobSpring</Link>
        </div>
      </div>
      {RecruiterNavLinks()}
      <div className="flex gap-5 items-center">
        <div className="flex gap-5 items-center">
          <Link
            to="/profile"
            className="flex gap-3 items-center px-3 py-2 rounded-full  hover:bg-mine-shaft-900 transition"
          >
            <div>Sadia</div>
            <Avatar
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzfEh8uzY78s2IjM4WlINNSSpnS3DRdGtJTA&s"
              }
              alt="Profile Picture"
            />
          </Link>
          <div className="bg-crete-900 p-2 rounded-full hover:bg-mine-shaft-800 transition ">
            <IconSettings />
          </div>
          <div className="bg-crete-900 p-2  hover:bg-mine-shaft-800 transition rounded-full">
            <Indicator color="pink" offset={6} size={8} position="top-end">
              <IconBell />
            </Indicator>
          </div>
          <Link
            to="/"
            className="flex gap-3 items-center px-3 py-2 rounded-full  hover:bg-mine-shaft-900 transition"
          >
           LogOut
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
