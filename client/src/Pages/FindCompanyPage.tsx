import { motion } from "framer-motion";
import SearchBar from "../Components/FindJobs/SearchBar";
import { Divider } from "@mantine/core";
import Company from "../Components/Company/Company";

const FindCompanyPage = () => {
  return (
       <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <Divider size="xs" mx="md" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SearchBar />
        <Divider size="xs" mx="md" />
        <Company />
      </motion.div>
      </div>
  );
};

export default FindCompanyPage;
