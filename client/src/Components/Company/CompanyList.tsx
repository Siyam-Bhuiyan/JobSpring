import React from "react";
import { companyData } from "../../Data/CompanyData";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";

const CompanyList: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 px-10">
      {companyData.map((company) => (
        <Link to={`/company-details/${company.id}`} key={company.id}>
          <CompanyCard  
            id={company.id}
            logo={company.logo}
            name={company.name}
            job={company.job}
            location={company.location}
            employees={company.employees}
            description={company.description}
          />
        </Link>
      ))}
    </div>
  );
};

export default CompanyList;
