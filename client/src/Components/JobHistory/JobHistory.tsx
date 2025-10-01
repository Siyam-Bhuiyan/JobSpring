import { Tabs } from "@mantine/core";
import { jobCardList, jobList } from "../../Data/JobsData";
import JobHistoryCard from "./JobHistoryCard";

const JobHistory = () => {
  return (
    <div className="px-10">
      <div>
        <Tabs variant="outline" radius="md" defaultValue="applied">
          <Tabs.List className="left-4 [&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400">
            <Tabs.Tab value="applied" className="text-mine-shaft-300">
              Applied
            </Tabs.Tab>
            <Tabs.Tab value="saved" className="text-mine-shaft-300">
              Saved
            </Tabs.Tab>
            <Tabs.Tab value="offered" className="text-mine-shaft-300">
              Offered
            </Tabs.Tab>
            <Tabs.Tab value="interviewing" className="text-mine-shaft-300">
              Interviewing
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="applied" pt="xs" className="[&>div]:w-full">
            <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 flex-wrap height-96 width-96 gap-5 mt-5">
              {jobList.map((job, index) => (
                <JobHistoryCard key={index} {...job} applied />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="saved" pt="xs">
            <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 flex-wrap height-96 width-96 gap-5 mt-5">
              {jobCardList.map((job, index) => (
                <JobHistoryCard key={index} {...job} saved />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="offered" pt="xs">
            <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 flex-wrap height-96 width-96 gap-5 mt-5">
              {jobCardList.map((job, index) => (
                <JobHistoryCard key={index} {...job} offered />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="interviewing" pt="xs" className="[&>div]:w-full">
            <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 flex-wrap height-96 width-96 gap-5 mt-5">
              {jobCardList.map((job, index) => (
                <JobHistoryCard key={index} {...job} interviewing />
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistory;
