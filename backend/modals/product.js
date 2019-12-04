var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var productSchema = new mongoose.Schema({
    productId: {type: String, unique: true },
    productName: String,
    productPrice: Number
});

productSchema.plugin(uniqueValidator);
var Product = mongoose.model("Product",productSchema);

module.exports = Product;