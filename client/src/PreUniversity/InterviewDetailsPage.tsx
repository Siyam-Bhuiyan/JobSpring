import { motion } from "framer-motion";
import InterviewDetails from "./InterviewQuestion/InterviewDetails";

const InterviewDetailsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <InterviewDetails
          question="What is React?"
          description="React is a JavaScript library for building UIs"
        />
      </motion.div>
    </div>
  );
};

export default InterviewDetailsPage;
