import React from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, MessageSquare, Eye } from 'lucide-react';

interface QuestionCardProps {
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  company?: string;
  position?: string;
  topics?: string[];
  likes?: number;
  answers?: number;
  views?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  title, 
  category, 
  difficulty, 
  company, 
  position,
  topics = [],
  likes = 0,
  answers = 0,
  views = 0
}) => {
  return (
    <div className="px-5 py-3">
      <Link to="/interview-details" className="block">
        <div className="bg-mine-shaft-900 shadow-md hover:shadow-xl cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:bg-mine-shaft-800 border border-mine-shaft-700 hover:border-green-500/20 group">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors mb-2">
                {title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{category}</span>
                {company && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="font-medium text-gray-300">{company}</span>
                  </>
                )}
                {position && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>{position}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Difficulty Badge */}
            <span
              className={`text-xs px-4 py-1.5 rounded-full font-medium ${
                difficulty === "Easy"
                  ? "bg-green-500/10 text-green-400 ring-1 ring-green-500/20"
                  : difficulty === "Medium"
                  ? "bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/20"
                  : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
              }`}
            >
              {difficulty}
            </span>
          </div>

          {/* Topics Tags */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map((topic, index) => (
                <span 
                  key={index}
                  className="text-xs px-2.5 py-1 bg-mine-shaft-800 text-gray-400 rounded-lg border border-mine-shaft-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>{answers}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuestionCard;
