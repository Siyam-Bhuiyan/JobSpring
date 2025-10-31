import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, BookOpen, Brain, Target, Compass, ChevronRight, BarChart, 
  Loader2, Sparkles, MessageSquare, Zap, TrendingUp, Award,
  Clock, Users, Lightbulb, FileText, ChevronDown, X, Home
} from "lucide-react";

// Suggested questions
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

// Assessment questions
const assessmentQuestions = [
  {
    id: 1,
    category: "Academic Interests",
    question: "What subjects do you enjoy the most in school?",
    options: ["Mathematics/Physics", "Biology/Chemistry", "Literature/Languages", "Arts/Design", "Computer/Technology"],
    icon: BookOpen
  },
  {
    id: 2,
    category: "Learning Style",
    question: "How do you prefer to learn new things?",
    options: ["Hands-on Practice", "Reading/Research", "Visual Learning", "Group Discussion", "Independent Study"],
    icon: Brain
  },
  {
    id: 3,
    category: "Core Skills",
    question: "Which activities do you excel at?",
    options: ["Problem Solving", "Creative Work", "Communication", "Technical Tasks", "Leadership"],
    icon: Award
  },
  {
    id: 4,
    category: "Personal Values",
    question: "What's most important to you in a future career?",
    options: ["High Income", "Work-Life Balance", "Making a Difference", "Innovation", "Job Security"],
    icon: Target
  },
  {
    id: 5,
    category: "Work Style",
    question: "How do you prefer to work on projects?",
    options: ["Independently", "In Small Teams", "Leading Others", "Supporting Role", "Flexible Mix"],
    icon: Users
  },
  {
    id: 6,
    category: "Environment",
    question: "What type of work environment do you prefer?",
    options: ["Office Setting", "Laboratory/Research", "Outdoor Work", "Remote/Digital", "Mixed Environment"],
    icon: Compass
  },
  {
    id: 7,
    category: "Career Impact",
    question: "What kind of impact do you want to make?",
    options: ["Solve Problems", "Help Others", "Create/Innovate", "Lead Change", "Build/Develop"],
    icon: TrendingUp
  },
  {
    id: 8,
    category: "Future Goals",
    question: "Where do you see yourself in 10 years?",
    options: ["Leading a Team", "Research/Innovation", "Entrepreneurship", "Teaching/Mentoring", "Expert in Field"],
    icon: Lightbulb
  }
];

interface CareerSummary {
  majors: string[];
  skills: { name: string; level: number }[];
  suggestedCourses: string[];
  industryTrends: string[];
}

