import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/css/index.css";
import App from "./app/app.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
