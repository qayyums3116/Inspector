// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "@/context/AuthContext";

const container = document.getElementById("root")!;
createRoot(container).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
