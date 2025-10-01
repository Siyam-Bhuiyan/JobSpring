import React from "react";
import { Link } from "react-router-dom";

interface QuestionCardProps {
  title: string;
  category: string;
  difficulty: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ title, category, difficulty }) => {
  return (
    <div className="px-5">
        <Link to="/interview-details">
    <div
      className="bg-mine-shaft-900  shadow-md hover:shadow-lg cursor-pointer rounded-xl p-5 flex flex-col gap-2 transition"
    >
      <h3 className="text-lg font-semibold text-mine-shaft-100">{title}</h3>
      <p className="text-sm text-mine-shaft-200">Category: {category}</p>
      <span
        className={`text-xs px-3 py-1 rounded-full self-start ${
          difficulty === "Easy"
            ? "bg-green-300 text-green-600"
            : difficulty === "Medium"
            ? "bg-yellow-300 text-yellow-600"
            : "bg-red-300 text-red-600"
        }`}
      >
        {difficulty}
      </span>
    </div>
    </Link>
    </div>
  );
};

export default QuestionCard;
