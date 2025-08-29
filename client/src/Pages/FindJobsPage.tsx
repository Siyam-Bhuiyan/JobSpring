import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindJobs/SearchBar";

const FindJobsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">    
       <Divider size="xs" mx="md" />
      <SearchBar />
    </div>
  );
};

export default FindJobsPage;
