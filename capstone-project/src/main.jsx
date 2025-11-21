import { createRoot } from "react-dom/client";
import HomePage from "./pages/Homepage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPageOne from "./pages/Testpage1.jsx";
import TestPageTwo from "./pages/Testpage2.jsx";
import TestPageThree from "./pages/Testpage3.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="page1" element={<TestPageOne />} />
      <Route path="page2" element={<TestPageTwo />} />
      <Route path="page3" element={<TestPageThree />} />
    </Routes>
  </BrowserRouter>
);
