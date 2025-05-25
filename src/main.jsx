import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import LabPage from "./LabPage.jsx";
import TheoryPage from "./TheoryPage.jsx";
import InstructionsPage from "./InstructionsPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Compton-effect-lab">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playground" element={<LabPage />} />
      <Route path="/theory" element={<TheoryPage />} />
      <Route path="/instructions" element={<InstructionsPage />} />
    </Routes>
  </BrowserRouter>
);
