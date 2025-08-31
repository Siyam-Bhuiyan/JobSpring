import React from "react";
import TalentCard from "./TalentCard";
import { talents } from "../../Data/TalentData";
import { Link } from "react-router-dom";

const TalentList: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 px-10">
      {talents.map((talent) => (
        <Link to={`/talent-profile/${talent.id}`} key={talent.id}>
          <TalentCard
            key={talent.id}
            name={talent.name}
            role={talent.role}
            company={talent.company}
            topskills={talent.topskills}
            about={talent.about}
            expectedCtc={talent.expectedCtc}
            location={talent.location}
            image={talent.image}
          />
        </Link>
      ))}
    </div>
  );
};

export default TalentList;
