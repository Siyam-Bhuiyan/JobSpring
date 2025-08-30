import { Link } from "react-router-dom";
const Anonymousfeature = () => {
  return (

<div className="flex gap-5 items-center"> 
  <Link
    to="/login"
    className=" p-2 rounded-full text-white hover:bg-mine-shaft-800 transition"
  >
    Log in
  </Link>
  <Link
    to="/register"
    className="bg-bright-sun-500 p-2 rounded-full text-white hover:bg-bright-sun-400 transition"
  >
    Sign Up
  </Link>
</div>

  );
};

export default Anonymousfeature;
