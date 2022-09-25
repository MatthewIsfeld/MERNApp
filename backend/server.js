//use the dotenv library to handle environment variables
require('dotenv').config();
//import express
const express = require('express');
const mongoose = require('mongoose');
//import our user router
const userRouter = require('./routes/userRoutes.js');

//create express app
const app = express();

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

