import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// prettier-ignore
import EngineerMindLanding from "./EngineerMind-Landing.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EngineerMindLanding />} />
        <Route path="/engineermind-landing" element={<EngineerMindLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
