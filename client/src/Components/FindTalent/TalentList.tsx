import React from "react";
import TalentCard from "./TalentCard";
import { talents } from "../../Data/TalentData";

const TalentList: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 px-10">
      {talents.map((talent, index) => (
        <TalentCard
          key={index}
          name={talent.name}
          role={talent.role}
          company={talent.company}
          topskills={talent.topskills}
          about={talent.about}
          expectedCtc={talent.expectedCtc}
          location={talent.location}
          image={talent.image}
        />
      ))}
    </div>
  );
};

export default TalentList;
