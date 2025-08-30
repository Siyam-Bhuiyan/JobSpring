import { talents } from "../../Data/TalentData";
import TalentCard from "./TalentCard";

const RecommandedTalents=()=>{
    return(
        <div >
            <div className="text-2xl font-semibold mb-2">Recommanded Talents</div>
            <div className="flex flex-col flex-wrap gap-5">
           {talents.map((talent, index) =>index<4 && (
               <TalentCard key={index} {...talent}/>
           ))}
        </div>
        </div>
    )
}
export default RecommandedTalents;