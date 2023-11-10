const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    Display: {
        type: String
    },
    Processor: {
        type: String
    },
    Camera: {
        type: String
    },
    Battery: {
        type: String
    },
    Storage: {
        type: String
    },
    Description: {
        type: String
    },
    productCount:{
     type:Number
    },

    price: { type: Number },
    pimage: { type: String }
},
    {
        timestamps: true
    })

const Product = mongoose.model('products', productSchema);

module.exports = Product;