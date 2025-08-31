import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"admin" | "recruiter" | "job-seeker">("job-seeker");
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username, role);

    // redirect based on role
    if (role === "admin") navigate("/admin");
    if (role === "recruiter") navigate("/recruiter");
    if (role === "job-seeker") navigate("/job-seeker");
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-xl mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="text-black p-2 mb-3 block"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        className="text-black p-2 mb-3 block"
      >
        <option value="admin">Admin</option>
        <option value="recruiter">Recruiter</option>
        <option value="job-seeker">Job Seeker</option>
      </select>

      <button
        onClick={handleLogin}
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
