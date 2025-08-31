import JobSeekerHeader from "../../Components/Header/JobSeekerHeader";
import CompaniesAndCategories from "../../Components/LandingPage/CompaniesAndCategories";
import HowItWorks from "../../Components/LandingPage/Howitworks";
import Landing from "../../Components/LandingPage/landing";

const JobSeekerDashboard = () => {
  return (
    <div>
      <JobSeekerHeader />
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
        <Landing />
        <CompaniesAndCategories />
        <HowItWorks />
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
