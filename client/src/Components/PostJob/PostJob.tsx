import React, { useState } from "react";
import {
  TextInput,
  Select,
  MultiSelect,
  Textarea,
  Button,
  Paper,
  Title,
} from "@mantine/core";
import TextEditor from "./TextEditor";
import Link from "@mui/material/Link";
import { IconArrowBack } from "@tabler/icons-react";

const PostJobForm: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-mine-shaft-950 text-white flex items-center justify-center p-6">
      <Paper
        shadow="lg"
        radius="lg"
        className="w-full max-w-7xl bg-mine-shaft-950 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <Select
            label="Job Title"
            placeholder="Designer"
            data={[
              "Designer",
              "Product Manager",
              "Software Engineer",
              "Data Scientist",
            ]}
          />

          {/* Company */}
          <Select
            label="Company"
            placeholder="Microsoft"
            data={["Microsoft", "Google", "Amazon", "Facebook"]}
          />

          {/* Experience */}
          <Select
            label="Experience"
            placeholder="Enter Experience Level"
            data={["Fresher", "1-3 years", "3-5 years", "5+ years"]}
          />

          {/* Job Type */}
          <Select
            label="Job Type"
            placeholder="Enter Job Type"
            data={["Full-time", "Part-time", "Internship", "Contract"]}
          />

          {/* Location */}
          <Select
            label="Location"
            placeholder="Enter Job Location"
            data={["Remote", "On-site", "Hybrid"]}
          />

          {/* Salary */}
          <Select
            label="Salary"
            placeholder="Enter Salary"
            data={["3 LPA", "5 LPA", "10 LPA", "15 LPA"]}
          />
        </div>

        {/* Skills */}
        <div className="mt-6">
          <MultiSelect
            data={["React", "Tailwind", "Figma", "Node.js", "UI/UX"]}
            label="Skills"
            placeholder="Enter skills"
            searchable
            value={skills}
            onChange={setSkills}
          />
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <label className="text-white">Job Description</label>
          <TextEditor />
        </div>

        {/* Submit Button */}
        <div>
          <div className="mt-8 flex gap-3">
            <Link to="/find-talent" className="my-4 inline-block">
              <Button
                variant="filled"
                color="green"
                size="md"
                className="font-semibold"
              >
                Publish Job
              </Button>
            </Link>
            <Link to="/find-talent" className="my-4 inline-block">
              <Button
                variant="light"
                color="green"
                size="md"
                className="font-semibold"
              >
                Save as Draft
              </Button>
            </Link>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default PostJobForm;
