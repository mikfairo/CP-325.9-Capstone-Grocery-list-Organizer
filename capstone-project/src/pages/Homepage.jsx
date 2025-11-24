import { useState } from "react";
import Nav from "../components/Nav";
import measurementTypes from "../components/measurement-types";
import Form from "../components/Form";
import "../index.css";
import { useEffect } from "react";
import { useRef } from "react";

function HomePage() {
  const [inputText, setInputText] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [recipeSelections, setRecipeSelections] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch("http://localhost:3000/all-ingredients");
      console.log(response);
      const ingredients = await response.json();
      const data = ingredients.data;
      setAllIngredients(data);
    };
    fetchIngredients();
  }, []); //loads all ingredient data

  useEffect(() => {
    if (inputText) {
      const filtered = allIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(inputText)
      ); //returns the ingredient objects whose names include user inputText
      setFilteredIngredients(filtered);
      console.log(filtered);
    }
  }, [inputText]); //reruns code everything inputText changes

  return (
    <div className="bg-blue-100 w-full h-full">
      <h1 className="text-black text-5xl text-center front-extrabold">
        Grocery List Organizer
      </h1>
      <br />
      <Nav />

      <div className="flex justify-center mt-6">
        <div className="bg-white w-full h-full rounded-lg shadow-md p-3 text-center">
          <div className="p-5">
            <label>Recipe name:
            <input placeholder="Name your recipe"
            onChange={(e) => setRecipeName(e.target.value)}></input>
            </label>
            {recipeSelections.map((recipe) => (
              <div className="flex flex-row">
                <h1 className="p-1">{recipe.name}</h1>
                <select
                  onChange={(e) => {
                    const currentRecipes = recipeSelections
                    currentRecipes.map(cRecipe => {
                      if (cRecipe.name === recipe.name) {
                        cRecipe.measurement = e.target.value
                      }
                
                    })
                    setRecipeSelections(currentRecipes);
                  }}
                >
                  {measurementTypes.map((type) => (
                    <option>{type}</option>
                  ))}
                </select>
                <input placeholder="Enter quantity"
                   onChange={(e) => {
                    const currentRecipes = recipeSelections
                    currentRecipes.map(cRecipe => {
                      if (cRecipe.name === recipe.name) {
                        cRecipe.quantity = e.target.value
                      }
                
                    })
                    setRecipeSelections(currentRecipes);
                  }}></input>
              </div>
            ))}
          </div>
          <input
            placeholder="Search"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={inputRef}
            className="p-2 rounded border border-gray-400 w-1/2"
          />
        </div>
      </div>
      <br />
      {/* the image card */}
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
                className="w-full h-full object-cover "
                onClick={() => {
                  const newIngredient = {
                    name: ingredient.name,
                    measurement: undefined,
                    quantity: undefined,
                  };
                  setRecipeSelections((prev) => [...prev, newIngredient]);
                  // setRecipeSelections((previousData) => ({ ...previousData, name: ingredient.name, measurement: undefined, quantity: undefined }));
                  setInputText("");
                  setFilteredIngredients([]);
                  inputRef.current.value = "";
                }}
                // clears input text field and the images after user clicks ingredients
              />
            </div>
            <p className="text-lg font-semibold mt-2">{ingredient.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
