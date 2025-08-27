import React from "react";
import "./App.css";
import { MantineProvider} from "@mantine/core";
import "@mantine/core/styles.css";
import HomePage from "./Pages/HomePage";

function App() {
  return (
      <MantineProvider>
       <HomePage />
      </MantineProvider>
    
  );
}

export default App;
