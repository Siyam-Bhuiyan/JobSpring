import { motion } from "framer-motion";
import BlogList from "../Components/Blog/BlogList";

const BlogsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center p-10 font-bold mb-4 flex-wrap ">
        </div>
          <BlogList />
      </motion.div>
    </div>
  );
};

export default BlogsPage;
