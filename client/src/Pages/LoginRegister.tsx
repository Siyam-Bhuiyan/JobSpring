import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "tabler-icons-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mine-shaft-950 text-white p-10">
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold">
          <a href="/">JobSpring</a>
        </div>
      </div>
    <div className="min-h-screen flex items-center justify-center bg-mine-shaft-950 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-mine-shaft-900 p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center  mb-6">Login</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-cloud-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl bg-cloud-gray-700 border border-cloud-gray-600 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-cloud-gray-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-xl bg-cloud-gray-700 border border-cloud-gray-600 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-sky-blue-500" />
              Remember me
            </label>
            <a href="#" className="text-sky-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-bright-sun-500 hover:bg-bright-sun-600 transition rounded-xl py-2 font-semibold text-white shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-cloud-gray-300 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-bright-sun-400 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mine-shaft-950 text-white p-10">
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold">
          <a href="/">JobSpring</a>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-mine-shaft-950 text-white p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-mine-shaft-900 p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-sky-blue-400 mb-6">
            Create Account
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-cloud-gray-200">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-xl bg-cloud-gray-700 border border-cloud-gray-600 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-cloud-gray-200">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-cloud-gray-700 border border-cloud-gray-600 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-cloud-gray-200">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 rounded-xl bg-cloud-gray-700 border border-cloud-gray-600 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-cloud-gray-200">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 rounded-xl bg-cloud-gray-700 border border-cloud-gray-600 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-bright-sun-500 hover:bg-bright-sun-600  transition rounded-xl py-2 font-semibold text-white shadow-lg"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-cloud-gray-300 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-bright-sun-400 hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export { LoginPage, RegisterPage };
