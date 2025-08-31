import { useParams, useNavigate } from "react-router-dom";
import { Badge, Button, Card, Divider } from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconBookmark,
  IconBriefcase,
  IconClock,
  IconMapPin,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { companyData } from "../Data/CompanyData";
import RecommandedCompany from "../Components/Company/RecommandedComapny";

const CompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const company = companyData.find((j) => j.id === Number(id));

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2>Company not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] text-white p-5">
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
              {/* Company Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="bg-mine-shaft-700 p-2 rounded-lg">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-12 h-12 rounded"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{company.name}</h2>
                    <p className="text-mine-shaft-400">
                      {company.location} • {company.employees} Employees
                    </p>
                  </div>
                </div>
                <IconBookmark className="w-6 h-6 mt-2 text-bright-sun-400 cursor-pointer" />
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
                  <IconCurrencyDollar className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Salary</p>
                  {/* <p className="font-medium">{company.salary}</p> */}
                </div>
                <div className="flex flex-col items-center">
                  <IconClock className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Job Type</p>
                  {/* <p className="font-medium">{company.jobType}</p> */}
                </div>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-mine-shaft-300">{company.description}</p>
              </div>

              <Divider size="xs" mx="md" className="my-4" />

              {/* Jobs Offered */}
              <div className="mt-6">
                <div className="text-lg font-semibold mb-3">Jobs Offered</div>
                <div className="flex flex-wrap gap-3">
                  {(company.job ?? []).map((job: string, index: number) => (
                    <Badge
                      key={index}
                      variant="light"
                      radius="lg"
                      size="lg"
                      color="blue"
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
