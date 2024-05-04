import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "../context/appContext";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
