import { blogData } from "../../Data/BlogData";
import BlogCard from "./BlogCard";

const BlogList: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 px-10">
      {blogData.map((post) => (
        <BlogCard
          key={post.id}
          subBlog={post.subBlog}
          time={post.time}
          title={post.title}
          image={post.image}
          upvotes={post.upvotes}
          comments={post.comments}
          shares={post.shares}
        />
      ))}
    </div>
  );
};

export default BlogList;
