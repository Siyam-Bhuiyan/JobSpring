import { Divider } from "@mantine/core";
import PostJobForm from "../Components/PostJob/PostJob";
import { motion } from "framer-motion";

const PostJobPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-4">
      <Divider size="xs" mx="md" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-3xl p-10 font-bold">Post a Job</div>
        <PostJobForm />
      </motion.div>
    </div>
  );
};

export default PostJobPage;
