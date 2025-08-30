import { Button, Divider } from "@mantine/core";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import { IconArrowBack } from "@tabler/icons-react";
import Profile from "../Components/TalentProfile/Profile";

const TalentProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-4">
      <Header />
      <Divider size="xs" mx="md" />
      <Link to="/find-talent" className="my-4 inline-block">
        <Button
          leftSection={<IconArrowBack size={20} />}
          color="yellow"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <Profile
        name="Jarrod Wood"
        role="Software Engineer"
        company="Google"
        topskills={["React", "SpringBoot", "MongoDB"]}
        about="As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences."
        expectedCtc="₹48 - 60 LPA"
        location="New York, United States"
        image="avatar1"
      />
      <Footer />
    </div>
  );
};

export default TalentProfilePage;
