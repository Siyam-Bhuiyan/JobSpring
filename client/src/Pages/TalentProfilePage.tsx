import { Button, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowBack } from "@tabler/icons-react";
import { motion } from "framer-motion";
import ProfilePage from "../Components/TalentProfile/Profile";

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
        <ProfilePage />
      </motion.div>
    </div>
  );
};

export default TalentProfilePage;
