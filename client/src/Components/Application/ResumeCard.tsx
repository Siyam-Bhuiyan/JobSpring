import { useState } from "react";
import { IconMail, IconPhone, IconEdit } from "@tabler/icons-react";

const ResumeCard = () => {
  const [resume, setResume] = useState("");

  return (
    <div className="max-w-sm mx-auto bg-mine-shaft-900 shadow-md rounded-xl p-6 relative">
      {/* Edit Icon */}
      <button className="absolute top-3 right-3 text-mine-shaft-400 hover:text-mine-shaft-600">
        <IconEdit size={18} />
      </button>

      {/* Avatar */}
      <div className="flex justify-center">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Satvik"
          alt="Resume"
          className="w-20 h-20 rounded-full"
        />
      </div>

      {/* Name & Location */}
      <div className="text-center mt-3">
        <h2 className="font-semibold text-lg text-mine-shaft-100">Satvik Brown</h2>
        <p className="text-sm text-mine-shaft-300">Los Angeles, CA 90036</p>
      </div>

      {/* Details */}
      <div className="mt-4 text-sm text-mine-shaft-200 space-y-2">
        <div className="flex justify-between">
          <span>Most Recent Job</span>
          <span className="font-semibold">Oracle</span>
        </div>
        <div className="flex justify-between">
          <span>Last Qualification</span>
          <span className="font-semibold">B.Tech</span>
        </div>
        <div className="flex justify-between">
          <span>Work Experience</span>
          <span className="font-semibold">5.5 Years</span>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-mine-shaft-300">
          <IconMail size={16} className="text-mine-shaft-300" />
          <span>satvik.kk@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-mine-shaft-300">
          <IconPhone size={16} className="text-mine-shaft-300" />
          <span>0123456789</span>
          <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
            Pending
          </span>
        </div>
      </div>

      {/* Resume Upload */}
      <div className="mt-5">
        <label className="block">
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              setResume(e.target.files?.[0]?.name || "No file chosen")
            }
          />
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-xl">
            {resume ? `Uploaded: ${resume}` : "Upload your latest resume"}
          </button>
        </label>
      </div>
    </div>
  );
};

export default ResumeCard;
