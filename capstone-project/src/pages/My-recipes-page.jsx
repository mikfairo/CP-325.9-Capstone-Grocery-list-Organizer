import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../index.css";
import axios from "axios";
import measurementTypes from "../components/measurement-types";
import { useNavigate } from "react-router-dom";

export default function MyRecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [recipeToEdit, setRecipeToEdit] = useState();
  const [newMQ, setNewMQ] = useState([]); //to change measurement and quantity
  const [editingRecipe, setEditingRecipe] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipes = async () => {
      // const response = await fetch("http://localhost:3000/get-all-recipes");
      const response = await fetch("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/get-all-recipes");
      console.log(response);
      const allRecipes = await response.json();
      const data = allRecipes.data;
      setAllRecipes(data);
      console.log(data);
    };
    fetchRecipes();
  }, []); //loads all recipes data

  const generateGroceryList = () => {
    const recipesToInclude = allRecipes.filter((recipe) =>
      selectedRecipes.includes(recipe.name)
    );
    const groceryMap = {};
    recipesToInclude.forEach((recipe) => {
      recipe.recipe.forEach((ingredient) => {
        const key = `${ingredient.name}|${ingredient.measurement}`;
        const qty = Number(ingredient.quantity) || 0; // convert to number

        if (groceryMap[key]) {
          groceryMap[key] += qty;
        } else {
          groceryMap[key] = qty;
        }
      });
    });
    const groceryList = Object.entries(groceryMap).map(([key, quantity]) => {
      const [name, measurement] = key.split("|");
      return { name, measurement, quantity };
    });
    return groceryList;
  };

  return (
    <div className="bg-blue-100 w-full h-full p-4">
      <h1 className="text-black text-5xl text-center front-extrabold mb-6">
        My Recipes
      </h1>
      <br />
      <Nav />
      {/* Instructions */}
      <div className="bg-white p-4 rounded shadow mb-6">
      <p className="text-lg mb-5 mt-10">Select the recipes you would like to create a grocery list for, using the checkboxes. 
        Edit quantity or measurement if needed and click confirm changes. Changes within edit won't reflect until after the next step.
        Next click "Create Grocery List" when you're ready to combine selected recipes!</p>
      </div>
      {/* saved recipe card */}
      <div className="p-4">
        {allRecipes.map((recipe, index) =>
          editingRecipe && recipe.name === recipeToEdit.name ? (
            <div className="bg-white m-4 p-4 rounded shadow">
              <h1 className="text-lg font-semibold mt-2">{recipe.name}</h1>
              {recipe.recipe.map((ingredient) => (
                <div className="flex items-center gap-2">
                  <h1>{ingredient.name}</h1>
                  <input
                    className="p-1 rounded border border-gray-300 w-1/11"
                    placeholder="Enter quantity"
                    defaultValue={ingredient.quantity}
                    onChange={(e) => {
                      const currentIngredients = recipeToEdit.recipe;
                      currentIngredients.map((cIngredient) => {
                        if (cIngredient.name === ingredient.name) {
                          cIngredient.quantity = e.target.value;
                        }
                      });
                      setRecipeToEdit((previousValue) => ({
                        ...previousValue,
                        recipe: currentIngredients,
                      }));
                    }}
                  ></input>

                  <select
                    className="p-1 rounded border border-gray-300 w-1/6"
                    defaultValue={ingredient.measurement}
                    onChange={(e) => {
                      const currentIngredients = recipeToEdit.recipe;
                      currentIngredients.map((cIngredient) => {
                        if (cIngredient.name === ingredient.name) {
                          cIngredient.measurement = e.target.value;
                        }
                      });
                      setRecipeToEdit((previousValue) => ({
                        ...previousValue,
                        recipe: currentIngredients,
                      }));
                    }}
                  >
                    {measurementTypes.map((type) => (
                      <option>{type}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                className="ml-2 border border-gray-300 mt-5 px-2 py-1 rounded hover:bg-green-400"
                onClick={async () => {
                  // const response = await axios.patch("http://localhost:3000/update-recipe", {
                    const response = await axios.patch("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/update-recipe", {
                    
                      name: recipeToEdit.name,
                      newIngredients: newMQ,
                    }
                  );
                }}
              >
                Confirm changes
              </button>
            </div>
          ) : (
            <div key={index} className="bg-white m-4 p-4 rounded shadow">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold mt-2"> {recipe.name}</h2>
                <input
                  type="checkbox"
                  checked={selectedRecipes.includes(recipe.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRecipes((prev) => [...prev, recipe.name]);
                    } else {
                      setSelectedRecipes((prev) =>
                        prev.filter((item) => item !== recipe.name)
                      );
                    }
                  }}
                />
              </div>
              <div className="mt-3">
                {recipe.recipe.map((item, i) => (
                  <p key={i} className="text-lg">
                    • {item.quantity} {item.measurement} {item.name}
                  </p>
                ))}
              </div>

              <button
                className="ml-2 border border-gray-300 px-2 py-1 rounded hover:bg-red-400"
                onClick={async () => {
                  // const response = await axios.delete("http://localhost:3000/delete-recipe", {
                    const response = await axios.delete("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/delete-recipe", {
                    
                      data: {
                        name: recipe.name,
                      },
                    }
                  );
                  const currentRecipe = allRecipes;
                  const recipeToDelete = currentRecipe.filter(
                    (cRecipe) => cRecipe.name !== recipe.name
                  );
                  setAllRecipes(recipeToDelete);
                }}
              >
                Delete
              </button>
              <button
                className="ml-2 border border-gray-300 px-2 py-1 rounded hover:bg-red-400"
                onClick={() => {
                  setRecipeToEdit(recipe);
                  setEditingRecipe(true);
                  setNewMQ(recipe.recipe);
                }}
              >
                Edit
              </button>
            </div>
          )
        )}
        <button
          className="ml-2 border bg-white px-2 py-1 rounded hover:bg-green-300"
          onClick={async () => {
            const groceryList = generateGroceryList();
            try {
              // const response = await axios.post("http://localhost:3000/save-grocery-list",{
                  const response = await axios.post("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/save-grocery-list", {
                  items: groceryList,
                }
              );
              console.log(`Grocery List:${groceryList}`);
              navigate("/page2", {
                state: {
                  list: groceryList,
                },
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Create Grocery List
        </button>
      </div>
    </div>
  );
}
