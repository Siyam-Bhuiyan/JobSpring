import { motion } from "framer-motion";
import Result from "./InterviewQuestion/Result";

const ResultPage = (props: any) => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Result score={props.score} total={props.total} />
      </motion.div>
    </div>
  );
};

export default ResultPage;
