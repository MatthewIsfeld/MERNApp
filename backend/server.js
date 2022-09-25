//use the dotenv library to handle environment variables
require('dotenv').config();
//import express
const express = require('express');
//import our user router
const userRouter = require('./routes/userRoutes.js');

//create express app
const app = express();

//listen to a port
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`);
})

//user the user router to handle all routes related to the user
app.use('/app/user', userRouter);

