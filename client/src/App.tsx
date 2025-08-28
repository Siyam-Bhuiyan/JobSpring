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
    colors: {},
  });
  return (
    <AnimatePresence mode="wait">
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/find-job"
              element={
                <PageWrapper>
                  <FindJobsPage />
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
             {/* <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />
             <Route
              path="/register"
              element={
                <PageWrapper>
                  <Register />
                </PageWrapper>
              } */}
            {/* /> */}
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AnimatePresence>
  );
}

export default App;
