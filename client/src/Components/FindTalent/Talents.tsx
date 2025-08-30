import Sort from "../FindJobs/Sort";
import TalentList from "./TalentList";

const Talents=()=>{
    return(
        <div className="p-10">
            <div className="flex justify-between mb-5">
                <div className="text-2xl font-semibold">Talents</div>
                <Sort/>
            </div>
           <TalentList/>
        </div>
    )
}
export default Talents;