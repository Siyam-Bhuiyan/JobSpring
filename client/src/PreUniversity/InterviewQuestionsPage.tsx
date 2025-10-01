import { motion } from "framer-motion";
import InterviewQuestionCard from "./InterviewQuestion/InterviewQuestionCard";
import { Link } from "react-router-dom";

const InterviewQuestionsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-3xl p-10 font-bold mb-4 ">Interview Questions</div>
        <Link to="/interview-details">
          <InterviewQuestionCard
            title={"UI UX designer"}
            category={"4"}
            difficulty={"Hard"}
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default InterviewQuestionsPage;
