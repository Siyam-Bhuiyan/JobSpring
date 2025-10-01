import { motion } from "framer-motion";
import MockTest from "./InterviewQuestion/MockTest";

const MockTestPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MockTest
          questions={[
            {
              question: "What is React?",
              options: ["Library", "Framework", "Language"],
              answer: "Library",
            },
            {
              question: "Who developed React?",
              options: ["Google", "Facebook", "Microsoft"],
              answer: "Facebook",
            },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default MockTestPage;
