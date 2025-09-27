import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Button, Card, Divider, Tabs } from "@mantine/core";
import { motion } from "framer-motion";
import { IconArrowLeft, IconMapPin } from "@tabler/icons-react";
import { companyData } from "../Data/CompanyData";
import RecommandedCompany from "../Components/Company/RecommandedComapny";
import About from "../Components/CompanyDetails/About";
import CompanyJobs from "../Components/CompanyDetails/CompanyJobs";
import CompanyEmployees from "../Components/CompanyDetails/CompanyEmployee";

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
        <div className="flex flex-col xl:flex-row gap-6">
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
              <div className="mb-6">
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
                    <Avatar.Group>
                      <Avatar src="image.png" />
                      <Avatar src="image.png" />
                      <Avatar src="image.png" />
                      <Avatar>+5k</Avatar>
                    </Avatar.Group>
                    {/* <IconBookmark className="w-6 h-6 mt-2 text-bright-sun-400 cursor-pointer" /> */}
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
              <div>
                <Tabs variant="outline" radius="md" defaultValue="about">
                  <Tabs.List className="left-4 [&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                    <Tabs.Tab value="about" className="text-mine-shaft-300">
                      About
                    </Tabs.Tab>
                    <Tabs.Tab value="jobs" className="text-mine-shaft-300">
                      Jobs
                    </Tabs.Tab>
                    <Tabs.Tab value="employees" className="text-mine-shaft-300">
                      Employees
                    </Tabs.Tab>
                  </Tabs.List>
                  <Tabs.Panel value="about" pt="xs">
                    <About company={company} />
                  </Tabs.Panel>
                  <Tabs.Panel value="jobs" pt="xs">
                    <CompanyJobs />
                  </Tabs.Panel>
                  <Tabs.Panel value="employees" pt="xs">
                    <CompanyEmployees />
                  </Tabs.Panel>
                </Tabs>
              </div>
            </Card>
          </div>

          {/* Right Section - Recommended Companies */}
          <div className="flex-1 md:max-w-sm">
            <RecommandedCompany id={company.id} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyDetailsPage;
