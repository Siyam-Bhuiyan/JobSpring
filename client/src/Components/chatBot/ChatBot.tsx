import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);

    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I got your message: " + input },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="fixed bottom-16 right-24 center w-80 shadow-xl rounded-2xl overflow-hidden bg-mine-shaft-900 text-white flex-1 flex-col border border-mine-shaft-700">
      {/* Header */}
      <div className="bg-green-600 p-4 font-semibold">ChatBot</div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 h-96">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`max-w-[75%] p-3 rounded-lg ${
              msg.sender === "user"
                ? "ml-auto bg-green-500 text-white"
                : "bg-mine-shaft-700 text-gray-200"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-mine-shaft-700 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg bg-mine-shaft-800 border border-mine-shaft-700 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-600 p-2 rounded-lg hover:bg-green-700 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
