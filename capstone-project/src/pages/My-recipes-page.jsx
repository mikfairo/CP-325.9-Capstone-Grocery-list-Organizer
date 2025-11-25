import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../index.css";
import axios from "axios";

export default function MyRecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
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
    <div className="bg-blue-100 w-full h-full">
      <h1 className="text-black text-5xl text-center front-extrabold">
        My Recipes
      </h1>
      <br />
      <Nav />
      {/* saved recipe card */}
      <div className="p-4">
        {allRecipes.map((recipe, index) => (
          <div key={index} className="bg-white m-4 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mt-2"> {recipe.name}</h2>

            <div className="mt-3">
              {recipe.recipe.map((item, i) => (
                <p key={i} className="text-lg">
                  • {item.quantity} {item.measurement} {item.name}
                </p>
              ))}
            </div>
            <button className= "ml-2 border border-gray-300 px-2 py-1 rounded hover:bg-red-400"
            onClick={async () => {
              const response = await axios.delete("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/delete-recipe", {
                data: {
                  name: recipe.name,
                }
              }); 
              const currentRecipe = allRecipes;
              const recipeToDelete = currentRecipe.filter(
                (cRecipe) => cRecipe.name !== recipe.name
                        );
              setAllRecipes(recipeToDelete);
            }}
            >delete</button>
            <input type="checkbox"
              checked= {selectedRecipes.includes(recipe.name)}
              onChange={(e) => {
                if(e.target.checked) {
                  setSelectedRecipes((prev) => [...prev, recipe.name]);
                } else {
                  setSelectedRecipes((prev) => prev.filter((recipe) => recipe !== recipe.name));
                }
              }}
            />
          </div>
        ))}
        <button className= "ml-2 border bg-white px-2 py-1 rounded hover:bg-green-300"
        onClick={async () => {
          const groceryList = generateGroceryList();
          try{
            const response = await axios.post("https://cp-325-9-capstone-grocery-list-organizer.onrender.com/save-recipe-list", {
              items: groceryList,
            })
             console.log("Grocery list saved:", response.data);
          } catch (err) {
         console.error("Failed to save grocery list:", err);
          alert("Failed to create grocery list. Please try again."); 
          }
        }}
        >Create Grocery List</button>
      </div>
    </div>
  )};
