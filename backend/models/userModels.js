const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    role : String,

},{
    timestamps : true
})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel