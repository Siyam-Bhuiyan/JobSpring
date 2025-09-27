import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";

const CompanyEmployees = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {talents.map(
          (talent, index) => index < 6 && <TalentCard key={index} {...talent} />
        )}
      </div>
    </div>
  );
};

export default CompanyEmployees;
