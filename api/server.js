import express from 'express';
import mongoose from "mongoose";

import 'dotenv/config'

const app = express();

app.use(express.json())


app.get('/api', (req, res) => {
    res.send('Welcome to the home route');
} )

try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database connected')
    app.listen(5000, () => {
        console.log('Applicaton is running on PORT 5000')
    })
  } catch (error) {
    console.log('Error connecting to database')
    throw new Error;
  }

