import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

const apiKey = "";
const modelName = "gemini-2.5-flash-preview-09-2025";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

// --- Career Counselor Context ---
const systemPrompt = `You are an expert career counselor and job search advisor with deep knowledge of:
- Career planning and development
- Industry trends and job market analysis
- Resume and interview preparation
- Skill development recommendations
- Professional growth strategies
- Work-life balance

Provide detailed, practical advice while being encouraging and supportive. Focus on actionable steps and realistic goals.`;

const App = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋! I'm your AI Career Advisor. I can help you with:\n\n" +
        "• Career planning and decisions\n" +
        "• Job search strategies\n" +
        "• Resume and interview tips\n" +
        "• Skill development advice\n" +
        "• Industry insights\n\n" +
        "What would you like guidance on?"
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the message list whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Utility for exponential backoff retry logic
  const fetchWithRetry = async (url, options, maxRetries = 5) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 429 && i < maxRetries - 1) {
            const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    const userMessage = { sender: "user", text: userQuery };
    
    // Optimistic UI update
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      // Use systemInstruction to define the chatbot's persona
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      // Enable Google Search grounding for up-to-date career info
      tools: [{ "google_search": {} }], 
    };

    try {
      const response = await fetchWithRetry(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const candidate = response.candidates?.[0];
      const botText = candidate?.content?.parts?.[0]?.text;
      
      const botMessage = {
        sender: "bot",
        text: botText || "I apologize, but I couldn't generate a response. The API returned an empty result."
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error in Gemini API call:', error);
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "I apologize, but I encountered a connection or API error. Please check your network and try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const Message = ({ msg }) => (
    <div
      className={`p-3 rounded-xl max-w-[80%] md:max-w-[60%] whitespace-pre-wrap shadow-lg transition-all duration-300 ${
        msg.sender === "user"
          ? "ml-auto bg-green-600 text-white rounded-br-none"
          : "mr-auto bg-gray-800 text-gray-100 rounded-tl-none"
      }`}
    >
      {msg.text}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4 font-sans">
      <div className="flex flex-col w-full max-w-lg h-[90vh] bg-gray-900 rounded-2xl shadow-2xl border border-green-700/50">
        
        {/* Header */}
        <div className="bg-green-700 p-4 rounded-t-2xl flex items-center justify-between shadow-lg">
          <h1 className="text-xl font-bold text-white">
            <Send size={20} className="inline mr-2" /> AI Career Advisor
          </h1>
          <span className="text-sm text-green-200">Gemini 2.5 Flash</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 bg-gray-800 text-gray-100 rounded-xl rounded-tl-none shadow-lg">
                <Loader2 size={20} className="animate-spin inline mr-2 text-green-400" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-gray-900 rounded-b-2xl">
          <input
            type="text"
            placeholder={isLoading ? "AI is typing..." : "Ask your career question..."}
            className="flex-1 p-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`p-3 rounded-full transition-all duration-200 ${
              input.trim() && !isLoading 
                ? "bg-green-600 hover:bg-green-500 shadow-green-500/50 shadow-md" 
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;