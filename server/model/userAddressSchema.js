const mongoose = require('mongoose');

const useraddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        max: 20
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    landMark: {
        type: String
    },
    postcode: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const userAddress = mongoose.model('usersAddress', useraddressSchema);

module.exports = userAddress;