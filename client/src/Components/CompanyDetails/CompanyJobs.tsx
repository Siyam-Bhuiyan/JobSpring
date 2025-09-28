import { jobCardList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const CompanyJobs = () => {
  return <div>
    <div className="grid grid-cols-3 gap-6">
            {jobCardList.map(
              (job, index) => index < 6 && <JobCard key={index} {...job} />
            )}
          </div>
  </div>;
};

export default CompanyJobs;
