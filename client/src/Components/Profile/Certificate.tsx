import { Button } from "@mantine/core";
import { useState } from "react";
import CertificationInput from "./CertificationInput";

const CertificationCard = (props: any) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-mine-shaft-950 text-white p-5 rounded-xl shadow-md w-full">
        <CertificationInput
          initialData={props}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-mine-shaft-950 text-white p-5 rounded-xl shadow-md w-full">
      {/* Header */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            <div className=" bg-mine-shaft-700 p-2 rounded-lg">
              <img src={props.logo} alt="logo" className="w-12 h-12 rounded" />
            </div>
            <div>
              <h3 className="text-base font-semibold">{props.title}</h3>
              <p className="text-sm text-mine-shaft-400">{props.issuer}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-mine-shaft-400">Issued {props.issued}</p>
            <p className="text-xs text-mine-shaft-500">
              ID: {props.credentialId}
            </p>
          </div>
        </div>
      </div>
      {/* Buttons */}
      {props.editMode && (
        <div className="flex gap-5 mt-4">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            color="green"
          >
            Edit
          </Button>
          <Button onClick={props.onDelete} variant="light" color="red">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificationCard;
