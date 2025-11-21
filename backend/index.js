import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import {
  // categoryModels,
  ingredientSchema,
} from "./models/ingredient-schema.js";
import allIngredients from "./data/all-ingredients-data.js";
// import vegetableIngredients from "./data/vegetable-ingredients-data.js";
// import seafoodIngredients from "./data/seafood-ingredients-data.js";
// import meatIngredients from "./data/meat-ingredients-data.js";
// import fruitIngredients from "./data/fruit-ingredients-data.js";
// import dryCannedIngredients from "./data/dry-canned-ingredients-data.js";
// import dairyIngredients from "./data/dairy-ingredients-data.js";
// import condimentsIngredients from "./data/condiments-data.js";
// import bakingAndSpicesIngredients from "./data/bakingspices-ingredients-data.js";
import cors from 'cors'

// const categoriesData = [
//   vegetableIngredients,
//   seafoodIngredients,
//   meatIngredients,
//   fruitIngredients,
//   dryCannedIngredients,
//   dairyIngredients,
//   condimentsIngredients,
//   bakingAndSpicesIngredients,
// ];

const ATLAS_URI = process.env.ATLAS_URI;

await mongoose.connect(ATLAS_URI);
console.log("Connected to Mongoose");

// categoryModels.forEach((model, i) =>{
//     model.deleteMany({}),
//     model.create(categoriesData[i])
// });
const allIngredientsModel = mongoose.model("allIngredients", ingredientSchema);
await allIngredientsModel.deleteMany({});
console.log("Deleted all entries")
await allIngredientsModel.create(allIngredients);
console.log("Created all entries")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Its running!");
});

app.get("/all-ingredients", async (req, res) => {
  const ingredients = await allIngredientsModel.find({}); //schema model for all ingredients collection, gets all entries
  console.log("Sending data")
  res.send({
    data: ingredients, //sends ingredients from MongoDb to frontend
  });
});
app.get("/get-all-vegetables", async (req, res) => {
  const ingredients = await allIngredientsModel.find({ category: 'Vegetable' }); //schema model for all ingredients collection, gets all entries
  console.log("Sending data")
  res.send({
    data: ingredients, //sends ingredients from MongoDb to frontend
  });
});

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});
 