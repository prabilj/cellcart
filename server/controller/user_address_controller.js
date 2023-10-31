const userAddress = require('../model/userAddressSchema');

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


module.exports.addAddress = addAddress; 
