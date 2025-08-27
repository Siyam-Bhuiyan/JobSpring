import React from "react";
import "./App.css";
import { MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import HomePage from "./Pages/HomePage";
import Footer from "./Footer/Footer";

function App() {
  return (
      <MantineProvider>
       <HomePage />
       <Footer />
      </MantineProvider>
    
  );
}

export default App;
