const mongoose = require('mongoose');


const UserScehma = mongoose.Schema({
    username:{
        type:String,
        required:[true , 'User must have a username']
    },
    email:{
        type:String,
        required:[true , 'User must have a email address'],
        unique: [true, 'User is Already Registered']
    },
    password:{
        type:String,
        required:[true , 'User must have a password']
    } 
})

const User = mongoose.model('User' , UserScehma) ;

module.exports = User;