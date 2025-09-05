import { Menu } from "@mantine/core";
import {
  IconSettings,
  IconUser,
  IconLogout,
  IconFileText,
  IconMoon,
  IconMessage,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useMantineColorScheme } from "@mantine/core";

const SettingsDropdown = () => {
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const handleDarkModeToggle = () => {
    toggleColorScheme(); // switches between light & dark
    console.log(
      `Dark Mode toggled → Now: ${colorScheme === "dark" ? "light" : "dark"}`
    );
  };
  return (
    <Menu shadow="md" width={200}>
      {/* Trigger Button */}
      <Menu.Target>
        <div className="bg-crete-900 p-2 rounded-full hover:bg-mine-shaft-800 transition cursor-pointer">
          <IconSettings size={20} />
        </div>
      </Menu.Target>

      {/* Dropdown Content */}
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>

        <Menu.Item onClick={() => navigate("/profile")}>
          <div className="flex items-center gap-2">
            <IconUser size={16} style={{ marginRight: 8 }} />
            Profile
          </div>
        </Menu.Item>

        <Menu.Item onClick={() => navigate("/messages")}>
          <div className="flex items-center gap-2">
            <IconMessage size={16} style={{ marginRight: 8 }} />
            Message
          </div>
        </Menu.Item>

        <Menu.Item onClick={() => navigate("/resume")}>
          <div className="flex items-center gap-2">
            <IconFileText size={16} style={{ marginRight: 8 }} />
            Resume
          </div>
        </Menu.Item>

        <Menu.Item onClick={handleDarkModeToggle}>
          <div className="flex items-center gap-2">
            <IconMoon size={16} style={{ marginRight: 8 }} />
            {colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
          </div>
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          color="red"
          onClick={() => {
            navigate("/login");
          }}
        >
          <div className="flex items-center gap-2">
            <IconLogout size={16} style={{ marginRight: 8 }} />
            Logout
          </div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SettingsDropdown;
