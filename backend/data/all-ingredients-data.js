import vegetableIngredients from "./vegetable-ingredients-data.js";
import seafoodIngredients from "./seafood-ingredients-data.js";
import meatIngredients from "./meat-ingredients-data.js";
import fruitIngredients from "./fruit-ingredients-data.js";
import dryCannedIngredients from "./dry-canned-ingredients-data.js";
import dairyIngredients from "./dairy-ingredients-data.js";
import condimentsIngredients from "./condiments-data.js";
import bakingAndSpicesIngredients from "./bakingspices-ingredients-data.js";

const allCategories = [
  vegetableIngredients,
  seafoodIngredients,
  meatIngredients,
  fruitIngredients,
  dryCannedIngredients,
  dairyIngredients,
  condimentsIngredients,
  bakingAndSpicesIngredients,
];

const allIngredients = allCategories.flat();


export default allIngredients;