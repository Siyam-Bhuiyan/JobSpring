import { Box, Button, Card, Container, Grid, Typography } from "@mantine/core";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Landing: React.FC = () => {
  return (
    <div>
      <div className="hero-section w-full flex items-center justify-between px-10 bg-mine-shaft-950">
        {/* Left Content */}
        <div className="hero-text flex-1 mr-10">
          <h1 className="text-7xl font-bold mb-4 text-white">
            Find your <span className="text-yellow-500"> Dream Job</span> with
            us
          </h1>
          <p className="text-lg mb-6">
            Good life begins with a good company. Start exploring thousands of
            jobs in one place.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Search a job"
              className="search-input flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="search-button px-4 py-2 bg-yellow-500 text-white rounded-r-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
        {/* Right Image */}
        <div className="hero-image flex-1">
          <img
            src="src/assets/job.png"
            alt="Job search illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};
export default Landing;
