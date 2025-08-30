import { Avatar, Indicator } from "@mantine/core";
import { IconBell, IconSettings } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Loginfeature = () => {
  return (
    <div className="flex gap-5 items-center">
      <Link
        to="/profile"
        className="flex gap-3 items-center px-3 py-2 rounded-full text-white hover:bg-mine-shaft-900 transition"
      >
        <div>Sadia</div>
        <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzfEh8uzY78s2IjM4WlINNSSpnS3DRdGtJTA&s"} alt="Profile Picture" />
      </Link>
      <div className="bg-crete-900 p-2 rounded-full ">
        <IconSettings />
      </div>
      <div className="bg-crete-900 p-2 rounded-full">
        <Indicator color="pink" offset={6} size={8} position="top-end">
          <IconBell />
        </Indicator>
      </div>
    </div>
  );
};

export default Loginfeature;
