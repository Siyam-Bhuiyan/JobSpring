import React from "react";
import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    {/* <MantineProvider  theme={theme}> */}

      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/find-job" element={<FindJobsPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/talent-profile" element={<TalentProfilePage />} />
          <Route path="/find-company" element={<FindCompanyPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/applications" element={<ApplicationPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
