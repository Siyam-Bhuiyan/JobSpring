import React, { useState } from "react";
import { Paperclip } from "lucide-react";
import { Button, Card } from "@mantine/core";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    resume: null as File | null,
    coverLetter: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can connect this to backend API here
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-mine-shaft-950 flex justify-center">
        <Card className="bg-mine-shaft-800 border-none text-white rounded-2xl p-16 w-full max-w-5xl">
      <h2 className="text-lg font-semibold mb-6">Submit Your Application</h2>
      <form onSubmit={handleSubmit} className="">
        {/* Full Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="bg-mine-shaft-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:bright-sun-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-mine-shaft-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:bright-sun-400"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-mine-shaft-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:bright-sun-400"
          />
        </div>

        {/* Website */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Personal Website <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            className="bg-mine-shaft-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:bright-sun-400"
          />
        </div>

        {/* Resume Upload */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium mb-1">
            Resume/CV <span className="text-red-500">*</span>
          </label>
          <label className="flex items-center gap-3 bg-mine-shaft-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-mine-shaft-600">
            <Paperclip className="w-5 h-5 text-yellow-400" />
            <span>{formData.resume ? formData.resume.name : "Upload Resume"}</span>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              required
              className="hidden"
            />
          </label>
        </div>

        {/* Cover Letter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Cover Letter <span className="text-red-500">*</span>
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleTextAreaChange}
            required
            className="bg-mine-shaft-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:bright-sun-400"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end mt-4">
          <Button type="submit" className="bg-yellow-400 text-black px-6 py-2 rounded-lg">
            Submit Application
          </Button>
        </div>
      </form>
    </Card>
    </div>
  );
};

export default JobApplicationForm;
