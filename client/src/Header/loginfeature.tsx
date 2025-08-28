import { Avatar, Indicator } from "@mantine/core";
import { IconBell, IconSettings } from "@tabler/icons-react";

const Loginfeature = () => {
  return (
    <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center">
          <div>Sadia</div>
          <Avatar
            src={"https://i.pravatar.cc/150?img=3"}
            alt="Profile Picture"
          />
        </div>
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
