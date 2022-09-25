const mongoose = require('mongoose');
//import bcrypt to hash password
const bcrypt = require('bcrypt');
//import validator to validate emails and passwords
const validator = require('validator');

const Schema = mongoose.Schema;

//create a schema for our users
//we want our users to have an email and a password, these should both be strings and the email should be unique
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//create a static function to sign up a user
userSchema.statics.signup = async function(email, password) {
    //perform validation before signing up a user
    
    //first check if all fields exist
    if (!email || !password) {
        throw Error("All fields must be filled out!");
    }

    //check if email is valid, if it isn't throw an error
    if(!validator.isEmail(email)) {
        throw Error("Email is invalid!");
    }

    //check if password is strong, if it isn't throw an error
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough!');
    }

    //once we have passed all the above checks we should check the database to see if the user exists
    //we do this by seeing if we can find one document in the database that contains the same email
    const result = await this.findOne({email});

    if (result) {
        throw Error("A user already exists with this email!");
    }

    //once we have verified that the user has entered a valid email and password, and that they are a new user we hash their password
    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(password, salt);

    //once we have our hashed password we create the user
    const user = await this.create({email, password: hash});
    return user;
}

//export our schema as a model so we can use it elsewhere
module.exports = mongoose.model('User', userSchema);