import React from "react";
import { Card, Text, Button, Group, Avatar } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";

interface ExperienceCardProps {
  jobTitle?: string;
  organization?: string;
  startYear?: string;
  endYear?: string;
  onAddExperience?: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  jobTitle = "Job Title",
  organization = "Organization",
  startYear = "2023",
  endYear = "present",
  onAddExperience,
}) => {
  return (
   <div className="p-4 w-full max-w-lg border mine-shaft-200 rounded-lg shadow-sm">
      <div className="">
        {/* Header */}
        <div>
          <Text fw={600} size="lg">
            Experience
          </Text>
          <Text size="sm" c="dimmed">
            Showcase your accomplishments and get up to 2X as many profile views and connections
          </Text>
        </div>

        {/* Experience item */}
        <Group gap="sm">
          <Avatar radius="sm" size="lg" color="gray">
            <IconBriefcase size={20} />
          </Avatar>
          <div className="flex flex-col">
            <Text fw={500}>{jobTitle}</Text>
            <Text size="sm" c="dimmed">
              {organization}
            </Text>
            <Text size="sm" c="dimmed">
              {startYear} - {endYear}
            </Text>
          </div>
        </Group>

        {/* Add button */}
        <Button
          variant="outline"
          radius="xl"
          size="sm"
          onClick={onAddExperience}
          className="self-start"
        >
          Add experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceCard;