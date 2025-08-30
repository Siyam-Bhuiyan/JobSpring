import Landing from "../Components/LandingPage/landing";
import CompaniesAndCategories from "../Components/LandingPage/CompaniesAndCategories";
import HowItWorks from "../Components/LandingPage/Howitworks";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <Header />
      <Landing />
      <CompaniesAndCategories />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default HomePage;
