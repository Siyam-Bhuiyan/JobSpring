import { companyData } from "../../Data/CompanyData";
import CompanyCard from "./CompanyCard";


interface RecommandedCompanyProps {
    id: number | string;
}

const RecommandedCompany = ({ id }: RecommandedCompanyProps) => {
    return(
        <div >
            <div className="text-2xl font-semibold mb-2">Recommanded Companies</div>
            <div className="flex flex-col flex-wrap gap-5">
           {companyData.filter((j) => j.id !== id).map((company, index) =>index<4 && (
               <CompanyCard key={index} {...company}/>
           ))} 
        </div>
        </div>
    )
}
export default RecommandedCompany;