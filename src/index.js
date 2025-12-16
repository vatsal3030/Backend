import { configDotenv } from 'dotenv';
import express from 'express';
configDotenv();

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Helloooo")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


// console.log("hello")