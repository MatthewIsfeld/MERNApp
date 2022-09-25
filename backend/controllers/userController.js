//this file will contain all of our controller functions
//import our User model
const User = require ('../models/userModel.js');

//login function
const loginUser = async (req, res) => {
    res.status(200).json({message: "This is the /login route"});
}

const signupUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.signup(email, password);
    res.status(200).json({ user });
}

//export our controller functions so we can use them in our routers
module.exports = {
    loginUser,
    signupUser
}