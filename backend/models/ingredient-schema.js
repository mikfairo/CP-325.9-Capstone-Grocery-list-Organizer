import mongoose from "mongoose";

const categoriesSet = [
  "Vegetable",
  "Seafood",
  "Meat",
  "Fruit",
  "Dry And Canned Goods",
  "Dairy",
  "Condiments",
  "Baking And Spices",
  "Other",
];

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  thumbnail: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: ""
  }
});


export {
  ingredientSchema,
};
