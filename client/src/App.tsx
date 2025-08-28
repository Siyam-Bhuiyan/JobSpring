import React from "react";
import "./App.css";
import { createTheme, MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FindJobsPage from "./Pages/FindJobsPage";
import FindCompanyPage from "./Pages/FindCompanyPage";
import BlogsPage from "./Pages/BlogsPage";
import ApplicationPage from "./Pages/ApplicationPage";


function App() {
  const theme = createTheme({
    colors: {
    }
   })
  return (
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/find-job" element={<FindJobsPage />} />
            <Route path="/find-company" element={<FindCompanyPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/applications" element={<ApplicationPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
          
         
        </BrowserRouter>
      </MantineProvider>
    
  );
}

export default App;
