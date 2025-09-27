import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import {activeJobs} from "../../Data/PostedJobsData"


const PostedJob = () => {
  return (
    <div className="w-1/6 mt-5">
      <div className="text-2xl font-semibold mb-5 mt-5">PostedJob</div>
      <div className="flex-1 w-max">
        <Tabs autoContrast color="green" variant="pills" defaultValue="active">
          <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="active" size="sm" className="text-mine-shaft-300">
              Active [4]
            </Tabs.Tab>
            <Tabs.Tab value="draft" size="sm" className="text-mine-shaft-300">
              Draft [1]
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="active" pt="xs">
            <div className="flex flex-col gap-5 mt-2">
            {
                activeJobs.map((item,index)=><PostedJobCard key={index}{...item}/>)
            }
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="draft" pt="xs">
            y
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default PostedJob;
