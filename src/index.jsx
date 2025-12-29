import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SystemProvider } from "./context/SystemProvider";

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <SystemProvider>
    <App />
  </SystemProvider>
);
