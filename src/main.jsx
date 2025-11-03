import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n"; // ✅ Must be loaded BEFORE any providers

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap ThemeProvider inside StrictMode, not the other way around */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
