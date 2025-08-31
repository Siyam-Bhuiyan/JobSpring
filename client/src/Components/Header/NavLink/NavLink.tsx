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
    <div className="flex gap-5 text-white h-full items-center ">
      {links.map((link, index) => (
        <div
          className={`${
            location.pathname == "/" + link.href
              ? "border-bright-sun-400 text-bright-sun-400 "
              : "border-transparent"
          } border-t-[3px] h-full flex items-center transition-colors duration-300 hover:text-bright-sun-400 `}
        >
          <Link key={index} to={link.href}>
            {link.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
