import { motion } from "framer-motion";
import PostedJob from "../Components/PostedJobs/PostedJob";
import PostedJobDesc from "../Components/PostedJobs/PostedJobDesc";

const PostedJobsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex gap-5 px-10">
            <PostedJob/>
            <PostedJobDesc/>
        </div>
      </motion.div>
    </div>
  );
};

export default PostedJobsPage;
