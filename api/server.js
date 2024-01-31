import express from 'express';
import mongoose from "mongoose";
import 'dotenv/config'

import AuthRoute from './routes/AuthRoute.js'

// app initialization
const app = express();

// midleware
app.use(express.json())

// home route
app.get('/api', (req, res) => {
    res.send('Welcome to the home route');
})

// other routes
app.use('/api/auth', AuthRoute)


// database and application connection
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

