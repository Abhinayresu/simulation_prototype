import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// prettier-ignore
import EngineerMindLanding from "./EngineerMind-Landing.tsx";
import EngineerMindHome from "./EngineerMind-Home.tsx";
import ProblemDefinition from "./Problem-Definition.tsx";
import EngineeringAssessment from "./Engineering-Assessment.tsx";
import SimulationPlanning from "./Simulation-Planning.tsx";
import ReviewAndApproval from "./Review-and-Approval.tsx";
import SimulationExecution from "./Simulation-Execution.tsx";
import ResultsAndValidation from "./Results-and-Validation.tsx";
import EngineeringReport from "./Engineering-Report.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EngineerMindLanding />} />
        <Route path="/landing" element={<EngineerMindLanding />} />
        <Route path="/home" element={<EngineerMindHome />} />
        <Route path="/engineermind-home" element={<EngineerMindHome />} />
        <Route path="/problem-definition" element={<ProblemDefinition />} />
        <Route path="/engineering-assessment" element={<EngineeringAssessment />} />
        <Route path="/simulation-planning" element={<SimulationPlanning />} />
        <Route path="/review-and-approval" element={<ReviewAndApproval />} />
        <Route path="/simulation-execution" element={<SimulationExecution />} />
        <Route path="/results-and-validation" element={<ResultsAndValidation />} />
        <Route path="/engineering-report" element={<EngineeringReport />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
