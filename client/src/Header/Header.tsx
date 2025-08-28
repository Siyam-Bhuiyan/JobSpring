import { Briefcase} from "tabler-icons-react";
import Loginfeature from "./loginfeature";
import Anonymousfeature from "./Anonymousfeature";

const Header = () => {
  return (
    <div className="w-full bg-mine-shaft-950 px-6 text-white h-28 flex justify-between items-center">
      <div className="text-bright-sun-400 flex gap-3 items-center ">
        <Briefcase className="h-10 w-10 " />
        <div className="text-2xl font-semibold">
           <a href="/">JobSpring</a>
        </div>
      </div>   
      <div className="flex gap-5">
        <a href="/find-job">Find Job</a>
        <a href="/find-company">Find Company</a>
        <a href="/blogs">Blogs</a>
        <a href="/applications">Applications</a>
      </div>
      <div className="flex gap-5 items-center">
        <Loginfeature />
        {/* <Anonymousfeature /> */}
      </div>
    </div>
  );
};

export default Header;
