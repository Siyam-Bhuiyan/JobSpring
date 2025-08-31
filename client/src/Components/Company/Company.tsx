import Sort from "../FindJobs/Sort";
import CompanyList from "./CompanyList";

const Jobs=()=>{
    return(
        <div className="p-2">
            <div className="flex justify-between mb-5 p-10">
                <div className="text-2xl font-semibold">Recommanded Company</div>
                <Sort/>
            </div>
           <CompanyList/>
        </div> 
    )
}
export default Jobs;