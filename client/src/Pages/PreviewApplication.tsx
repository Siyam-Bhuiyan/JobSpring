import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

const PreviewApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, job } = location.state || {};

  if (!formData || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Card className="bg-mine-shaft-800 mt-20 border-none text-white rounded-2xl p-16 w-full max-w-5xl text-center">
          <h2 className="text-xl font-semibold">No Application Data</h2>
          <p className="text-mine-shaft-400">
            Please fill out the application form first.
          </p>
          <Button onClick={() => navigate(-1)} color="green" className="mt-4">
            Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] flex justify-center bg-mine-shaft-950 font-[Poppins, sans-serif] text-white">
      <Card className="bg-mine-shaft-800 mt-40 border-none text-white rounded-2xl p-16 w-full max-w-5xl">
        

        {/* Job Info */}
        <div className="flex items-center gap-3 mb-6">
            <div className=" p-2 rounded-lg">

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

        <h2 className="text-lg font-semibold mb-6 mt-6">Preview Your Application</h2>

        {/* Preview Fields */}
        <div className="space-y-4">
          <p><strong>Full Name      :</strong> {formData.fullName}</p>
          <p><strong>Email          :</strong> {formData.email}</p>
          <p><strong>Phone          :</strong> {formData.phone}</p>
          <p><strong>Website        :</strong> {formData.website}</p>
          <p><strong>Resume         :</strong> {formData.resume?.name}</p>
          <p><strong>Cover Letter   :</strong></p>
          <div className="bg-mine-shaft-700 p-4 rounded-lg">{formData.coverLetter}</div>
        </div>

        {/* Final Actions */}
        <div className="flex gap-5 mt-10">
          <Button
            variant="outline"
            color="green"
            onClick={() => navigate(`/apply-job/${job.id}`, { state: { formData, job } })}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="green"
            onClick={() => {
              console.log("Final Submit:", formData);
              navigate("/");
            }}
            className="bg-bright-sun-400 text-black px-6 py-2 rounded-lg"
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PreviewApplication;
