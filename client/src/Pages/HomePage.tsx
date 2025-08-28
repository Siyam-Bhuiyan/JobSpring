import Landing from "../Components/landing";
import CompaniesAndCategories from "../Components/CompaniesAndCategories";
import HowItWorks from "../Components/Howitworks";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
