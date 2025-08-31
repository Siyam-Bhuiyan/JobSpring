import { Button, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowBack } from "@tabler/icons-react";
import Profile from "../Components/TalentProfile/Profile";
import { motion } from "framer-motion";

const TalentProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] p-4">
      <Divider size="xs" mx="md" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/find-talent" className="my-4 inline-block">
          <Button
            leftSection={<IconArrowBack size={20} />}
            color="green"
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
      </motion.div>
    </div>
  );
};

export default TalentProfilePage;
