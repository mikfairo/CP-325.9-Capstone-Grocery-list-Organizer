import { createRoot } from "react-dom/client";
import HomePage from "./pages/Homepage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyMealsPage from "./pages/My-meals-page.jsx";
import GroceryListPage from "./pages/Grocery-list-page.jsx";
import IngredientsPage from "./pages/Ingredients-page.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="page1" element={<MyMealsPage />} />
      <Route path="page2" element={<GroceryListPage />} />
      <Route path="page3" element={<IngredientsPage />} />
    </Routes>
  </BrowserRouter>
);
