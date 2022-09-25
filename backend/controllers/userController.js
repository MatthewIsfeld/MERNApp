//this file will contain all of our controller functions

//login function

const loginUser = async (req, res) => {
    res.status(200).json({message: "This is the /login route"});
}

const signupUser = async (req, res) => {
    res.status(200).json({message: "This is the /signup route"});    
}

//export our controller functions so we can use them in our routers
module.exports = {
    loginUser,
    signupUser
}