import { useEffect, useState } from "react";
import ResultPage from "../ResultPage";
import { Link } from "react-router";

const MockTest = (props: any) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (ans: string) => {
    setAnswers((prev) => [...prev, ans]);

    if (currentQ + 1 < props.questions.length) {
      setCurrentQ((q) => q + 1);
    } else {
      setIsFinished(true);
    }
  };

  // ✅ If finished, show result page
  if (isFinished) {
    const score = answers.filter(
      (a, i) => a === props.questions[i].answer
    ).length;
    return <Link to="/result"><ResultPage score={score} total={props.questions.length} /></Link>;
  }

  // ✅ Ongoing test UI
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif] flex items-center justify-center">
      <div className="p-6 bg-mine-shaft-900 rounded-xl shadow-md max-w-2xl w-full flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="font-bold">Question {currentQ + 1}</h2>
          <span className="font-mono text-red-500">⏱ {timeLeft}s</span>
        </div>
        <p className="text-mine-shaft-300">{props.questions[currentQ].question}</p>
        <div className="flex flex-col gap-2">
          {props.questions[currentQ].options.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="bg-mine-shaft-700 hover:bg-blue-500 px-4 py-2 rounded-lg text-left text-white"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockTest;
