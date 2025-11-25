import { useState } from "react";
import Nav from "../components/Nav";
import measurementTypes from "../components/measurement-types";
import Form from "../components/Form";
import "../index.css";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";

function HomePage() {
  const [inputText, setInputText] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [ingredientSelections, setIngredientSelections] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/all-ingredients");
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
        ingredient.name.toLowerCase().includes(inputText.toLowerCase())
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
      {/* recipe card with ingredients */}
      <button
        onClick={async () => {
          const response = await axios.post("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/save-recipe", { 
            data: {
              name: recipeName,
              recipe: ingredientSelections
            }
          })
          console.log(response.data)

        }}
      >
        Save Recipe
      </button>
      <div className="flex justify-center mt-6">
        <div className="bg-white w-full h-full rounded-lg shadow-md p-3 text-center">
          <div className="p-5">
            <p className="text-lg mb-5">
              Name your recipe, search and add ingredients by clicking the
              ingredient card, choose quantities and measurements, then click
              Submit when you're done.
              <br /> Your recipes will be saved in the "My Recipes" tab above.
            </p>

            <label className="flex justify-center gap-3">
              Recipe name:
              <input
                className="p-2 rounded border border-gray-300 w-1/3"
                placeholder="Name your recipe"
                onChange={(e) => setRecipeName(e.target.value)}
              ></input>
            </label>
            {ingredientSelections.map((ingredient) => (
              <div className="flex flex-row justify-center mt-5 gap-3">
                <h1 className="p-1">{ingredient.name}</h1>
                <input
                  className="p-1 rounded border border-gray-300 w-1/11"
                  placeholder="Enter quantity"
                  onChange={(e) => {
                    const currentIngredients = ingredientSelections;
                    currentIngredients.map((cIngredient) => {
                      if (cIngredient.name === ingredient.name) {
                        cIngredient.quantity = e.target.value;
                      }
                    });
                    setIngredientSelections(currentIngredients);
                  }}
                ></input>

                <select
                  className="p-1 rounded border border-gray-300 w-1/6"
                  onChange={(e) => {
                    const currentIngredients = ingredientSelections;
                    currentIngredients.map((cIngredient) => {
                      if (cIngredient.name === ingredient.name) {
                        cIngredient.measurement = e.target.value;
                      }
                    });
                    setIngredientSelections(currentIngredients);
                  }}
                >
                  {measurementTypes.map((type) => (
                    <option>{type}</option>
                  ))}
                </select>
                <button
                  className="ml-2 border border-gray-300 px-2 py-1 rounded hover:bg-blue-100"
                  onClick={() => {
                    const currentIngredients = ingredientSelections;
                    const filteredIngredients = currentIngredients.filter(
                      (cIngredient) => cIngredient.name !== ingredient.name
                    );
                    setIngredientSelections(filteredIngredients);
                  }}
                >
                  delete
                </button>
              </div>
            ))}
          </div>
          <input
            placeholder="Search"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={inputRef}
            className="p-2 rounded border border-gray-300 w-1/2"
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
                    measurement: 'cups',
                    quantity: undefined,
                  };
                  setIngredientSelections((prev) => [...prev, newIngredient]);
                  // setIngredientSelections((previousData) => ({ ...previousData, name: ingredient.name, measurement: undefined, quantity: undefined }));
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
