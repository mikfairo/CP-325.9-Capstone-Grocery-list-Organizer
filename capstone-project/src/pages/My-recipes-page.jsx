import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import "../index.css";


export default function MyRecipesPage() {

const [allRecipes, setAllRecipes] = useState([]);
  

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:3000/get-all-recipes");
      console.log(response);
      const allRecipes = await response.json();
      const data = allRecipes.data;
      setAllRecipes(data);
      console.log(data)
    };
    fetchRecipes();
  }, []); //loads all recipes data

  return (
    <div className="bg-blue-100 w-full h-full">
      <h1 className="text-black text-5xl text-center front-extrabold">
        My Recipes
      </h1>
      <br />
      <Nav />
      {allRecipes.map(recipe => (
        <h1>Name: {recipe.name}</h1>
      ))}

    </div>
  );
}
