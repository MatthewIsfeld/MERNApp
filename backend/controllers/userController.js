//this file will contain all of our controller functions
//import our User model
const User = require ('../models/userModel.js');
const jwt = require('jsonwebtoken');

//function to create a token
const createToken = (email, _id) => {
    return jwt.sign({email, _id}, process.env.SECRET, {expiresIn: '1d'});
}

//login function
const loginUser = async (req, res) => {
    //get the email and password from the user's request
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        //if we are successful in logging in create a token and send it back to the user
        const token = createToken(user.email, user._id);
        res.status(200).json({ email, token });  
    } catch (error) {
        //if there is an error send the error back to the user
        res.status(400).json({error: error.message});          
    }
}

const signupUser = async (req, res) => {
    //get the email and password from the user's request
    const {email, password} = req.body;

    //attempt to create a user, in our singup function we throw errors if there is a problem so use a try catch block
    try {
        const user = await User.signup(email, password);
        
        //if we are successful in signing up create a token and send it back to the user
        const token = createToken(user.email, user._id);
        res.status(200).json({ email, token });       
    } catch (error) {
        //if there is an error send the error back to the user
        res.status(400).json({error: error.message});   
    }

}

//export our controller functions so we can use them in our routers
module.exports = {
    loginUser,
    signupUser
}