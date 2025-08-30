import { Briefcase } from "tabler-icons-react";
import Loginfeature from "./loginfeature";
import Anonymousfeature from "./Anonymousfeature";

const Header = () => {
  return (
    <div className="w-full bg-mine-shaft-950 px-6 text-white h-28 flex justify-between items-center">
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold">
          <a
            href="/"
         >
            JobSpring
          </a>
        </div>
      </div>
      {/* Navigation Links */}
      <div className="flex gap-5">
        <a
          href="/find-job"
          className="transition-colors duration-300 hover:text-bright-sun-400 "
        >
          Find Job
        </a>
        <a
          href="/find-company"
          className="transition-colors duration-300 hover:text-bright-sun-400 "
        >
          Company
        </a>
        <a
          href="/blogs"
          className="transition-colors duration-300 hover:text-bright-sun-400 "
        >
          Blogs
        </a>
        <a
          href="/applications"
          className="transition-colors duration-300 hover:text-bright-sun-400 "
        >
          Applications
        </a>
      </div>
      <div className="flex gap-5 items-center">
        <Loginfeature />
        <Anonymousfeature />
      </div>
    </div>
  );
};

export default Header;
