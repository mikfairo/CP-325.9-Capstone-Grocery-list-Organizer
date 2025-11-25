import mongoose from "mongoose";

const groceryIngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const groceryListSchema = new mongoose.Schema({
  ingredients: [groceryIngredientSchema],
});
const groceryListModel = mongoose.model("GroceryList", groceryListSchema);

export default groceryListModel;