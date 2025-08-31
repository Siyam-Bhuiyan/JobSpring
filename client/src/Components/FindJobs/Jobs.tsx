import JobList from "./JobList";
import Sort from "./Sort"

const Jobs=()=>{
    return(
        <div className="p-10">
            <div className="flex justify-between mb-5">
                <div className="text-2xl font-semibold">Recommanded Jobs</div>
                <Sort/>
            </div>
           <JobList/> 
        </div>
    )
}
export default Jobs;