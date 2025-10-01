import { Link } from "react-router-dom";

const Result = (props: any) => {
  return (
    <div className="p-8 bg-mine-shaft-900 rounded-xl shadow-lg text-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-white">🎉 Test Completed!</h1>
      <p className="mt-3 text-gray-300">
        You scored <span className="font-semibold text-green-400">{props.score}</span> 
        {" "}out of {props.total}
      </p>
      <div className="mt-5">
        <Link to="/interview-details">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg">
            Retake Test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Result;
