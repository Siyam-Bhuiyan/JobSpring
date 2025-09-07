import { motion } from "framer-motion";
import BlogCard from "../Components/Blog/BlogCard";

const BlogsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center p-10 font-bold mb-4 flex-wrap">
          <BlogCard
            subBlog="r/interestingasfuck"
            time="3 hr. ago"
            title="A woman won $43M on a casino but was offered steak dinner instead"
            image="https://images.pexels.com/photos/2693529/pexels-photo-2693529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            upvotes={26000}
            comments={1600}
            shares={800}
          />
          
        </div>
      </motion.div>
    </div>
  );
};

export default BlogsPage;
