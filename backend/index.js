import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import {
  // categoryModels,
  ingredientSchema,
} from "./models/ingredient-schema.js";
import allIngredients from "./data/all-ingredients-data.js";
import recipeModel from "./models/recipe-models.js";
import groceryListModel from "./models/grocery-list-schema.js";

import cors from "cors";

const ATLAS_URI = process.env.ATLAS_URI;

await mongoose.connect(ATLAS_URI);
console.log("Connected to Mongoose");

// categoryModels.forEach((model, i) =>{
//     model.deleteMany({}),
//     model.create(categoriesData[i])
// });
const allIngredientsModel = mongoose.model("allIngredients", ingredientSchema);
await allIngredientsModel.deleteMany({});
console.log("Deleted all entries");
await allIngredientsModel.create(allIngredients);
console.log("Created all entries");


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Its running!");
});

app.get("/all-ingredients", async (req, res) => {
  const ingredients = await allIngredientsModel.find({}); //schema model for all ingredients collection, gets all entries
  console.log("Sending data");
  res.send({
    data: ingredients, //sends ingredients from MongoDb to frontend
  });
});

app.get("/get-all-vegetables", async (req, res) => {
  const ingredients = await allIngredientsModel.find({ category: "Vegetable" });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-seafoods", async (req, res) => {
  const ingredients = await allIngredientsModel.find({ category: "Seafood" });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-meats", async (req, res) => {
  const ingredients = await allIngredientsModel.find({ category: "Meat" });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-fruits", async (req, res) => {
  const ingredients = await allIngredientsModel.find({ category: "Fruit" });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-dry-canned-goods", async (req, res) => {
  const ingredients = await allIngredientsModel.find({
    category: "Dry And Canned Goods",
  });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-dairy", async (req, res) => {
  const ingredients = await allIngredientsModel.find({ category: "Dairy" });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-condiments", async (req, res) => {
  const ingredients = await allIngredientsModel.find({
    category: "Condiments",
  });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-baking-and-spices", async (req, res) => {
  const ingredients = await allIngredientsModel.find({
    category: "Baking and Spices",
  });
  console.log("Sending data");
  console.log(ingredients);
  res.send({
    data: ingredients,
  });
});

app.get("/get-all-other", async (req, res) => {
  const ingredients = await allIngredientsModel.find({ category: "Other" });
  console.log("Sending data");
  res.send({
    data: ingredients,
  });
});

app.post("/save-recipe", async (req, res) => {
  console.log(req.body.data)
  await recipeModel.create(req.body.data)
  res.send({
    data: 'Saved data successfully'
  })
});
app.get("/get-all-recipes", async (req, res) => {
  const allRecipes = await recipeModel.find({});
  console.log("Sending data");
  res.send({
    data: allRecipes,
  });
});
app.delete("/delete-recipe", async (req, res) => {
  const deleteRecipe = await recipeModel.deleteOne({name:req.body.name})
    console.log(deleteRecipe)
    res.send("Success!");
})
app.patch("/update-recipe", async (req, res) => {
  const response = await recipeModel.updateOne(
    { name: req.body.name },
    { $set: { recipe: req.body.newIngredients } },
  )
 console.log(response)
  res.send({
    data: 'Updated recipe successfully'
  })
});
app.post("/save-grocery-list", async (req, res) => {
  console.log('called save grocery list endpoint')
  console.log(req.body.items)
  const newList = new groceryListModel({ ingredients: req.body.items});
  await newList.save();
  res.send({
    data: 'Grocery list saved successfully'
  })
});

const port = process.env.PORT // render will pick a port for us

app.listen(port, () => {
  console.log("Listening on port: 3000");
});
