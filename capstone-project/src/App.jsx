import { useState } from "react";
import allCategories from "./components/all-ingredients";
import Form from "./components/Form";
import "./index.css";
import { useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);

  const allIngredients = allCategories.flat();
  useEffect(() => {
    if (inputText) {
      const filtered = allIngredients.filter((ingredient) => 
        ingredient.name.toLowerCase().includes(inputText)
      ); //returns the ingredient objects whose names include user inputText
      setFilteredIngredients(filtered);
      console.log(filtered)
    }
  }, [inputText]); //reruns code everything inputText changes



  return (
    <div className="bg-blue-100 w-full h-full">
      <h1 className="text-black text-5xl text-center front-extrabold">
        Grocery List Organizer
      </h1>

      <div className="flex justify-center mt-6">
        <input
          placeholder="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="p-2 rounded border border-gray-400 w-1/2"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="bg-white rounded-lg shadow-md p-3 text-center"
          >
  
            <div className="aspect-square w-full overflow-hidden rounded-md">
            <img
              src={ingredient.thumbnail}
              alt={ingredient.name}
              className="w-full h-full object-cover "
            />
            </div>
            <p className="text-lg font-semibold mt-2">{ingredient.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
