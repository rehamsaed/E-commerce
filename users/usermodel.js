const mongoose = require("mongoose");
const userSchema = require('./userschema')
const usermodel = mongoose.model("user", userSchema)
module.exports = usermodel
