import React from "react";
import { Badge, Text, Avatar, Divider } from "@mantine/core";
import { IconBookmark, IconCalendar } from "@tabler/icons-react";

interface JobCardProps {
  logo: string;
  jobTitle: string;
  company: string;
  applicants: number;
  experience: string;
  jobType: string;
  location: string;
  description: string;
  package: string;
  posted: string;
}

const JobCard: React.FC<JobCardProps> = ({
  logo,
  jobTitle,
  company,
  applicants,
  experience,
  jobType,
  location,
  description,
  package: salary,
  posted,
}) => {
  return (
  <div
  className="flex-4 cursor-pointer 
             aspect-[4/3]   /* maintains 4:3 ratio */
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
          <Avatar src={logo} size={40} radius="7" />
          <div>
            <div className="text-lg font-semibold">{jobTitle}</div>
            <Text size="sm" className="text-gray-500">
              {company} • {applicants} Applicants
            </Text>
          </div>
        </div>
        <IconBookmark className="text-gray-400 hover:text-blue-500 cursor-pointer" />
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-3">
        <Badge color="violet" radius="sm" variant="filled">
          {experience}
        </Badge>
        <Badge color="blue" radius="sm" variant="filled">
          {jobType}
        </Badge>
        <Badge color="teal" radius="sm" variant="filled">
          {location}
        </Badge>
      </div>

      {/* Description */}
      <div className="text-gray-400 text-sm line-clamp-3 mb-8">
        {description}
      </div>
      <Divider size="xs" mx="md" />

      {/* Bottom Section */}
      <div className="mt-3 flex justify-between">
        <Text className="font-bold text-lg text-blue-600">{salary}</Text>
        <div className="flex gap-4">
          <IconCalendar size={16} className="text-gray-400" />
          <Text size="sm" className="text-gray-400">
            Posted {posted}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
