const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        default: () => {
            // Generate a unique order ID using the current month, date, and time
            const currentDate = new Date();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month (1-12)
            const day = currentDate.getDate().toString().padStart(2, '0'); // Day (1-31)
            const hours = currentDate.getHours().toString().padStart(2, '0'); // Hours (0-23)
            const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Minutes (0-59)
            const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Seconds (0-59)
            return `ORDER-${month}${day}-${hours}${minutes}${seconds}`;
        },
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    totalAmount: { type: Number },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending",
    },
    orderDetails: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order

