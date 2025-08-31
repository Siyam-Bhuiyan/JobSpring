import { talents } from "../../Data/TalentData";
import TalentCard from "./TalentCard";

interface RecommandedTalentsProps {
    id: number | string;
}

const RecommandedTalents = ({ id }: RecommandedTalentsProps) => {
    return(
        <div >
            <div className="text-2xl font-semibold mb-2">Recommanded Companies</div>
            <div className="flex flex-col flex-wrap gap-5">
           {talents.filter((j) => j.id !== id).map((talent, index) =>index<4 && (
               <TalentCard key={index} {...talent}/>
           ))} 
        </div>
        </div>
    )
}
export default RecommandedTalents;