import { motion } from "framer-motion";
import InterviewQuestionCard from "./InterviewQuestion/InterviewQuestionCard";
import { Link } from "react-router-dom";
import InterviewFilter from "./InterviewQuestion/InterviewFilter";
import { useState } from "react";
import { interviewQuestions } from "./InterviewQuestion/interviewQuestionData";

const InterviewQuestionsPage = () => {
  const [filteredQuestions, setFilteredQuestions] = useState(interviewQuestions);

  const handleFilterChange = (filters: {
    categories: string[];
    companies: string[];
    topics: string[];
    difficulties: string[];
    searchTerm: string;
  }) => {
    let filtered = [...interviewQuestions];

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        question =>
          question.title.toLowerCase().includes(searchLower) ||
          question.description.toLowerCase().includes(searchLower) ||
          (question.company?.toLowerCase().includes(searchLower) ?? false)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(question =>
        filters.categories.includes(question.category)
      );
    }

    // Apply company filter
    if (filters.companies.length > 0) {
      filtered = filtered.filter(question =>
        question.company && filters.companies.includes(question.company)
      );
    }

    // Apply topic filter
    if (filters.topics.length > 0) {
      filtered = filtered.filter(question =>
        question.topics.some(topic => filters.topics.includes(topic))
      );
    }

    // Apply difficulty filter
    if (filters.difficulties.length > 0) {
      filtered = filtered.filter(question =>
        filters.difficulties.includes(question.difficulty)
      );
    }

    setFilteredQuestions(filtered);
  };

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Interview Questions</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
              Practice Mode
            </button>
            <button className="px-4 py-2 bg-mine-shaft-800 text-white rounded-xl border border-mine-shaft-700 hover:bg-mine-shaft-700 transition-colors">
              Create Question
            </button>
          </div>
        </div>

        <InterviewFilter onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((question, index) => (
            <Link key={index} to={`/interview-details/${question.id}`}>
              <InterviewQuestionCard
                title={question.title}
                category={question.category}
                difficulty={question.difficulty}
                company={question.company}
                topics={question.topics}
                likes={question.likes}
                answers={question.answers}
                views={question.views}
              />
            </Link>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-400 mb-2">No questions found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InterviewQuestionsPage;
