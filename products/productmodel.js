const mongoose = require("mongoose");
const productschema = require('./productschema')
const productmodel = mongoose.model("products",productschema)
module.exports = productmodel
