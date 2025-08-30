import { Avatar, Badge, Button, Divider, Text } from "@mantine/core";
import { IconBookmark, IconBriefcase, IconMapPin } from "@tabler/icons-react";
import TalentCard from "../FindTalent/TalentCard";
import Talents from "../FindTalent/Talents";
import RecommandedTalents from "../FindTalent/RecommandedTalents";

interface TalentCardProps {
  name: string;
  role: string;
  company: string;
  topskills: string[];
  about: string;
  expectedCtc: string;
  location: string;
  image: string;
}

const Profile: React.FC<TalentCardProps> = ({
  name,
  role,
  company,
  topskills,
  about,
  expectedCtc,
  location,
  image,
}) => {
  const skills = [
    "React",
    "SpringBoot",
    "MongoDB",
    "HTML",
    "CSS",
    "JavaScript",
    "Node.js",
    "Express",
    "MySQL",
    "Python",
    "Django",
    "Figma",
    "Sketch",
    "Docker",
    "AWS",
  ];
  return (
    <div className="relative">
    <div className="w-2/3 p-5">
      <div className="relative">
        <img
          className="rounded-t-2xl w-full"
          src="src/assets/cover.jpg"
          alt="banner"
        />
        <img
          className="h-48 w-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzfEh8uzY78s2IjM4WlINNSSpnS3DRdGtJTA&s"
          alt="Profile"
        />
      </div>
      <div className="px-3 mt-20">
        <div className="text-3xl font-semibold flex justify-between">
          Jarrod Wood
          <Button color="yellow" variant="light">
            Message
          </Button>
        </div>
        <div className="text-xl flex gap-1 items-center">
          <IconBriefcase className="h-5 w-5" stroke={1.5} /> Software Engineer
          &bull; Google
        </div>
        <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5} /> New york, United
          States
        </div>
      </div>
      <Divider size="xs" mx="md" className="my-4" />
      <div className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5 ">
        <div className="text-lg font-semibold mb-3">About</div>
        <div className="text-sm text-mine-shaft-300">
          As a UX/UI Designer at Adobe, I am dedicated to crafting visually
          compelling and user-centric designs. My expertise in Figma, Sketch,
          and InVision allows me to create intuitive interfaces that enhance
          user experience across digital platforms.
        </div>
      </div>
      <div className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5 ">
        <div className="text-lg font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="filled"
              radius="sm"
              color="green"
              className=" text-black px-3 py-1"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      <div className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5">
        <div className="text-lg font-semibold mb-3">Experience</div>
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
          <div className="text-sm">Jan 2018 - March 2022</div>
        </div>
        <div className="text-gray-400 text-sm line-clamp-3 mb-6">{about}</div>
      </div>
      <div className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5">
        <div className="text-lg font-semibold mb-3">Certifications</div>
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
          <div className="text-sm">Jan 2018 - March 2022</div>
        </div>
        <div className="text-gray-400 text-sm line-clamp-3 mb-6">{about}</div>
      </div>
      <div className="bg-mine-shaft-950 p-6 rounded-xl shadow-md w-full mb-5">
        <div className="text-lg font-semibold mb-3">Resume</div>
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
          <div className="text-sm">Jan 2018 - March 2022</div>
        </div>
        <div className="text-gray-400 text-sm line-clamp-3 mb-6">{about}</div>
      </div>
    </div>
    <div className="w-1/3 p-5 absolute right-0 top-0">
      <RecommandedTalents />
    </div>

    </div>
  );
};

export default Profile;
