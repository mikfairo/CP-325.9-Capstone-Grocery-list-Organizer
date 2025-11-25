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
const groceryListModel = await mongoose.model("grocery list", groceryListSchema);

export default groceryListModel;