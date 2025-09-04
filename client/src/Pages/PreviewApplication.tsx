import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Divider } from "@mantine/core";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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

          <h2 className=" flex justify-center text-3xl font-bold mb-6 mt-6">
            Preview Your Application
          </h2>

          {/* Preview Fields */}
          <div className="space-y-4">
            <p>
              <strong>Full Name :</strong>
              <br />
              <div className="bg-mine-shaft-950 p-4 rounded-lg">
                {" "}
                {formData.fullName}
              </div>
            </p>
            <p>
              <strong>Email :</strong>
              <br />
              <div className="bg-mine-shaft-950 p-4 rounded-lg">
                {formData.email}
              </div>
            </p>
            <p>
              <strong>Phone :</strong>
              <br />
              <div className="bg-mine-shaft-950 p-4 rounded-lg">
                {formData.phone}
              </div>
            </p>
            <p>
              <strong>Website :</strong>
              <br />
              <div className="bg-mine-shaft-950 p-4 rounded-lg">
                {formData.website}
              </div>
            </p>
            <p>
              <strong>Resume :</strong>
              <br />
              <div className="bg-mine-shaft-950 p-4 rounded-lg">
                {formData.resume?.name}
              </div>
            </p>
            <p>
              <strong>Cover Letter :</strong>
              <br />
            </p>
            <div className="bg-mine-shaft-950 p-4 rounded-lg">
              {formData.coverLetter}
            </div>
          </div>

          {/* Final Actions */}
          <div className="flex gap-5 mt-10">
            <Button
              variant="outline"
              color="green"
              onClick={() =>
                navigate(`/apply-job/${job.id}`, { state: { formData, job } })
              }
              className="bg-bright-sun-600 text-white px-24 py-2 rounded-lg"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
            <Button
              variant="light"
              color="green"
              onClick={() => {
                console.log("Final Submit:", formData);
                navigate("/");
              }}
              className="bg-bright-sun-600 text-white px-24 py-2 rounded-lg"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default PreviewApplication;
