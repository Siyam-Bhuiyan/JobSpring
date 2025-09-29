
const ExperienceCard = (props:any) => {
  return (
    <div className="bg-mine-shaft-950 text-white p-5 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          {/* Company Icon */}
          <div className=" bg-mine-shaft-700 p-2 rounded-lg">
            <img
              src={props.logo}
              alt="logo"
              className="w-12 h-12 rounded"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{props.role}</h3>
            <p className="text-sm text-mine-shaft-400">
              {props.company} • {props.location}
            </p>
          </div>
        </div>
        <p className="text-sm text-mine-shaft-400">{props.duration}</p>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-mine-shaft-300">
        {props.description}
      </p>
    </div>
  );
};

export default ExperienceCard;
