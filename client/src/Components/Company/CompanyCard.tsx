import React from "react";
import { Badge, Text, Avatar, Divider } from "@mantine/core";
import { IconBuildingFactory, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface CompanyCardProps {
  id: string | number;
  logo: string;
  name: string;
  job: string[];
  location: string;
  employees: number;
  description: string;
  industry?: string;
  founded?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  logo,
  name,
  location,
  employees,
  description,
  industry,
  founded,
}) => {
  return (
    <Link to={`/company-details/${id}`} className="block no-underline">
      <div
        className="flex-4 cursor-pointer 
                   aspect-[4/3] w-full max-w-sm 
                   bg-mine-shaft-900 rounded-2xl p-6 shadow-md 
                   hover:border border-bright-sun-400
                   transition-transform duration-500 ease-in-out
                   hover:shadow-xl hover:scale-105"
      >
        {/* Top Section */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <Avatar src={logo} size={50} radius="md" />
            <div>
              <div className="text-lg font-semibold">{name}</div>
              <Text size="sm" className="text-gray-500">
                {employees.toLocaleString()} Employees
              </Text>
            </div>
          </div>
          <IconBuildingFactory className="text-gray-400 hover:text-blue-500 cursor-pointer" />
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-3">
          {industry && (
            <Badge color="violet" radius="sm" variant="filled">
              {industry}
            </Badge>
          )}
          {founded && (
            <Badge color="blue" radius="sm" variant="filled">
              Founded {founded}
            </Badge>
          )}
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
        <div className="mt-3 flex justify-between items-center">
          <Text size="sm" className="text-gray-400 flex items-center gap-1">
            <IconMapPin size={16} /> {location}
          </Text>
          <Text size="sm" className="text-gray-400">
            {employees.toLocaleString()} Employees
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
