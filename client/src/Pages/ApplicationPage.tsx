import { motion } from "framer-motion";
import ResumeCard from "../Components/Application/ResumeCard";
import { jobCardList } from "../Data/JobsData";
import { Tabs } from "@mantine/core";
import JobHistoryCard from "../Components/JobHistory/JobHistoryCard";

const ApplicationPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex gap-6 p-5 pb-10">
          <div className="w-1/4">
            <ResumeCard />
          </div>
          <div className="flex-1 space-y-4 bg-mine-shaft-950 rounded-xl shadow-md">
            <Tabs variant="outline" radius="md" defaultValue="applied">
              <Tabs.List className="left-4 [&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="applied" className="text-mine-shaft-300">
                  Applied Jobs
                </Tabs.Tab>
                <Tabs.Tab value="saved" className="text-mine-shaft-300">
                  Saved Jobs
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="applied" pt="xs" className="[&>div]:w-full">
                <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 flex-wrap height-96 width-96 gap-5 mt-5">
                  {jobCardList.map(
                    (job, index) =>
                      index < 4 && (
                        <JobHistoryCard key={index} {...job} applied />
                      )
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="saved" pt="xs">
                <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5 flex-wrap height-96 width-96 gap-5 mt-5">
                  {jobCardList.map(
                    (job, index) =>
                      index < 4 && <JobHistoryCard key={index} {...job} saved />
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationPage;
