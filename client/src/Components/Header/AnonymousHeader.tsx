import { Briefcase } from "tabler-icons-react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLink/NavLink";

const AnonymousHeader = () => {
  return (
    <div className="w-full bg-mine-shaft-950 text-white px-6  h-28 flex justify-between items-center">
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold ">
          <Link to="/">JobSpring</Link>
        </div>
      </div>
      {NavLinks()}
      <div className="flex gap-5 items-center">
        <div className="flex gap-5 items-center">
          <Link
            to="/login"
            className=" p-2 rounded-full text-white hover:bg-mine-shaft-800 transition"
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
      </div>
    </div>
  );
};

export default AnonymousHeader;