import Landing from "../Components/LandingPage/landing";
import CompaniesAndCategories from "../Components/LandingPage/CompaniesAndCategories";
import HowItWorks from "../Components/LandingPage/Howitworks";
import AnonymousHeader from "../Components/Header/AnonymousHeader";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div>
      <AnonymousHeader />
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Landing />
          <CompaniesAndCategories />
          <HowItWorks />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
