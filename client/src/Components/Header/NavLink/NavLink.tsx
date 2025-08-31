import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { label: "Find Job", href: "/login" },
    { label: "Find Employee", href: "/login" },
    { label: "Company", href: "/login" },
    { label: "Blogs", href: "/login" },
  ];
  const location = useLocation();

  return (
    <div className="flex gap-5 text-white h-full items-center">
      {links.map((link, index) => (
        <div
          key={index} 
          className={`${
            location.pathname === link.href 
              ? "border-b-2 border-green-400 text-green-400"
              : "border-b-2 border-transparent"
          } h-full flex items-center transition-colors duration-300 hover:text-green-400`}
        >
          <Link to={link.href}>{link.label}</Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
