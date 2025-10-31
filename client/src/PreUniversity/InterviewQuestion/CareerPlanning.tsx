import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, BookOpen, Brain, Target, Compass, ChevronRight, BarChart, Loader2 } from "lucide-react";

// Career Assessment Questions
// Suggested chat questions for quick access
const suggestedQuestions = [
  "Which career paths match my interests and skills?",
  "What subjects should I focus on in high school?",
  "How can I prepare for my chosen career now?",
  "What are the highest-paying careers in my field of interest?",
  "Which universities are best for my chosen major?",
  "What internships or activities should I pursue?",
  "How can I build a strong college application?",
  "What are the emerging career opportunities?",
  "Should I consider gap year programs?",
  "How to choose between multiple career interests?"
];

const assessmentQuestions = [
  {
    id: 1,
    category: "Academic Interests",
    question: "What subjects do you enjoy the most in school?",
    options: ["Mathematics/Physics", "Biology/Chemistry", "Literature/Languages", "Arts/Design", "Computer/Technology"],
  },
  {
    id: 2,
    category: "Learning Style",
    question: "How do you prefer to learn new things?",
    options: ["Hands-on Practice", "Reading/Research", "Visual Learning", "Group Discussion", "Independent Study"],
  },
  {
    id: 3,
    category: "Core Skills",
    question: "Which activities do you excel at?",
    options: ["Problem Solving", "Creative Work", "Communication", "Technical Tasks", "Leadership"],
  },
  {
    id: 4,
    category: "Personal Values",
    question: "What's most important to you in a future career?",
    options: ["High Income", "Work-Life Balance", "Making a Difference", "Innovation", "Job Security"],
  },
  {
    id: 5,
    category: "Work Style",
    question: "How do you prefer to work on projects?",
    options: ["Independently", "In Small Teams", "Leading Others", "Supporting Role", "Flexible Mix"],
  },
  {
    id: 6,
    category: "Environment",
    question: "What type of work environment do you prefer?",
    options: ["Office Setting", "Laboratory/Research", "Outdoor Work", "Remote/Digital", "Mixed Environment"],
  },
  {
    id: 7,
    category: "Career Impact",
    question: "What kind of impact do you want to make?",
    options: ["Solve Problems", "Help Others", "Create/Innovate", "Lead Change", "Build/Develop"],
  },
  {
    id: 8,
    category: "Future Goals",
    question: "Where do you see yourself in 10 years?",
    options: ["Leading a Team", "Research/Innovation", "Entrepreneurship", "Teaching/Mentoring", "Expert in Field"],
  }
];

