//use the dotenv library to handle environment variables
require('dotenv').config();

//import express
const express = require('express');

//create express app
const app = express();

//listen to a port
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`);
})

//test /login route
app.get('/login', (req, res) => {
    res.status(200).json({message: "This is the /login route"});
})

