import { Divider } from "@mantine/core";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import SearchBar from "../Components/FindTalent/SearchBar";
import Talents from "../Components/FindTalent/Talents";

const FindTalent = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <Header />
      <Divider size="xs" mx="md" />
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Talents />
      <Footer />
    </div>
  );
};

export default FindTalent;
