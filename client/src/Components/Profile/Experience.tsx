import { Button } from "@mantine/core";
import { useState } from "react";
import ExperienceInput from "./ExperienceInput";

const ExperienceCard = (props:any) => {
  const [edit, setEdit] = useState(false);
  return (
    !edit ? (
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
      <p className="mt-4 text-sm leading-relaxed text-mine-shaft-300">
        {props.description}
      </p>
      {/* Description */}
      {props.edit && 
      <div>
      <ExperienceInput setEdit={setEdit} />
      <div className="flex gap-5 mt-4">
        <Button onClick={() => setEdit(true)} variant="outline" color="green">Edit</Button>
        <Button variant="light" color="red">Delete</Button>
      </div>
      </div>
      }
    </div>):(
      <>
      
      </>
    )
  );
};

export default ExperienceCard;
