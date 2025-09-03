import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"admin" | "recruiter" | "job-seeker" | "pre-university">;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Map backend roles to frontend route roles
  const roleMapping: Record<string, string> = {
    "user": "job-seeker",
    "preuniversity": "pre-university",
    "admin": "admin",
    "recruiter": "recruiter"
  };

  const frontendRole = roleMapping[user.role] || user.role;

  if (!allowedRoles.includes(frontendRole as "admin" )) {
    return <Navigate to="/admin" replace />;
  }else if (!allowedRoles.includes(frontendRole as "recruiter")) {
    return <Navigate to="/recruiter" replace />;
  }else if (!allowedRoles.includes(frontendRole as "job-seeker")) {
    return <Navigate to="/job-seeker" replace />;
  }else if (!allowedRoles.includes(frontendRole as "pre-university")) {
    return <Navigate to="/pre-university" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
