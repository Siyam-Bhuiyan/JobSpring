import Landing from "../Components/LandingPage/landing";
import CompaniesAndCategories from "../Components/LandingPage/CompaniesAndCategories";
import HowItWorks from "../Components/LandingPage/Howitworks";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
     
      <Landing />
      <CompaniesAndCategories />
      <HowItWorks />
      
    </div>
  );
};

export default HomePage;
