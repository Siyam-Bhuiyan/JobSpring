import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Paperclip } from "lucide-react";
import { Button, Card, Divider } from "@mantine/core";
import { jobCardList } from "../Data/JobsData";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion } from "framer-motion";

const JobApplicationForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const job = jobCardList.find((j) => j.id === Number(id));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    resume: null as File | null,
    coverLetter: "",
  });

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

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

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Card className="bg-mine-shaft-800 border-none text-white rounded-2xl p-16 w-full max-w-5xl text-center">
          <h2 className="text-xl font-semibold">Job not found</h2>
          <p className="text-mine-shaft-400">
            The job you are looking for does not exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] flex justify-center  bg-mine-shaft-950 font-[Poppins, sans-serif] text-white">
      <Card className="bg-mine-shaft-800 border-none text-white rounded-2xl p-16 w-full max-w-5xl">
      <div className="flex items-center gap-4 mt-20 mb-6">
              <Button
                variant="light"
                color="green"
                onClick={() => navigate(`/job-details/${job.id}`)}
              >
                <IconArrowLeft className="w-5 h-5 mr-2 " /> Back
              </Button>
            </div>

         <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg">
            <img
              src={job.logo}
              alt={job.company}
              className="w-12 h-12 rounded"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
            <p className="text-mine-shaft-400">
              {job.company} • {job.posted} • {job.applicants} Applicants
            </p>
          </div>
        </div>
        <Divider size="xs" mx="md" />
        <h2 className=" flex justify-center text-3xl font-bold mb-6 mt-6">Submit Your Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="bg-mine-shaft-900 p-4 rounded-lg focus:outline-none focus:ring-2 focus:green"
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
              className="bg-mine-shaft-900 p-4 rounded-lg focus:outline-none focus:ring-2 focus:green"
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
              className="bg-mine-shaft-900 p-4 rounded-lg focus:outline-none focus:ring-2 focus:green"
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
              className="bg-mine-shaft-900 p-4 rounded-lg focus:outline-none focus:ring-2 focus:green"
            />
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium mb-1">
              Resume/CV <span className="text-red-500">*</span>
            </label>
            <label className="flex items-center gap-3 bg-mine-shaft-900 p-4 rounded-lg cursor-pointer hover:bg-mine-shaft-600">
              <Paperclip className="w-5 h-5 text-yellow-400" />
              <span>
                {formData.resume ? formData.resume.name : "Upload Resume"}
              </span>
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
              className="bg-mine-shaft-900 p-4 rounded-lg focus:outline-none focus:ring-2 focus:green"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex gap-5 mt-14">
            <Button
              variant="outline"
              color="green"
              type="submit"
              size="md"
              onClick={() => navigate("/preview-application", { state: { formData, job } })}
              className="bg-bright-sun-400 text-black px-6 py-2 rounded-lg"
              >
              Preview   
            </Button>
            <Button
              variant="light"
                color="green"
              type="submit"
              size="md"
              onClick={() => navigate("/")}
              className="bg-bright-sun-400 text-black px-6 py-2 rounded-lg"
            >
              Submit 
            </Button>
          </div>
        </form>
      </motion.div>
      </Card>
    </div>
  );
};

export default JobApplicationForm;
