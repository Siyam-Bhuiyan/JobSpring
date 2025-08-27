import { Avatar } from "@mantine/core";
import { IconBell, IconSettings } from "@tabler/icons-react";
import { Briefcase } from "tabler-icons-react";

const Header = () => {
  return (
    <div className="w-full bg-pharlap-950 px-6 text-white h-28 flex justify-between items-center">
      <div className="text-crete-400 flex gap-3 items-center ">
        <Briefcase className="h-10 w-10 " />
        <div className="text-2xl font-semibold">JobSpring</div>
      </div>
      <div className="flex gap-5">
        <a href="">Find Job</a>
        <a href="">Find Talent</a>
        <a href="">Upload Jobs</a>
        <a href="">About Us</a>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center">
          <div>Sadia</div>
          <Avatar src={"https://i.pravatar.cc/150?img=3"} alt="Profile Picture" />
        </div>
        <IconSettings/>
        <IconBell/>
      </div>
    </div>
  );
};

export default Header;