const CareerPlanning = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1-5: questions, 6: chat
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);

    const generateAiResponse = useCallback(async () => {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const modelName = "gemini-2.5-flash-preview-09-2025";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const userProfile = Object.entries(answers).map(([id, answer]) => {
      const question = assessmentQuestions.find(q => q.id === parseInt(id));
      return `${question?.category}: ${answer}`;
    }).join("\\n");

    const prompt = `As an expert career counselor for pre-university and college students, analyze this student's profile and suggest suitable college majors and career paths. Consider their interests, skills, values, preferred work environment, and long-term goals.

Student Profile:
${userProfile}

Please provide:
1. Top 3 recommended college majors with detailed explanations
2. Potential career paths for each major
3. Required skills and subjects to focus on during pre-university/high school
4. Industry outlook and future opportunities
5. Specific next steps for preparation (courses, activities, certifications)
6. Tips for college applications in these fields

Keep the response encouraging, practical, and focused on actionable steps they can take now.`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I apologize, but I couldn't generate specific recommendations. Please try again or rephrase your answers.";
      
      setAiResponse(suggestion);
      setChatHistory([
        { role: "assistant", content: "Based on your assessment, here's my analysis:\\n\\n" + suggestion }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setAiResponse("I apologize, but I encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [answers]);

  const handleChatSend = async () => {
    if (!chatInput.trim() || isLoading) 
      return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const modelName = "gemini-2.5-flash-preview-09-2025";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const context = `Previous assessment results:
${Object.entries(answers).map(([id, answer]) => {
  const question = assessmentQuestions.find(q => q.id === parseInt(id));
  return `${question?.category}: ${answer}`;
}).join("\\n")}

Previous chat history:
${chatHistory.map(msg => `${msg.role}: ${msg.content}`).join("\\n")}

New user question: ${userMessage}

As a career counselor for pre-university students, provide specific, actionable advice based on the student's profile and question. Focus on practical steps they can take now to prepare for their chosen field.`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: context }] }]
        })
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I apologize, but I couldn't generate a response. Please try again or rephrase your question.";
      
      setChatHistory(prev => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: "I apologize, but I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-mine-shaft-900 rounded-2xl shadow-xl"
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-green-400">Career Path Discovery</h1>
        <p className="text-gray-300">
          Not sure about your college major or career path? Let's help you discover the perfect fit for your future.
          Answer a few questions about your interests and preferences, and our AI counselor will provide
          personalized recommendations for your academic and career journey.
        </p>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="p-4 bg-mine-shaft-800 rounded-lg">
            <Brain className="w-8 h-8 text-green-400 mb-2" />
            <h3 className="font-semibold text-green-400">Personalized Analysis</h3>
            <p className="text-sm text-gray-400">Get insights based on your unique profile</p>
          </div>
          <div className="p-4 bg-mine-shaft-800 rounded-lg">
            <Target className="w-8 h-8 text-green-400 mb-2" />
            <h3 className="font-semibold text-green-400">Clear Direction</h3>
            <p className="text-sm text-gray-400">Discover suitable majors and careers</p>
          </div>
          <div className="p-4 bg-mine-shaft-800 rounded-lg">
            <Compass className="w-8 h-8 text-green-400 mb-2" />
            <h3 className="font-semibold text-green-400">Expert Guidance</h3>
            <p className="text-sm text-gray-400">Get AI-powered career counseling</p>
          </div>
          <div className="p-4 bg-mine-shaft-800 rounded-lg">
            <BarChart className="w-8 h-8 text-green-400 mb-2" />
            <h3 className="font-semibold text-green-400">Industry Insights</h3>
            <p className="text-sm text-gray-400">Learn about job market trends</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentStep(1)}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
        >
          Start Assessment <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderQuestion = () => {
    const question = assessmentQuestions[currentStep - 1];
    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto p-6 bg-mine-shaft-900 rounded-2xl shadow-xl"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-green-400">{question.category}</h2>
          </div>
          <p className="text-xl text-gray-200">{question.question}</p>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setAnswers(prev => ({ ...prev, [question.id]: option }));
                  if (currentStep < assessmentQuestions.length) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    setCurrentStep(assessmentQuestions.length + 1);
                  }
                }}
                className="w-full p-4 text-left bg-mine-shaft-800 hover:bg-mine-shaft-700 rounded-lg transition-colors flex items-center justify-between group"
              >
                <span className="text-gray-300 group-hover:text-white">{option}</span>
                <ChevronRight className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Question {currentStep} of {assessmentQuestions.length}</span>
            <span>{Math.round((currentStep / assessmentQuestions.length) * 100)}% complete</span>
          </div>
          <div className="w-full bg-mine-shaft-800 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / assessmentQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  const handleSuggestedQuestion = (question: string) => {
    setChatInput(question);
    handleChatSend();
  };

  const renderChat = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto p-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Suggested Questions Sidebar */}
        <div className="lg:col-span-1 bg-mine-shaft-900 rounded-2xl shadow-xl p-4 h-fit">
          <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" /> Suggested Questions
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full p-3 text-left text-sm bg-mine-shaft-800 hover:bg-mine-shaft-700 text-gray-300 hover:text-white rounded-lg transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3 bg-mine-shaft-900 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-4 bg-green-600 text-white font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Career Advisor
            </div>
            <div className="text-sm text-green-100">Based on {assessmentQuestions.length} factor analysis</div>
          </div>
          
          <div className="flex-1 h-[60vh] overflow-y-auto p-4 space-y-4">
            {/* Assessment Summary */}
            {chatHistory.length === 1 && (
              <div className="bg-mine-shaft-800/50 rounded-lg p-4 mb-4 text-sm text-gray-300">
                <h4 className="text-green-400 font-semibold mb-2">Your Profile Summary:</h4>
                {Object.entries(answers).map(([id, answer]) => {
                  const question = assessmentQuestions.find(q => q.id === parseInt(id));
                  return (
                    <div key={id} className="flex items-start gap-2 mb-1">
                      <span className="text-green-400">{question?.category}:</span>
                      <span>{answer}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Chat Messages */}
            {chatHistory.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-[85%] p-4 rounded-xl shadow-md whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "ml-auto bg-green-600 text-white"
                    : "bg-mine-shaft-800 text-gray-200"
                }`}
              >
                {msg.content}
              </motion.div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 p-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing your profile and generating personalized advice...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-mine-shaft-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChatSend()}
                placeholder="Ask about majors, careers, preparation steps, or click suggested questions..."
                className="flex-1 p-3 rounded-lg bg-mine-shaft-800 text-white border border-mine-shaft-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
              <button
                onClick={handleChatSend}
                disabled={!chatInput.trim() || isLoading}
                className={`p-3 rounded-lg transition-colors flex items-center gap-2 ${
                  chatInput.trim() && !isLoading
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-mine-shaft-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Press Enter to send. Use Shift + Enter for new line.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // When all questions are answered, generate AI response and move to chat
  useEffect(() => {
    if (currentStep === assessmentQuestions.length + 1) {
      generateAiResponse();
    }
  }, [currentStep, generateAiResponse]);

  return (
    <div className="min-h-screen bg-mine-shaft-950 p-8">
      {currentStep === 0 && renderIntro()}
      {currentStep > 0 && currentStep <= assessmentQuestions.length && renderQuestion()}
      {currentStep > assessmentQuestions.length && renderChat()}
    </div>
  );
};

export default CareerPlanning;
