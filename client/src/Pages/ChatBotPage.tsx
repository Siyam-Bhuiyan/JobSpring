import { motion } from "framer-motion";
import ChatBot from "../Components/chatBot/ChatBot";

const ChatBotPage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ChatBot />
      </motion.div>
    </div>
  );
};

export default ChatBotPage;
