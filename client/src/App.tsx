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
import { AnimatePresence, motion } from "framer-motion";
import { LoginPage, RegisterPage } from "./Pages/LoginRegister";
import Profile  from "./Pages/Profile";
import FindTalent from "./Pages/FindTalentPage";

const PageWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

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
    <AnimatePresence mode="wait">
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        {/* <MantineProvider theme={theme}> */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <LoginPage />
                </PageWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <PageWrapper>
                  <RegisterPage />
                </PageWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <PageWrapper>
                  <Profile />
                </PageWrapper>
              }
            />
            <Route
              path="/find-job"
              element={
                <PageWrapper>
                  <FindJobsPage />
                </PageWrapper>
              }
            />
            <Route
              path="/find-talent"
              element={
                <PageWrapper>
                  <FindTalent />
                </PageWrapper>
              }
            />
            <Route
              path="/find-company"
              element={
                <PageWrapper>
                  <FindCompanyPage />
                </PageWrapper>
              }
            />
            <Route
              path="/blogs"
              element={
                <PageWrapper>
                  <BlogsPage />
                </PageWrapper>
              }
            />
            <Route
              path="/applications"
              element={
                <PageWrapper>
                  <ApplicationPage />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <HomePage />
                </PageWrapper>
              }
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AnimatePresence>
  );
}

export default App;
