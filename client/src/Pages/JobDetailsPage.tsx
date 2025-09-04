import { useParams, useNavigate, Link } from "react-router-dom";
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
import { jobCardList } from "../Data/JobsData";
import JobCard from "../Components/FindJobs/JobCard";
import CompanyCard from "../Components/Company/CompanyCard";
import { companyData } from "../Data/CompanyData";

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ✅ Find job by id
  const job = jobCardList.find((j) => j.id === Number(id));
  const company = companyData.find((j) => j.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2>Job not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Divider size="xs" mx="md" />
        <div className="min-h-screen bg-mine-shaft-950 text-white p-6 flex gap-6">
          {/* Left Section - Job Details */}
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
              {/* Job Title Section */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className=" bg-mine-shaft-700 p-2 rounded-lg">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                    <p className="text-mine-shaft-400">
                      {job.company} • {job.posted} • {job.applicants} Applicants
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <Link to={`/apply-job/${job.id}`}>
                  <Button
                    color="green"
                    className=" text-black px-4 py-2 rounded-lg"
                  >
                    Apply
                  </Button>
                  </Link>
                  <IconBookmark className="w-6 h-6 mt-2 text-bright-sun-400 cursor-pointer" />
                </div>
              </div>
              <Divider size="xs" mx="md" className="my-4" />

              {/* Job Info */}
              <div className="grid grid-cols-4 gap-6 mt-6">
                <div className="flex flex-col items-center">
                  <IconMapPin className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div> 
                <div className="flex flex-col items-center">
                  <IconBriefcase className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Experience</p>
                  <p className="font-medium">{job.experience}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconCurrencyDollar className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Salary</p>
                  <p className="font-medium">{job.package}</p>
                </div>
                <div className="flex flex-col items-center">
                  <IconClock className="w-6 h-6 text-bright-sun-400" />
                  <p className="text-mine-shaft-400">Job Type</p>
                  <p className="font-medium">{job.jobType}</p>
                </div>
              </div>
              <Divider size="xs" mx="md" className="my-4" />

              {/* Job Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <p className="text-mine-shaft-300">{job.description}</p>
              </div>
              <Divider size="xs" mx="md" className="my-4" />

              {/* skills */}
              <div className="mt-6">
                <div className="text-lg font-semibold mb-3">
                  Required Skills
                </div>
                <div className="flex flex-wrap gap-3">
                  {(job.skills ?? []).map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="filled"
                      radius="sm"
                      color="violet"
                      className=" text-black px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Divider size="xs" mx="md" className="my-4" />
                  <div>
                    {company && (
                      <CompanyCard
                        id={company.id}
                        logo={job.logo}
                        name={job.company}
                        job={company.job}
                        location={company.location}
                        employees={company.employees}
                        description={company.description}
                      />
                    )}
                  </div>
            </Card>
          </div>
          {/* Right Section - Recommended Jobs */}
          <div className="w-80">
            <h3 className="text-lg font-semibold mb-4">Recommended Jobs</h3>
            <div className="flex flex-col gap-4">
              {jobCardList
                .filter((j) => j.id !== job.id) // exclude current job
                .slice(0, 4) // only 4 jobs
                .map((recommended) => (
                  <JobCard key={recommended.id} {...recommended} />
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetailsPage;
