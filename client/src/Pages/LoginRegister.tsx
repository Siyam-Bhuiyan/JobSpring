import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // <- your auth context

// ---------------- LOGIN ----------------
const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "recruiter" | "job-seeker">("job-seeker");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);

    if (role === "admin") navigate("/admin");
    if (role === "recruiter") navigate("/recruiter");
    if (role === "job-seeker") navigate("/job-seeker");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mine-shaft-950 p-10">
      {/* Logo */}
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold">
          <Link to="/">JobSpring</Link>
        </div>
      </div>

      {/* Login Card */}
      <div className="min-h-screen flex items-center justify-center bg-mine-shaft-950 p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-mine-shaft-900 p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-mine-shaft-200">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-mine-shaft-700 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-mine-shaft-200">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-xl bg-mine-shaft-700 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-sm mb-1 text-mine-shaft-200">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-4 py-2 rounded-xl bg-mine-shaft-700 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-bright-sun-500 hover:bg-bright-sun-600 transition rounded-xl py-2 font-semibold shadow-lg"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-mine-shaft-300 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-bright-sun-400 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// ---------------- REGISTER ----------------
const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "recruiter" | "job-seeker">("job-seeker");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // For now: simulate registration by logging in directly
    login(email, role);

    if (role === "admin") navigate("/admin");
    if (role === "recruiter") navigate("/recruiter");
    if (role === "job-seeker") navigate("/job-seeker");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mine-shaft-950 p-10">
      {/* Logo */}
      <div className="text-bright-sun-500 flex gap-3 items-center transition-all duration-300 hover:scale-105 hover:text-bright-sun-400">
        <Briefcase className="h-10 w-10" />
        <div className="text-2xl font-semibold">
          <a href="/">JobSpring</a>
        </div>
      </div>

      {/* Register Card */}
      <div className="min-h-screen flex items-center justify-center bg-mine-shaft-950 p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-mine-shaft-900 p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-mine-shaft-200">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-xl bg-mine-shaft-700 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-mine-shaft-200">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-mine-shaft-700 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-sm mb-1 text-mine-shaft-200">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-4 py-2 rounded-xl bg-mine-shaft-700 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
              >
                <option value="job-seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 text-mine-shaft-200">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 rounded-xl bg-mine-shaft-700 focus:ring-2 focus:ring-sky-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-bright-sun-500 hover:bg-bright-sun-600 transition rounded-xl py-2 font-semibold text-white shadow-lg"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-mine-shaft-300 mt-6">
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
