import mongoose from "mongoose";

const recipeIngredient = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      measurement: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required:true,
      },
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  recipe: [recipeIngredient]
});

const recipeModel = mongoose.model('recipes', recipeSchema);

export default recipeModel;
