import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconBookmark,
  IconBriefcase,
  IconMapPin,
  IconBuildingFactory,
  IconCalendar,
} from "@tabler/icons-react";
import { companyData } from "../Data/CompanyData";
import RecommandedCompany from "../Components/Company/RecommandedComapny";

const CompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const company = companyData.find((j) => j.id === Number(id));

  if (!company) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center bg-mine-shaft-950 font-[Poppins, sans-serif] p-4">
        <Divider size="xs" mx="md" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Company not found</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Page Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="light"
                color="green"
                onClick={() => navigate(-1)}
              >
                <IconArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
            </div>

            <Card className="bg-mine-shaft-800 border-none p-6 rounded-2xl">
              <div>
                {/* Banner & Avatar */}
                <div className="relative">
                  <img
                    className="rounded-t-2xl w-full h-52 object-cover"
                    src={company.coverImage}
                    alt="banner"
                  />
                  <div className="absolute left-5 -bottom-16 rounded-full h-40 w-40 overflow-hidden bg-mine-shaft-950 border-mine-shaft-950">
                    <Avatar
                      src={company.logo}
                      size={120}
                      radius="xl"
                      className="left-5 -bottom-4 flex justify-center items-center"
                    />
                  </div>
                </div>

                <div className="mt-20 px-3">
                  {/* Name and Message Button */}
                  <div className="text-3xl font-semibold flex justify-between items-center">
                    {company.name}
                    <IconBookmark className="w-6 h-6 mt-2 text-bright-sun-400 cursor-pointer" />
                  </div>
                  {/* Location */}
                  <div className="text-lg flex gap-1 items-center text-mine-shaft-300 mt-1">
                    <div className="flex items-center gap-1">
                      <IconMapPin stroke={1.5} /> {company.location}
                    </div>
                  </div>
                </div>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

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
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-mine-shaft-300">{company.description}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Industry</h3>
                <p className="text-mine-shaft-300">{company.industry}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Website</h3>
                <p className="text-mine-shaft-300"><Link to={company.website} target="_blank">{company.website}</Link>  </p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Size</h3>
                <p className="text-mine-shaft-300">{company.employees}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">HeadQuarter</h3>
                <p className="text-mine-shaft-300">{company.location}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Jobs Offered */}
              <div className="mt-6">
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
            </Card>
          </div>

          {/* Right Section - Recommended Companies */}
          <div className="flex-1 lg:max-w-sm">
            <RecommandedCompany id={company.id} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyDetailsPage;
