import React from "react";
import "./App.css";
import { MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import HomePage from "./Pages/HomePage";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";


function App() {
  return (
      <MantineProvider>
        <Header />
       <HomePage />      
       <Footer />
      </MantineProvider>
    
  );
}

export default App;