const CareerPlanning: React.FC = () => {
  const [mode, setMode] = useState<"home" | "assessment" | "quick-chat" | "results">("home");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [careerSummary, setCareerSummary] = useState<CareerSummary | null>(null);

  interface CareerSummary {
  majors: string[];
  skills: { name: string; level: number }[];
  suggestedCourses: string[];
  industryTrends: string[];
}

const generateAiResponse = useCallback(async (includeAssessment: boolean = true) => {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key is missing. Please check your environment variables.');
      setChatHistory([{ 
        role: "assistant", 
        content: "I apologize, but I'm unable to generate recommendations at the moment. Please ensure the API key is configured correctly." 
      }]);
      setIsLoading(false);
      return;
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    console.log("Starting API call...");
    

    let prompt = "";
    
    if (includeAssessment && Object.keys(answers).length > 0) {
      const userProfile = Object.entries(answers).map(([id, answer]) => {
        const question = assessmentQuestions.find(q => q.id === parseInt(id));
        return `${question?.category}: ${answer}`;
      }).join("\n");

      prompt = `You are an expert career counselor for pre-university and college students. Analyze this student's profile carefully and provide detailed career guidance. Base your recommendations on their specific interests, skills, and preferences.

Student Profile:
${userProfile}

FORMAT YOUR RESPONSE EXACTLY AS FOLLOWS (including emojis and sections):

## 🎯 Top 3 Recommended Majors

### 1. [Major Name]
**Why This Fits:** [Explain alignment with their profile]
**Career Paths:** [List 4-5 specific careers]
**Salary Range:** [Entry to senior level]
**Growth Outlook:** [Industry trends]

### 2. [Major Name]
[Same structure]

### 3. [Major Name]
[Same structure]

## 📚 Academic Preparation
- Specific courses to take now
- Skills to develop
- Extracurricular activities
- Online resources and certifications

## 🚀 Next Steps (Next 6-12 Months)
1. Immediate actions
2. Short-term goals
3. Resources to explore

## 💡 College Application Tips
- How to showcase your strengths
- Essay topic suggestions
- Portfolio recommendations

Keep the response motivating, specific, and actionable. Use emojis to make it engaging.`;
    }

    try {
      console.log("Sending request with prompt:", prompt);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }],
            role: "user"
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const suggestion = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I apologize, but I couldn't generate specific recommendations. Please try again.";
      
      setChatHistory([
        { role: "assistant", content: suggestion }
      ]);
      setMode("results");
      
      // Extract detailed career summary
      const majors = suggestion.match(/###\s*\d\.\s*\*\*?([^*\n]+)\*\*?/g) || [];
      const skillsMatch = suggestion.match(/Skills to develop:(.*?)(?=##|$)/s);
      const coursesMatch = suggestion.match(/Specific courses to take now:(.*?)(?=\n\n|$)/s);
      const trendsMatch = suggestion.match(/Growth Outlook:(.*?)(?=\n\n|$)/s);

      console.log("Extracted data:", {
        majorsCount: majors.length,
        hasSkills: !!skillsMatch,
        hasCourses: !!coursesMatch,
        hasTrends: !!trendsMatch
      });

      setCareerSummary({
        majors: majors.map((m: string) => m.replace(/###\s*\d\.\s*\*\*?/, '').replace(/\*\*?/, '').trim()).slice(0, 3),
        skills: (skillsMatch?.[1]?.match(/[-•]\s*([^\n]+)/g) || [])
          .map((skill: string) => ({
            name: skill.replace(/[-•]\s*/, '').trim(),
            level: Math.random() * 40 + 60 // Simulated proficiency level (60-100)
          })),
        suggestedCourses: (coursesMatch?.[1]?.match(/[-•]\s*([^\n]+)/g) || [])
          .map((course: string) => course.replace(/[-•]\s*/, '').trim()),
        industryTrends: (trendsMatch?.[1]?.match(/[-•]\s*([^\n]+)/g) || [])
          .map((trend: string) => trend.replace(/[-•]\s*/, '').trim())
      });
    } catch (error) {
      console.error('Error in generateAiResponse:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.log("Error details:", errorMessage);
      
      setChatHistory([
        { 
          role: "assistant", 
          content: "I apologize, but I encountered an error while analyzing your profile. " +
                  "This might be due to a network issue or API limitation. Please try again in a moment." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [answers]);

  const handleChatSend = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key is missing. Please check your environment variables.');
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: "I apologize, but I'm unable to process your question at the moment. Please ensure the API key is configured correctly." 
      }]);
      setIsLoading(false);
      return;
    }
    const modelName = "gemini-2.5-flash";
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;

    const hasAssessment = Object.keys(answers).length > 0;
    const context = hasAssessment 
      ? `Previous assessment results:
${Object.entries(answers).map(([id, answer]) => {
  const question = assessmentQuestions.find(q => q.id === parseInt(id));
  return `${question?.category}: ${answer}`;
}).join("\n")}

Chat history:
${chatHistory.slice(-6).map(msg => `${msg.role}: ${msg.content}`).join("\n")}

New user question: ${userMessage}

As a career counselor, provide specific, actionable advice based on the student's profile and question. Be encouraging and practical.`
      : `User question: ${userMessage}

As a career counselor for pre-university students, provide helpful, specific advice. If you need more information about the student's interests to give better advice, ask follow-up questions. Be encouraging and practical.`;

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
        "I apologize, but I couldn't generate a response. Please try again.";
      
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

  const handleSuggestedQuestion = (question: string) => {
    setChatInput(question);
    setTimeout(() => handleChatSend(), 100);
  };

  const resetAssessment = () => {
    setMode("home");
    setCurrentStep(0);
    setAnswers({});
    setChatHistory([]);
    setCareerSummary(null);
  };

  // Home Screen
  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">AI-Powered Career Discovery</span>
        </motion.div>
        
        <h1 className="text-5xl font-bold text-white mb-4">
          Find Your Perfect
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400"> Career Path</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Not sure what to study or which career to pursue? Get personalized recommendations 
          powered by AI in minutes.
        </p>
      </div>

      {/* Method Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Assessment Method */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-green-900/40 to-mine-shaft-900 p-8 rounded-2xl border border-green-500/20 cursor-pointer"
          onClick={() => {
            setMode("assessment");
            setCurrentStep(1);
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <Brain className="w-8 h-8 text-green-400" />
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
              Recommended
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">Complete Assessment</h3>
          <p className="text-gray-400 mb-6">
            Answer 8 quick questions about your interests, skills, and goals. 
            Get a comprehensive career analysis with detailed recommendations.
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Clock className="w-4 h-4 text-green-400" />
              <span>Takes 3-5 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Target className="w-4 h-4 text-green-400" />
              <span>Most accurate results</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <BarChart className="w-4 h-4 text-green-400" />
              <span>Detailed career insights</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            Start Assessment <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Quick Chat Method */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-emerald-900/40 to-mine-shaft-900 p-8 rounded-2xl border border-emerald-500/20 cursor-pointer"
          onClick={() => setMode("quick-chat")}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <MessageSquare className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
              Quick Start
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">Quick Chat</h3>
          <p className="text-gray-400 mb-6">
            Jump straight into conversation with our AI career advisor. 
            Ask anything about careers, majors, or your future plans.
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Instant responses</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Natural conversation</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <span>Flexible guidance</span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            Start Chatting <Zap className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: Brain, title: "AI-Powered", desc: "Advanced career analysis" },
          { icon: Target, title: "Personalized", desc: "Tailored to your profile" },
          { icon: TrendingUp, title: "Up-to-date", desc: "Latest industry trends" },
          { icon: Award, title: "Comprehensive", desc: "Complete career guide" }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-mine-shaft-900 rounded-xl border border-mine-shaft-700"
          >
            <feature.icon className="w-6 h-6 text-green-400 mb-2" />
            <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Assessment Question
  const renderQuestion = () => {
    const question = assessmentQuestions[currentStep - 1];
    const Icon = question.icon;
    
    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-mine-shaft-900 rounded-2xl shadow-2xl overflow-hidden border border-mine-shaft-700">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-green-100 text-sm">Question {currentStep} of {assessmentQuestions.length}</p>
                  <h2 className="text-xl font-bold text-white">{question.category}</h2>
                </div>
              </div>
              <button
                onClick={resetAssessment}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / assessmentQuestions.length) * 100}%` }}
                className="bg-white h-2 rounded-full"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8">
            <h3 className="text-2xl text-white mb-8 font-medium">{question.question}</h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, [question.id]: option }));
                    if (currentStep < assessmentQuestions.length) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      generateAiResponse(true);
                    }
                  }}
                  className="w-full p-5 text-left bg-mine-shaft-800 hover:bg-mine-shaft-700 border-2 border-transparent hover:border-green-500/50 rounded-xl transition-all flex items-center justify-between group"
                >
                  <span className="text-gray-300 group-hover:text-white text-lg">{option}</span>
                  <ChevronRight className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>

            {/* Back Button */}
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="mt-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Previous Question
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Chat Interface
  const renderChat = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Home Button */}
          <button
            onClick={resetAssessment}
            className="w-full p-4 bg-mine-shaft-900 hover:bg-mine-shaft-800 rounded-xl border border-mine-shaft-700 transition-colors flex items-center gap-3 text-gray-300"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          {/* Profile Summary (if assessment completed) */}
          {Object.keys(answers).length > 0 && (
            <div className="bg-mine-shaft-900 rounded-xl shadow-xl p-4 border border-mine-shaft-700">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Your Profile
              </h3>
              <div className="space-y-2 text-xs">
                {Object.entries(answers).slice(0, 4).map(([id, answer]) => {
                  const question = assessmentQuestions.find(q => q.id === parseInt(id));
                  return (
                    <div key={id} className="p-2 bg-mine-shaft-800 rounded">
                      <p className="text-green-400 font-medium">{question?.category}</p>
                      <p className="text-gray-400">{answer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Suggested Questions */}
          <div className="bg-mine-shaft-900 rounded-xl shadow-xl p-4 border border-mine-shaft-700">
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="w-full flex items-center justify-between text-green-400 font-semibold mb-3"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Suggested Questions
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  {suggestedQuestions.slice(0, 6).map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 5 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      disabled={isLoading}
                      className="w-full p-3 text-left text-sm bg-mine-shaft-800 hover:bg-mine-shaft-700 text-gray-300 hover:text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {question}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-mine-shaft-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-mine-shaft-700" style={{ height: 'calc(100vh - 12rem)' }}>
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Career Advisor</h3>
                    <p className="text-green-100 text-sm">
                      {Object.keys(answers).length > 0 
                        ? `Based on ${assessmentQuestions.length}-factor analysis` 
                        : 'Ask me anything about careers'}
                    </p>
                  </div>
                </div>
                
                {careerSummary && (
                  <div className="text-right">
                    <p className="text-xs text-green-100">Career Insights</p>
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-white/20 rounded text-xs">
                        {careerSummary.majors?.length || 0} Majors
                      </div>
                      <div className="px-2 py-1 bg-white/20 rounded text-xs">
                        {careerSummary.skills?.length || 0} Skills
                      </div>
                      <div className="px-2 py-1 bg-white/20 rounded text-xs">
                        {careerSummary.industryTrends?.length || 0} Trends
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Career Insights Panel */}
            {careerSummary && mode === "results" && (
              <div className="p-4 bg-mine-shaft-950 border-b border-mine-shaft-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Skills Chart */}
                  <div className="bg-mine-shaft-900 p-4 rounded-xl border border-mine-shaft-700">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4" /> Key Skills
                    </h4>
                    <div className="space-y-2">
                      {careerSummary.skills.slice(0, 5).map((skill, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-300">{skill.name}</span>
                            <span className="text-green-400">{Math.round(skill.level)}%</span>
                          </div>
                          <div className="h-2 bg-mine-shaft-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industry Trends */}
                  <div className="bg-mine-shaft-900 p-4 rounded-xl border border-mine-shaft-700">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Industry Trends
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {careerSummary.industryTrends.slice(0, 4).map((trend, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Courses */}
                  <div className="bg-mine-shaft-900 p-4 rounded-xl border border-mine-shaft-700">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Recommended Courses
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {careerSummary.suggestedCourses.slice(0, 4).map((course, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-mine-shaft-950 to-mine-shaft-900">
              {chatHistory.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex p-4 bg-green-500/10 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {mode === "quick-chat" ? "Let's Explore Your Career Options" : "Your Career Analysis is Ready!"}
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    {mode === "quick-chat" 
                      ? "Ask me anything about college majors, career paths, or how to prepare for your future."
                      : "Ask me any follow-up questions about your recommendations."}
                  </p>
                </motion.div>
              )}

              {chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                        : "bg-mine-shaft-800 text-gray-200 border border-mine-shaft-700"
                    }`}
                  >
                    <div className="prose prose-invert max-w-none">
                      {msg.content.split('\n').map((line, idx) => (
                        <p key={idx} className="whitespace-pre-wrap mb-2 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-gray-400 p-4 bg-mine-shaft-800 rounded-2xl w-fit border border-mine-shaft-700"
                >
                  <Loader2 className="w-5 h-5 animate-spin text-green-400" />
                  <span>Analyzing and generating personalized advice...</span>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-mine-shaft-700 bg-mine-shaft-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSend();
                    }
                  }}
                  placeholder="Ask about majors, careers, preparation steps..."
                  className="flex-1 p-4 rounded-xl bg-mine-shaft-800 text-white border-2 border-mine-shaft-700 focus:border-green-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChatSend}
                  disabled={!chatInput.trim() || isLoading}
                  className={`p-4 rounded-xl transition-all flex items-center gap-2 ${
                    chatInput.trim() && !isLoading
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                      : "bg-mine-shaft-800 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6"
    >
      {mode === "home" && renderHome()}
      {mode === "assessment" && renderQuestion()}
      {(mode === "quick-chat" || mode === "results") && renderChat()}
    </motion.div>
  );
};

export default CareerPlanning;