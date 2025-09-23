import { Avatar, Text, Title, ActionIcon, Card, Group } from "@mantine/core";
import { IconMapPin, IconBriefcase, IconPencil } from "@tabler/icons-react";
import { motion } from "framer-motion";
import ExperienceCard from "../Components/Profile/Experience";

const ProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full max-w-3xl -mt-100 px-6">
        <Card className="bg-gray-800 shadow-lg rounded-xl p-6">
          <Group align="center" >
            {/* Avatar */}
            <div className="relative">
              <Avatar
                src="https://avatars.githubusercontent.com/u/9919?v=4"
                size={100}
                radius="50%"
              />
              <ActionIcon
                size="lg"
                radius="xl"
                variant="filled"
                className="absolute bottom-0 right-0 bg-yellow-400 hover:bg-yellow-500"
              >
                <IconPencil size={16} />
              </ActionIcon>
            </div>

            {/* Name and Role */}
            <div>
              <Title order={2} className="text-white">
                Jarrod Wood
              </Title>
              <Group  mt="xs">
                <IconBriefcase size={16} className="text-gray-400" />
                <Text size="sm" color="gray.3">
                  Software Engineer • Google
                </Text>
              </Group>
              <Group mt="xs">
                <IconMapPin size={16} className="text-gray-400" />
                <Text size="sm" color="gray.3">
                  New York, United States
                </Text>
              </Group>
            </div>
          </Group>

          {/* About Section */}
          <div className="mt-6">
            <Group align="center">
              <Title order={4} className="text-white">
                About
              </Title>
              <ActionIcon
                variant="subtle"
                className="hover:bg-gray-700 text-yellow-400"
              >
                <IconPencil size={16} />
              </ActionIcon>
            </Group>
            <Text mt="sm" color="gray.3" size="sm">
              As a Software Engineer at Google, I specialize in building
              scalable and high-performance applications. My expertise lies in
              integrating front-end and back-end technologies to deliver
              seamless user experiences. With a strong foundation in React and
              SpringBoot, and a focus on MongoDB for database solutions, I am
              passionate about leveraging the latest technologies to solve
              complex problems and drive innovation. My goal is to create
              impactful software that enhances productivity and meets user needs
              effectively.
            </Text>
          </div>
          <ExperienceCard />
        </Card>
      </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;





