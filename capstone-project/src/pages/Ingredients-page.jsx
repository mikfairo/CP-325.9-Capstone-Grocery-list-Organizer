import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Nav from "../components/Nav";
import "../index.css";

function IngredientsPage() {
  const [inputText, setInputText] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch("http://localhost:3000/all-ingredients");
      console.log(response);
      const ingredients = await response.json();
      const data = ingredients.data;
      setAllIngredients(data);
      setFilteredIngredients(data);
    };
    fetchIngredients();
  }, []); //loads all ingredient data

  useEffect(() => {
    const text = inputText.toLowerCase();
    if (text === "") {
      setFilteredIngredients(allIngredients);
    } else {
      const filtered = allIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(text)
      );
      setFilteredIngredients(filtered);
    }
  }, [inputText, allIngredients]); //reruns code everything inputText changes

  const fetchIngredientsByCategory = async (endpoint) => {
    const response = await fetch(`http://localhost:3000/${endpoint}`);
    console.log(response);
    const ingredients = await response.json();
    const data = ingredients.data;
  console.log(data);
    setFilteredIngredients(data);
  };

  return (
  <div className="bg-blue-100 min-h-screen flex flex-col">
    <h1 className="text-black text-5xl text-center front-extrabold">
      Ingredients
    </h1>
    <br />
    <Nav />

    {/* PAGE BODY */}
    <div className="flex flex-row flex-1">

      {/* SIDEBAR LEFT */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>

        <div className="flex flex-col gap-3">
          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-vegetables")}
          >
            Vegetables
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-fruits")}
          >
            Fruits
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-seafoods")}
          >
            Seafoods
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-meats")}
          >
            Meats
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-dry-canned-goods")}
          >
            Dry/Canned Goods
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-dairy")}
          >
            Dairy
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-condiments")}
          >
            Condiments
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-baking-and-spices")}
          >
            Baking/Spices
          </button>

          <button
            className="text-left px-3 py-2 rounded hover:bg-blue-200 transition"
            onClick={() => fetchIngredientsByCategory("get-all-other")}
          >
            Other
          </button>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 p-6">

        {/* SEARCH BAR */}
        <div className="flex justify-center mb-6">
          <input
            placeholder="Search"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={inputRef}
            className="p-2 rounded border border-gray-400 w-1/2"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {filteredIngredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="bg-white rounded-lg shadow-md p-3 text-center"
            >
              <div className="aspect-square w-full overflow-hidden rounded-md">
                <img
                  src={ingredient.thumbnail}
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-lg font-semibold mt-2">{ingredient.name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
);
}

export default IngredientsPage;
