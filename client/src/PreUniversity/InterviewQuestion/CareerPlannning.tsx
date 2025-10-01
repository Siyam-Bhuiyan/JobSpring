import { useState } from "react";
import { motion } from "framer-motion";

const CareerPlanning = () => {
  const [career, setCareer] = useState<any>(null);

  const handleSuggest = (e: any) => {
    e.preventDefault();
    // 🔥 Mock logic: you’ll replace with real AI/DB logic later
    setCareer({
      title: "Data Scientist",
      reason:
        "You mentioned strong interest in AI/ML and skills in Python & Statistics. Data Science is growing rapidly and fits your background.",
      roadmap: [
        "Master Python & SQL",
        "Learn Machine Learning basics",
        "Explore Deep Learning & NLP",
        "Build real-world projects",
        "Apply for Data Analyst / ML Engineer roles",
      ],
    });
  };

  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6">Career Planning</h1>
        <div className="flex gap-8">           
       
        <div className="w-1/3">
          {/* Input Form */}
          <form
            onSubmit={handleSuggest}
            className="bg-mine-shaft-900 p-6 rounded-xl shadow-lg mb-6 space-y-4"
          >
            <div>
              <label className="block mb-2 font-medium">Interests</label>
              <input
                type="text"
                placeholder="e.g. AI/ML, Design, Business"
                className="w-full p-2 rounded bg-mine-shaft-800"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Education</label>
              <select className="w-full p-2 rounded bg-mine-shaft-800">
                <option>High School</option>
                <option>Undergraduate</option>
                <option>Graduate</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Skills</label>
              <input
                type="text"
                placeholder="e.g. Python, Communication, Drawing"
                className="w-full p-2 rounded bg-mine-shaft-800"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg mt-4"
            >
              Suggest Career
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-6">
          {/* Career Suggestion */}
          {career && (
            <div className="bg-mine-shaft-900 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{career.title}</h2>
              <p className="text-gray-300 mb-4">{career.reason}</p>
              <h3 className="font-semibold mb-2">📌 Roadmap:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                {career.roadmap.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
         </div>
      </motion.div>
    </div>
  );
};

export default CareerPlanning;
