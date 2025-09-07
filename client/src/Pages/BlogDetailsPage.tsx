import { motion } from "framer-motion";
import BlogCard from "../Components/Blog/BlogCard";

const BlogsDetails = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-3xl p-10 font-bold mb-4 ">Blog Details</div>
        {/* <BlogCard category={``} time={""} title={""} image={""} upvotes={0} comments={0} shares={0}  /> */}
      </motion.div>
    </div>
  );
};

export default BlogsDetails;
