import { Badge, Text, Avatar, Divider, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBookmark,
  IconCalendarMonth,
  IconMapPin,
} from "@tabler/icons-react";
import { Link } from "react-router";

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div
      className="flex-4 cursor-pointer
                 height-96 width-96                  
                 bg-mine-shaft-900 
                 rounded-2xl p-6 shadow-md 
                 "
    >
      {/* Top Section */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <Avatar src={props.image} size={50} radius="xl" />
          <div>
            <div className="text-lg font-semibold">{props.name}</div>
            <Text size="sm" className="text-gray-400">
              {props.role} • {props.company}
            </Text>
          </div>
        </div>
        <IconBookmark className="text-gray-400 hover:text-blue-500 cursor-pointer" />
      </div>

      {/* Skills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {props.topskills.map((skill: string, idx: number) => (
          <Badge key={idx} color="violet" radius="sm" variant="filled">
            {skill}
          </Badge>
        ))}
      </div>

      {/* About */}
      <div className="text-gray-400 text-sm line-clamp-3 mb-6">
        {props.about}
      </div>
      <Divider size="xs" mx="md" />

      <Divider size="xs" mx="md" />

      {/* Bottom Section */}
      <div className="mt-3 mb-4 flex justify-between items-center">
        <Text className="font-bold text-lg ">
          {" "}
          &#x09F3; {props.expectedCtc}
        </Text>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <IconMapPin size={16} />
          {props.location}
        </div>
      </div>

      <Divider size="xs" mx="md" />

      {/* Action Buttons */}
      <div className="mt-5 flex justify-between gap-3 w-full">
        <div
          className="flex-1 
                 transition-transform duration-500 ease-in-out
                 hover:shadow-xl hover:scale-105"
        >
          <Link
            to={`/talent-details/${props.id}`}
            className="block no-underline"
          >
            <Button
              variant="outline"
              color="green"
              radius="md"
              className="flex-1 "
              fullWidth
            >
              Profile
            </Button>
          </Link>
        </div>
        <div
          className="flex-1 
                 transition-transform duration-500 ease-in-out
                 hover:shadow-xl hover:scale-105"
        >
          {props.posted ? (
            <Button
              onClick={open}
              rightSection={<IconCalendarMonth className="w-5 h-5" />}
              variant="light"
              color="green"
              radius="md"
              className="flex-1"
              fullWidth
            >
              Schedule
            </Button>
          ) : (
            <Button
              variant="light"
              color="green"
              radius="md"
              className="flex-1"
              fullWidth
            >
              Message
            </Button>
          )}
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="p-4">
          <Text>Schedule an interview with {props.name}</Text>
          {/* Add your scheduling form or content here */}
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
