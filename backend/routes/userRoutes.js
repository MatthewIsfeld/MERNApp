//this file will contain all our routes related to users
const express = require('express');
const {loginUser, signupUser} = require('../controllers/userController.js');

//create a router using express
const router = express.Router();

//create a login route
router.post('/login', loginUser);

//create a signup route
router.post('/signup', signupUser);

//export our router so it can be used
module.exports = router;