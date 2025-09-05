import { Menu, ScrollArea, Text, Button } from "@mantine/core";
import { IconBell, IconMessage, IconBriefcase, IconAlertCircle } from "@tabler/icons-react";


const NotificationsDropdown = () => {
  // Example notifications
  const notifications = [
    { id: 1, icon: <IconMessage size={16} />, text: "New message from HR" },
    { id: 2, icon: <IconBriefcase size={16} />, text: "Your application was viewed" },
    { id: 3, icon: <IconAlertCircle size={16} />, text: "System update available" },
  ];

  return (
    <Menu shadow="md" width={300} position="bottom-end" withArrow>
      {/* Trigger button */}
      <Menu.Target>
        <div className="bg-crete-900 p-2 rounded-full hover:bg-mine-shaft-800 transition cursor-pointer relative">
          <IconBell size={20} />
          {notifications.length > 0 && (
            <span className=" absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
      </Menu.Target>

      {/* Dropdown */}
      <Menu.Dropdown>
        <Menu.Label>Notifications</Menu.Label>

        <ScrollArea style={{ height: 180 }}>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <Menu.Item key={notif.id}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {notif.icon}
                  {notif.text}
                </span>
              </Menu.Item>
            ))
          ) : (
            <Text size="sm" color="dimmed" className="p-2 text-center">
              No new notifications
            </Text>
          )}
        </ScrollArea>

        <Menu.Divider />
        <Button
          fullWidth
          variant="subtle"
          color="green"
          size="xs"
          onClick={() => console.log("View all notifications")}
        >
          View all
        </Button>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationsDropdown;
