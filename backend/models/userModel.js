const mongoose = require('mongoose');

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
    const user = await this.create({email, password});
    return user;
}

//export our schema as a model so we can use it elsewhere
module.exports = mongoose.model('User', userSchema);