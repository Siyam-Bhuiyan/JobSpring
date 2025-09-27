import { Badge, Divider } from "@mantine/core";
import { IconBriefcase, IconBuildingFactory, IconCalendar, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface Company {
  location: string;
  employees: string | number;
  founded: string | number;
  industry: string;
  description: string;
  website: string;
  job?: string[];
}

interface AboutProps {
  company: Company;
}

const About: React.FC<AboutProps> = ({ company }) => {
  return <div>
     {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="flex flex-col items-center">
                  <IconMapPin className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Location</p>
                  <p className="font-medium">{company.location}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconBriefcase className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Employees</p>
                  <p className="font-medium">{company.employees}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconCalendar className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Founded</p>
                  <p className="font-medium">{company.founded}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconBuildingFactory className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Industry</p>
                  <p className="font-medium">{company.industry}</p>
                </div>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6 pl-4">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-mine-shaft-300">{company.description}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6 pl-4">
                <h3 className="text-lg font-semibold mb-2">Industry</h3>
                <p className="text-mine-shaft-300">{company.industry}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6 pl-4">
                <h3 className="text-lg font-semibold mb-2">Website</h3>
                <p className="text-mine-shaft-300">
                  <Link to={company.website} target="_blank">
                    {company.website}
                  </Link>{" "}
                </p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6 pl-4">
                <h3 className="text-lg font-semibold mb-2">Size</h3>
                <p className="text-mine-shaft-300">{company.employees}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6 pl-4">
                <h3 className="text-lg font-semibold mb-2">HeadQuarter</h3>
                <p className="text-mine-shaft-300">{company.location}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Jobs Offered */}
              <div className="mt-6 pl-4 mb-4">
                <div className="text-lg font-semibold mb-3">Specialities</div>
                <div className="flex flex-wrap gap-3">
                  {(company.job ?? []).map((job: string, index: number) => (
                    <Badge
                      key={index}
                      variant="light"
                      radius="lg"
                      size="lg"
                      color="violet"
                      className="text-black px-3 py-1"
                    >
                      {job}
                    </Badge>
                  ))}
                </div>
              </div>
  </div>;
}

export default About;
