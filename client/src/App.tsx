import React from "react";
import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css"; 
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FindJobsPage from "./Pages/FindJobsPage";
import FindCompanyPage from "./Pages/FindCompanyPage";
import BlogsPage from "./Pages/BlogsPage";
import ApplicationPage from "./Pages/ApplicationPage";
import { LoginPage, RegisterPage } from "./Pages/LoginRegister";
import FindTalent from "./Pages/FindTalentPage";
import TalentProfilePage from "./Pages/TalentProfilePage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PostJobPage from "./Pages/PostJobPage";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminDashboard from "./Pages/Dashboards/AdminDashboard";
import RecruiterDashboard from "./Pages/Dashboards/RecruiterDashboard";
import JobSeekerDashboard from "./Pages/Dashboards/JobSeekerDashboard";
import JobDetailsPage from "./Pages/JobDetailsPage";
import CompanyDetailsPage from "./Pages/CompanyDetailsPage";
import JobApplicationForm from "./Components/Application/JobApplicationForms";
import PreUniversityDashboard from "./PreUniversity/PreUniversityDashboard";
import ChatBotPage from "./Pages/ChatBotPage";
import CareerPlanningPage from "./PreUniversity/CareerPlanningPage";
import InterviewQuestionsPage from "./PreUniversity/InterviewQuestionsPage";
import ProfilePage from "./Components/Profile/ProfilePage";


function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const hideLayout = ["/login", "/register","/"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  const theme = createTheme({
    colors: {
      "mine-shaft": [
        "#f6f6f6",
        "#e7e7e7",
        "#d1d1d1",
        "#b0b0b0",
        "#888888",
        "#6d6d6d",
        "#5d5d5d",
        "#4f4f4f",
        "#454545",
        "#3d3d3d",
        "#2d2d2d",
      ],
      "bright-sun": [
        "#fffbeb",
        "#fff3c6",
        "#ffe588",
        "#ffd149",
        "#ffbd20",
        "#f99b07",
        "#dd7302",
        "#b75006",
        "#943c0c",
        "#7a330d",
        "#461902",
      ],
    },
    fontFamily: "Poppins, sans-serif",
  });

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recruiter"
                element={
                  <ProtectedRoute allowedRoles={["recruiter"]}>
                    <RecruiterDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/job-seeker"
                element={
                  <ProtectedRoute allowedRoles={["job-seeker"]}>
                    <JobSeekerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pre-university"
                element={
                  <ProtectedRoute allowedRoles={["pre-university"]}>
                    <PreUniversityDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<HomePage />} />
              <Route path="/job-details/:id" element={<JobDetailsPage />} />
              <Route path="/company-details/:id" element={<CompanyDetailsPage />} />
              <Route path="/talent-details/:id" element={<TalentProfilePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/apply-job" element={<JobApplicationForm />} />
              <Route path="/find-job" element={<FindJobsPage />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/find-talent" element={<FindTalent />} />
              <Route path="/talent-profile" element={<TalentProfilePage />} />
              <Route path="/find-company" element={<FindCompanyPage />} />
              <Route path="/chatbot" element={<ChatBotPage />} />
              <Route path="/career-planning" element={<CareerPlanningPage />} />
              <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
              <Route path="/applications" element={<ApplicationPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
