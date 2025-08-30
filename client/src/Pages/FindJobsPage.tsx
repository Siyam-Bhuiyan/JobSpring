import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindJobs/SearchBar";
import Jobs from "../Components/FindJobs/Jobs";

const FindJobsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <Divider size="xs" mx="md" />
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Jobs />
    </div>
  );
};

export default FindJobsPage;
