const userAddress = require('../model/userAddressSchema');
const { resetPassword } = require('./user_controller');

const addAddress = async (req, res) => {
    try {

        const data = req.body
        console.log(req.body);

        const saveAddress = await userAddress.create(data);

        res.status(201).json({ message: 'Address added successfully', saveAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while adding the address' });
    }
};
const getAddress = async (req, res) => {
    try {

        const display = await userAddress.find({ userId: req.params.userId });
        //console.log(request.params._id)

        if (display) {
            res.status(200).json({
                data:
                    { data: display }
            });
        } else {
            res.status(404).json({ message: ' no address found' });
        }
    } catch (error) {

        console.error(error);
        response.status(500).json({ message: 'Error while fetching address' });
    }


}
const removeAddress = async (req, res) => {
    try {


        console.log("req.params", req.params);
        const del = await userAddress.deleteOne({ _id: req.params._id })
        // console.log(request.params.productId)
        if (del) {
            res.status(200).json(
                {
                    message: "address deleted",
                    daat: del
                });
        }
        else {
            res.status(404).json({ message: 'address not found' });
        }

    } catch (error) {
        res.status(404).json({ message: 'error on delete' });

    }

}

module.exports.addAddress = addAddress;
module.exports.getAddress = getAddress;
module.exports.removeAddress = removeAddress;

