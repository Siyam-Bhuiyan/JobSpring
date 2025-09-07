import { motion } from "framer-motion";
import BlogList from "../Components/Blog/BlogList";
import Sidebar from "../Components/Blog/SideBar";

const BlogsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex">
          <div className="w-0 lg:w-1/4">
            <Sidebar />
          </div>
          <div className="w-0 lg:w-3/4">
            <BlogList />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogsPage;
