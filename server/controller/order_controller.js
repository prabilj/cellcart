const { Long } = require('mongodb');
const Order = require('../model/orderSchema')
const createOrder = async (req, res) => {
    try {
        const { userId } = req.params
        const { totalAmount, orderDetails, paymentMethod, addressId } = req.body;
       // console.log("orderDetails", orderDetails);

        const newOrder = new Order({
            userId,
            totalAmount,
            orderDetails,
            paymentMethod,
            addressId
        });
        //console.log("newOrder", newOrder);

        await newOrder.save();

        res.status(200).json({ message: "New order created successfully", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the new order" });
    }
}
const getOrders = async (req, res) => {
    // console.log("heyyyy")

    try {
        const orders = await Order.find({}).populate('orderDetails.productId').populate('userId')
        // console.log(orders)

        res.json({
            message: "Orders retrieved successfully",
            data: {
                orders
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving orders" });
    }
}
const getOrderById = async (req, res) => {
    try {
        const { userId } = req.params
        i
        const orders = await Order.find({ userId }).populate('orderDetails.productId')
        res.json({
            message: "Order retrieved successfully",
            data: {
                orders

            }
        });

    }
    catch (error) {

    }
}

const updateOrder = async (req, res) => {
    //console.log("req.params", req.params)
    //console.log("req.body", req.body)
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Update the status of the found order
        order.status = status;
        await order.save();

        res.json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the order status" });
    }
}




module.exports.createOrder = createOrder;
module.exports.getOrders = getOrders;
module.exports.getOrderById = getOrderById;
module.exports.updateOrder = updateOrder;