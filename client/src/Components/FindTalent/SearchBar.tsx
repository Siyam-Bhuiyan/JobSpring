import { Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import MultiSelectCreatable from "../FindJobs/MultiInput";
import { searchFields } from "../../Data/TalentData";
import {  IconUserCircle } from "@tabler/icons-react";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20}/></div>
        <Input className="[&_input]:!placeholder-mine-shaft-400" variant="unstyled" placeholder="Talent Name" />
      </div>
      {searchFields.map((item, index) => (
        <>
          <div key={index} className="w-1/5">
            <MultiSelectCreatable {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex justify-between">
          <div>Salary</div>
          <div>
            &#x09F3;{value[0]} LPA - &#x09F3;{value[1]} LPA
          </div>
        </div>
        <RangeSlider
          size="xs"
          color="yellow"
          value={value}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
