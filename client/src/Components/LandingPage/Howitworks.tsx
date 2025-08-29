import React from "react";

const steps = [
  {
    title: "Build Your Resume",
    description: "Create a standout resume with your skills.",
    icon: "Build Your\nResume",
  },
  {
    title: "Apply for Job",
    description: "Find and apply for jobs that match your skills.",
    icon: "Apply for\nJob",
  },
  {
    title: "Get Hired",
    description: "Connect with employers and start your new job.",
    icon: "Get\nHired",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-mine-shaft-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Side Image */}
        <div className="relative flex justify-center">
          <img
            src="src/assets/g.png" // replace with your illustration
            alt="a"
            className="w-[350px] lg:w-[400px]"
          />

          {/* Floating Card */}
          <div className="absolute top-1/2 right-1/9 transform -translate-x-1/2 bg-mine-shaft-950 border border-yellow-500 rounded-lg px-6 py-4 shadow-lg text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" // avatar placeholder
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto mb-2"
            />
            <p className="font-semibold">Complete your profile</p>
            <p className="text-sm text-gray-400">70% Completed</p>
          </div>
        </div>

        {/* Right Side Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            How it <span className="text-yellow-500">Works</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Effortlessly navigate through the process and land your dream job.
          </p>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                {/* Circle Icon */}
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-black font-semibold text-sm text-center leading-tight px-2">
                  {step.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
