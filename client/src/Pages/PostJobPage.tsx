import { Button, Divider } from "@mantine/core";
import PostJobForm from "../Components/PostJob/PostJob";

const PostJobPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-4">
      <Divider size="xs" mx="md" />
      <div className="text-3xl p-10 font-bold">
        Post a Job
      </div>
  <PostJobForm />
    </div>
  );
};

export default PostJobPage;
