const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }
},
    {
        timestamps: true
    }

);

const Wishlist = mongoose.model('wishlist', wishlistSchema);

module.exports = Wishlist;