import { Textarea } from "@mantine/core";
import fields from "../../Data/ProfileData";
import SelectInput from "./SelectInput";
import {useState } from "react";
import { MonthPickerInput } from "@mantine/dates";

const ExperienceInput = (props:any) => {
  const select = fields;
const [startDate, setStartDate] = useState<Date | null>(new Date());
    const talent = {
    id: 1,
    name: "T'Challa",
    role: "Business Analyst",
    company: "Wakanda Tech",
    experience: "3 Years",
    topskills: ["Business Strategy", "Data Modeling", "Agile"],
    about: "Business Analyst bridging business goals and technology solutions.",
    expectedCtc: "32 - 48 LPA",
    location: "Wakanda",
    image: "https://api.dicebear.com/7.x/adventurer/svg?seed=TChalla",
    coverImage: "https://picsum.photos/id/1099/800/300",
    experienceDetails: [
      {
        company: "Wakanda Tech",
        logo: "https://logo.clearbit.com/google.com",
        role: "Business Analyst",
        duration: "2020 - Present",
        location: "Wakanda",
        description:
          "Managed stakeholder requirements and data-driven strategies.",
      },
    ],
    certifications: [
      {
        title: "Certified Business Analyst Professional",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "IIBA",
        year: "2021",
        issued: "2021",
        credentialId: "CBA123",
      },
      {
        title: "Agile Business Analyst",
        logo: "https://logo.clearbit.com/google.com",
        issuer: "Scrum Alliance",
        year: "2022",
        issued: "2022",
        credentialId: "ABA123",
      },
    ],
    resume: {
      title: "TChalla_Resume.pdf",
      fileUrl: "/resumes/tchalla.pdf",
    },
  };
  const [desc, setDesc] = useState(`${talent.experienceDetails[0].description}`);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Edit Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />
      <Textarea
        label="Summary"
        className="w-full rounded-lg"
        value={desc}
        autosize
        placeholder="Enter Summary..."
        minRows={3}
        onChange={(event) => setDesc(event.currentTarget.value)}
      />
      <div className="flex gap-10 [&>*]:w-1/2">
      <MonthPickerInput
        label="Start Date"
        placeholder="Pick Date"
        className="w-full"
        value={startDate}
        onChange={(value) => setStartDate(value ? new Date(value) : null)}
      />
      <MonthPickerInput
        label="Start Date"
        placeholder="Pick Date"
        className="w-full"
        value={startDate}
        onChange={(value) => setStartDate(value ? new Date(value) : null)}
      />
      </div>
    </div>
  );
};
export default ExperienceInput;
