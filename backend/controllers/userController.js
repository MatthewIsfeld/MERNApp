//this file will contain all of our controller functions
//import our User model
const User = require ('../models/userModel.js');

//login function
const loginUser = async (req, res) => {
    res.status(200).json({message: "This is the /login route"});
}

const signupUser = async (req, res) => {
    //get the email and password from the user's request
    const {email, password} = req.body;

    //attempt to create a user, in our singup function we throw errors if there is a problem so use a try catch block
    try {
        const user = await User.signup(email, password);
        
        res.status(200).json({ user });       
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