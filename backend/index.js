import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import { categoryModels } from './models/ingredient-schema.js';
import vegetableIngredients from './data/vegetable-ingredients-data.js';
import seafoodIngredients from './data/seafood-ingredients-data.js';
import meatIngredients from './data/meat-ingredients-data.js';
import fruitIngredients from './data/fruit-ingredients-data.js';
import dryCannedIngredients from './data/dry-canned-ingredients-data.js';
import dairyIngredients from './data/dairy-ingredients-data.js';
import condimentsIngredients from './data/condiments-data.js';
import bakingAndSpicesIngredients from './data/bakingspices-ingredients-data.js';

const categoriesData = [
    vegetableIngredients,
    seafoodIngredients,
    meatIngredients,
    fruitIngredients,
    dryCannedIngredients,
    dairyIngredients,
    condimentsIngredients,
    bakingAndSpicesIngredients,
];

const ATLAS_URI = process.env.ATLAS_URI;

await mongoose.connect(ATLAS_URI);
console.log("Connected to Mongoose");

categoryModels.forEach((model, i) =>{
    model.deleteMany({}), 
    model.create(categoriesData[i])
});

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Its running!');
});

app.listen(3000, () => {
    console.log("Listening on port: 3000");
})