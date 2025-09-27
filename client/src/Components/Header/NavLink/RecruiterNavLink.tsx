import { Link, useLocation } from "react-router-dom";

const RecruiterNavLinks = () => {
  const links = [
    { label: "Find Job", href: "/find-job" },
    { label: "Find Employee", href: "/find-talent" },
    { label: "Post Job", href: "/post-job" },
    { label: "Posted Jobs", href: "/posted-jobs" },
    { label: "Job History", href: "/job-history" },

  ];

  const location = useLocation();

  return (
    <div className="flex gap-5 text-white h-full items-center">
      {links.map((link, index) => (
        <div
          key={index} 
          className={`${
            location.pathname === link.href 
              ? "border-t-[3px] border-bright-sun-400 text-bright-sun-400"
              : "border-t-[3px] border-transparent"
          } h-full flex items-center transition-colors duration-300 hover:text-bright-sun-400`}
        >
          <Link to={link.href}>{link.label}</Link>
        </div>
      ))}
    </div>
  );
};

export default RecruiterNavLinks;
