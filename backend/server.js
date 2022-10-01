//use the dotenv library to handle environment variables
require('dotenv').config();
//import express
const express = require('express');
const mongoose = require('mongoose');
//import our user router
const userRouter = require('./routes/userRoutes.js');
const privateRecipeRouter = require('./routes/privateRecipeRoutes.js');

//create express app
const app = express();

//use express.json() to allow for our backend to take json data in requests
app.use(express.json());

//connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen to a port, we only want to listen to a port once we are connected to the database
        app.listen(process.env.PORT, () => {
            console.log(`The Server is connected to the database and is listening on port: ${process.env.PORT}`);
        })
    })

//user the user router to handle all routes related to the user
app.use('/app/user', userRouter);

app.use('/app/privateRecipes', privateRecipeRouter);

