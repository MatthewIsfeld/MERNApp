//this piece of middleware will be used to check if a token is valid in a request, we will use this to protect API routes
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const authorizationCheck = async (req, res, next) => {
    //check if the user has sent a token in the header of their request
    const {authorization} = req.headers;

    //if the user has not sent an authorization we should not continue, we return
    if (!authorization) {
        res.status(401).json({error: "Must send authorization header in request"});
    }

    //if the user has sent an authorization header we need to get the token
    const token = authorization.split(' ')[1];

    try {
        //get the user's id from the payload of the token
        const {_id} = jwt.verify(token, process.env.SECRET);

        //search for the user and if they exist get just the user's id from the document and attach it to the request object
        req.user = await User.findOne(_id).select('_id');
        next();
    } catch (error) {
        //if any errors occur return the error
        res.status(401).json({error: error.message});
    }
}