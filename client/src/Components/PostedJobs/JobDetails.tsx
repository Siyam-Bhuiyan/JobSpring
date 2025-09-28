import { Badge, Button, Card, Divider } from "@mantine/core";
import { IconBriefcase, IconClock, IconCurrencyDollar, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { jobCardList } from "../../Data/JobsData";


const JobDetails = () => {
const job = jobCardList[0];
  return (
    <div>
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
                variant="light"
                color="green"
                className=" text-black px-4 py-2 rounded-lg"
              >
                Edit
              </Button>
            </Link>
            <Link to={`/apply-job/${job.id}`}>
              <Button
                variant="outline"
                color="red"
                className=" text-black px-4 py-2 rounded-lg"
              >
                Delete
              </Button>
            </Link>
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
          <div className="text-lg font-semibold mb-3">Required Skills</div>
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
      </Card>
    </div>
  );
};
export default JobDetails;
