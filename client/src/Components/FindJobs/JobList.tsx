import React from "react";
import { jobCardList } from "../../Data/JobsData"; // import your job data file
import JobCard from "./JobCard";

const JobList: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 px-10">
      {jobCardList.map((job, index) => (
        <JobCard
          key={index}
          logo={job.logo}
          jobTitle={job.jobTitle}
          company={job.company}
          applicants={job.applicants}
          experience={job.experience}
          jobType={job.jobType}
          location={job.location}
          description={job.description}
          package={job.package}
          posted={job.posted}
        />
      ))}
    </div>
  );
};

export default JobList;
