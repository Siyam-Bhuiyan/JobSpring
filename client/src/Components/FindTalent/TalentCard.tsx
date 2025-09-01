import React from "react";
import { Badge, Text, Avatar, Divider, Button } from "@mantine/core";
import { IconBookmark, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router";

interface TalentCardProps {
  id: string | number;
  name: string;
  role: string;
  company: string;
  experience: string;
  topskills: string[];
  about: string;
  expectedCtc: string;
  location: string;
  image: string;
}

const TalentCard: React.FC<TalentCardProps> = ({
  id,
  name,
  role,
  company,
  topskills,
  about, 
  expectedCtc,
  location,
  image,
}) => {
  return (
    <div
      className="flex-4 cursor-pointer                 
                 w-full max-w-sm 
                 bg-mine-shaft-900 
                 rounded-2xl p-6 shadow-md 
                 hover:border border-bright-sun-400
                 transition-transform duration-500 ease-in-out
                 hover:shadow-xl hover:scale-105"
    >
      {/* Top Section */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <Avatar src={image} size={50} radius="xl" />
          <div>
            <div className="text-lg font-semibold">{name}</div>
            <Text size="sm" className="text-gray-400">
              {role} • {company}
            </Text>
          </div>
        </div>
        <IconBookmark className="text-gray-400 hover:text-blue-500 cursor-pointer" />
      </div>

      {/* Skills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {topskills.map((skill, idx) => (
          <Badge key={idx} color="violet" radius="sm" variant="filled">
            {skill}
          </Badge>
        ))}
      </div>

      {/* About */}
      <div className="text-gray-400 text-sm line-clamp-3 mb-6">{about}</div>
      <Divider size="xs" mx="md" />

      <Divider size="xs" mx="md" />

      {/* Bottom Section */}
      <div className="mt-3 flex justify-between items-center">
        <Text className="font-bold text-lg ">
          {" "}
          &#x09F3; {expectedCtc}
        </Text>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <IconMapPin size={16} />
          {location}
        </div>
      </div>
 
      {/* Action Buttons */}
      <div className="mt-5 flex justify-between gap-3">
        <Link to={`/talent-details/${id}`} className="block no-underline">
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
        <Link to="/msg">
        <Button variant="filled" color="green" radius="md" className="flex-1" fullWidth>
          Message
        </Button>
      </Link>
      </div>
    </div>

  );
};

export default TalentCard;
