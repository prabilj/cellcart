const Product = require('../model/productSchema')

const newProduct = async (request, response) => {
    console.log("inside new product", request.body)
    try {
        const newProduct = new Product(request.body);
        await newProduct.save();
        response.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'Error creating product' });
    }
}
const newProducts = async (request, response) => {
    try {
        const products = request.body;
        const insertedProducts = await Product.insertMany(products);

        response.status(201).json({ message: 'Products created successfully', insertedProducts });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error creating products' });
    }
};





const dislayProducts = async (req, res) => {
    try {
        const { search = '', minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, brandFilter = '' } = req.query;
       // console.log("req.query", req.query);

        const queryConditions = {};

        if (search) {
            queryConditions.$or = [
                { productName: { $regex: new RegExp(search, 'i') } },
                { Display: { $regex: new RegExp(search, 'i') } },
                { Processor: { $regex: new RegExp(search, 'i') } },
                { Camera: { $regex: new RegExp(search, 'i') } },
                { Battery: { $regex: new RegExp(search, 'i') } },
                { Storage: { $regex: new RegExp(search, 'i') } },
                { Description: { $regex: new RegExp(search, 'i') } },
            ];
        }

        if (minPrice || maxPrice) {
            queryConditions.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
        }
        if (brandFilter) {
            queryConditions.brand = { $regex: new RegExp(brandFilter, 'i') };
        }
        const products = await Product.find(queryConditions);

        res.status(200).json({ data: products });
    } catch (error) {
        console.error('Error fetching/displaying products:', error);
        res.status(500).json({ message: 'Error while displaying products' });
    }
}
const getProduct = async (request, response) => {
    try {
        console.log("request", request.params);
        const display = await Product.findOne({ _id: request.params._id });
        console.log(request.params._id)
        if (display) {
            response.status(200).json({ data: display });
        } else {
            response.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error while fetching product' });
    }
}

const deleteProduct = async (request, response) => {
    try {
        const del = await Product.deleteOne({ _id: request.params.productId })
        // console.log(request.params.productId)
        if (del) {
            response.status(200).json(
                {
                    message: "product deleted",
                    daat: del
                });
        }
        else {
            response.status(404).json({ message: 'Product not found' });
        }

    } catch (error) {
        response.status(404).json({ message: 'error on delete' });

    }

}
const updateProduct = async (req, res) => {
    try {
        console.log("req.body", req.body)
        const parms = req.params.productId
        const updatedDetails = req.body
        const updatedProduct = await Product.findByIdAndUpdate(parms, { $set: updatedDetails }, { new: true });

        if (updatedProduct) {
            res.json({
                message: 'Product details updated successfully',
                data: {
                    data: updatedProduct
                }
            });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {

        console.error('Error updating product details:', error);
        res.status(500).json({ message: 'Error updating product details' });
    }

}
const searchProducts = async (request, response) => {
    try {
        const searchTerm = request.params.searchTerm;
        const regex = new RegExp(searchTerm, 'i');

        const searchResults = await Product.find({
            $or: [
                { productName: { $regex: regex } },
                { description: { $regex: regex } },
                { Display: { $regex: regex } }
            ]
        });

        if (searchResults.length > 0) {
            response.status(200).json(searchResults);
        } else {
            response.status(404).json({ message: 'No matching products found' });
        }
    } catch (error) {
        console.error('Error searching products:', error);
        response.status(500).json({ message: 'Error searching products' });
    }
}




module.exports.newProduct = newProduct;
module.exports.newProducts = newProducts;
module.exports.dislayProducts = dislayProducts;
module.exports.getProduct = getProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.searchProducts = searchProducts;

