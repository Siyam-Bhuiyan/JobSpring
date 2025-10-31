import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { categories, companies, topics, difficultyLevels } from './interviewQuestionData';

interface FilterProps {
  onFilterChange: (filters: {
    categories: string[];
    companies: string[];
    topics: string[];
    difficulties: string[];
    searchTerm: string;
  }) => void;
}

const InterviewFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      categories: selectedCategories,
      companies: selectedCompanies,
      topics: selectedTopics,
      difficulties: selectedDifficulties,
      searchTerm
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCompanies([]);
    setSelectedTopics([]);
    setSelectedDifficulties([]);
    setSearchTerm('');
    onFilterChange({
      categories: [],
      companies: [],
      topics: [],
      difficulties: [],
      searchTerm: ''
    });
  };

  return (
    <div className="mb-8">
      {/* Search and Filter Toggle */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search interview questions..."
            className="w-full px-4 py-3 bg-mine-shaft-800 text-white rounded-xl border border-mine-shaft-700 focus:outline-none focus:border-green-500 transition-colors"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange();
            }}
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-mine-shaft-800 text-white rounded-xl border border-mine-shaft-700 hover:bg-mine-shaft-700 transition-colors flex items-center gap-2"
        >
          Filters
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-mine-shaft-900 rounded-2xl border border-mine-shaft-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Filter Questions</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...selectedCategories, category]
                              : selectedCategories.filter(c => c !== category);
                            setSelectedCategories(newCategories);
                            handleFilterChange();
                          }}
                          className="form-checkbox text-green-500 rounded border-mine-shaft-600"
                        />
                        <span className="text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Companies */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Companies</h4>
                  <div className="space-y-2">
                    {companies.map((company) => (
                      <label key={company} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedCompanies.includes(company)}
                          onChange={(e) => {
                            const newCompanies = e.target.checked
                              ? [...selectedCompanies, company]
                              : selectedCompanies.filter(c => c !== company);
                            setSelectedCompanies(newCompanies);
                            handleFilterChange();
                          }}
                          className="form-checkbox text-green-500 rounded border-mine-shaft-600"
                        />
                        <span className="text-gray-300">{company}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Topics</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {topics.map((topic) => (
                      <label key={topic} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedTopics.includes(topic)}
                          onChange={(e) => {
                            const newTopics = e.target.checked
                              ? [...selectedTopics, topic]
                              : selectedTopics.filter(t => t !== topic);
                            setSelectedTopics(newTopics);
                            handleFilterChange();
                          }}
                          className="form-checkbox text-green-500 rounded border-mine-shaft-600"
                        />
                        <span className="text-gray-300">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Difficulty Level</h4>
                  <div className="space-y-2">
                    {difficultyLevels.map((level) => (
                      <label key={level} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedDifficulties.includes(level)}
                          onChange={(e) => {
                            const newDifficulties = e.target.checked
                              ? [...selectedDifficulties, level]
                              : selectedDifficulties.filter(d => d !== level);
                            setSelectedDifficulties(newDifficulties);
                            handleFilterChange();
                          }}
                          className="form-checkbox text-green-500 rounded border-mine-shaft-600"
                        />
                        <span className={`${
                          level === 'Easy' ? 'text-green-400' :
                          level === 'Medium' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {(selectedCategories.length > 0 || selectedCompanies.length > 0 || 
        selectedTopics.length > 0 || selectedDifficulties.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {[...selectedCategories, ...selectedCompanies, ...selectedTopics, ...selectedDifficulties].map((filter) => (
            <span
              key={filter}
              className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full flex items-center gap-1 border border-green-500/20"
            >
              {filter}
              <button
                onClick={() => {
                  setSelectedCategories(prev => prev.filter(c => c !== filter));
                  setSelectedCompanies(prev => prev.filter(c => c !== filter));
                  setSelectedTopics(prev => prev.filter(t => t !== filter));
                  setSelectedDifficulties(prev => prev.filter(d => d !== filter));
                  handleFilterChange();
                }}
                className="ml-1 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewFilter;