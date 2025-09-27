import React from "react";
import { jobCardList } from "../../Data/JobsData"; // import your job data file
import JobCard from "./JobCard";
import { Link } from "react-router-dom";

const JobList: React.FC = () => {
  return (
    <div className="flex justify-center gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-5">
      {jobCardList.map((job) => (
        <Link to={`/job-details/${job.id}`} key={job.id}>
          <JobCard
            id={job.id} 
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
            skills={job.skills}
          />
        </Link>
      ))}
    </div>
  );
};

export default JobList;
