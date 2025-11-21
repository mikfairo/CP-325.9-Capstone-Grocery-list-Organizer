import { useState } from "react";
import Nav from "../components/Nav";
import Form from "../components/Form";
import "../index.css";
import { useEffect } from "react";
import { useRef } from "react";

function HomePage() {
  
  const [inputText, setInputText] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [recipeSelections, setRecipeSelections] = useState([])
  const inputRef = useRef();

 
  useEffect(() => {
   const fetchIngredients = async () => {
    const response = await fetch('http://localhost:3000/all-ingredients')
    console.log(response)
    const ingredients = await response.json()
    const data = ingredients.data
    setAllIngredients(data)
   } 
   fetchIngredients();
  }, []); //loads all ingredient data
  
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
      <br />
      <Nav/>
      {recipeSelections.map((recipe) => (
        <h1>{recipe}</h1>
      ))}
      <div className="flex justify-center mt-6">
        <input
          placeholder="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          ref={inputRef}
          className="p-2 rounded border border-gray-400 w-1/2"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.name}
            className="bg-white w-90 rounded-lg shadow-md p-3 text-center"
          >
  
            <div className="aspect-square w-full overflow-hidden rounded-md">
            <img
              src={ingredient.thumbnail}
              alt={ingredient.name}
              className="w-full h-full object-cover "
              onClick={() => { 
                setRecipeSelections(prev => [...prev, ingredient.name])
                setInputText('')
                setFilteredIngredients([])
                inputRef.current.value = ''
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
