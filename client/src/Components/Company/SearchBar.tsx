import { Divider } from "@mantine/core";
import MultiSelectCreatable from "../FindJobs/MultiInput";
import { dropdownData } from "../../Data/CompanyData";

const SearchBar = () => {
  return (
    <div className="flex px-5 py-8">
      {dropdownData.map((item, index) => (
        <>
          <div key={index} className="w-1/2">
            <MultiSelectCreatable {...item} />
          </div> 
          <Divider mr="xs" size="xs" orientation="vertical" />
        </>
      ))}
    </div>
  );
};

export default SearchBar;
