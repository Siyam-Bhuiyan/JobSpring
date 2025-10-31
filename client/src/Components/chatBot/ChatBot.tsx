import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

// Read API key from Vite env (must be prefixed with VITE_ to be exposed to the client)
const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();
const modelName = "gemini-2.5-flash-preview-09-2025";
const apiUrl = apiKey
  ? `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`
  : null;

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
        if (!url) throw new Error('No API key configured (apiUrl is null)');
        const response = await fetch(url, options);
        if (!response.ok) {
          // Handle 429 with retry/backoff
          if (response.status === 429 && i < maxRetries - 1) {
            const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }

          // Try to extract error details from body for better diagnostics
          let bodyText = '';
          try { bodyText = await response.text(); } catch { /* ignore */ }

          if (response.status === 403) {
            throw new Error(`403 Forbidden from Generative API. Response body: ${bodyText || '[empty]'}\nPossible causes: API not enabled, key restricted, billing disabled, or key not allowed for browser use.`);
          }

          throw new Error(`API request failed with status ${response.status}. Body: ${bodyText}`);
        }
        return response.json();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        // small delay before next try
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!apiUrl) {
      setMessages(prev => [...prev, {
        sender: 'bot',
  text: 'API key is missing or not configured. Please set VITE_GEMINI_API_KEY in the client .env and restart the dev server.\n\nSee README or Google Cloud Console: enable Generative Language API, confirm billing, and set proper key restrictions.'
      }]);
      return;
    }

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
  const msg = (error as Error)?.message || String(error);
      setMessages(prev => [...prev, {
        sender: "bot",
        text: `I apologize, but I encountered an API error: ${msg}\n\nCommon causes: API key missing/disabled, API not enabled for your project, billing disabled, or key restrictions (referer/IP) blocking the request.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const Message = ({ msg }: { msg: { sender: string; text: string } }) => (
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

        {/* API key / configuration warning */}
        {!apiUrl && (
          <div className="bg-red-800 text-red-100 p-3 text-sm">
            API key not found or not configured. Set <code>VITE_GEMINI_API_KEY</code> in the client <code>.env</code> and restart the dev server. Also ensure the Generative Language API is enabled and billing is active in your Google Cloud project.
          </div>
        )}

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