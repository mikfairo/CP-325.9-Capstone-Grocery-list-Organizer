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
];

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    default: "",
  },
});

const categoryModels = [];

categoriesSet.forEach((category) => {
  categoryModels.push(mongoose.model(category, ingredientSchema));
});

export {
  categoryModels,
  categoriesSet,
};
