import { Badge, Tabs } from "@mantine/core";
import JobDetails from "./JobDetails";
import { jobList } from "../../Data/JobsData";
import TalentList from "../FindTalent/TalentList";
import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const PostedJobDesc = () => {
const job = jobList[0];
  if (!job) {
    return (
      <div className="mt-9 w-2/3 px-5">
        <div className="text-2xl font-semibold flex items-center gap-3 mb-2">
          Job not found
        </div>
      </div>
    );
  }
  return (
    <div className="mt-9 w-2/3 px-5">
      <div className="text-2xl font-semibold flex items-center gap-3 mb-2">
        {job.jobTitle}
        <Badge variant="light" ml="sm" color="green" size="sm">
          Badge
        </Badge>
      </div>
      <div className="font-medium text-mine-shaft-300 mb-5">{job.location}</div>
      <div>
        <Tabs variant="outline" radius="md" defaultValue="overview">
          <Tabs.List className="left-4 [&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="overview" className="text-mine-shaft-300">
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="applicants" className="text-mine-shaft-300">
              Applicants
            </Tabs.Tab>
            <Tabs.Tab value="invited" className="text-mine-shaft-300">
              Invited
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview" pt="xs" className="[&>div]:w-full">
            <JobDetails />
          </Tabs.Panel>
          <Tabs.Panel value="applicants" pt="xs">
            <div className="grid grid-cols-2 gap-6">
            {
                talents.map((talent,index) => index<6 && <TalentCard key={index} {...talent} />)
            }
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="invited" pt="xs">
            x
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default PostedJobDesc;
