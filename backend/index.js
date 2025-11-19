import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
const ATLAS_URI = process.env.ATLAS_URI;

await mongoose.connect(ATLAS_URI);

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Its running!');
});

app.listen(3000, () => {
    console.log("Listening on port: 3000");
})