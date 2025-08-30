import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindJobs/SearchBar";
import Jobs from "../Components/FindJobs/Jobs";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const FindJobsPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <Header />
      <Divider size="xs" mx="md" />
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Jobs />
      <Footer />
    </div>
  );
};

export default FindJobsPage;
