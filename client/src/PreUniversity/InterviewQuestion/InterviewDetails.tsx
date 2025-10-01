import { Link } from "react-router-dom";

const InterviewDetails = (props: any) => {
  return (
    <div className="p-10 mb-4 ">
      <div className="p-6 bg-mine-shaft-900 rounded-xl shadow-md w-full  mx-auto">
        <h2 className="text-xl font-bold text-mine-shaft-100 mb-3">
          {props.question}
        </h2>
        <p className="text-mine-shaft-300 mb-5">{props.description}</p>
        <Link to="/mock-test">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg">
            Start Mock Test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewDetails;
