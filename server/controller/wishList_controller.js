const Wishlist = require('../model/wishlistSchema');

const addWishList = async (req, res) => {
    try {
        // const { userId, productId } = req.body

        console.log(req.body)
        const existingWishlistItem = await Wishlist.findOne({ userId: userId, productId: productId });
        console.log(existingWishlistItem)
        if (existingWishlistItem) {
            return res.status(400).json({
                message: 'Product is already in the wishlist',
                data: {
                    id: existingWishlistItem._id
                }
            });
        }


        const wishlistItem = new Wishlist({ userId: userId, productId: productId });
        console.log(wishlistItem)
        await wishlistItem.save();
        res.status(201).json({
            message: 'Product added to wishlist',
            data: {
                data: wishlistItem._id
            }
        }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to wishlist' });
    }
}

const displayWishlist = async (req, res) => {
    try {
        const userId = req.params.userId;

        const wishlistItems = await Wishlist.find({ userId: userId }).populate('productId');
        console.log(wishlistItems)

        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching wishlist' });
    }
}

const deleteWishlist = async (req, res) => {
    console.log("req", req.params)

    try {
        const deletedCartItem = await Wishlist.deleteOne({ _id: req.params.Id });

        if (deletedCartItem.deletedCount > 0) {
            res.status(200).json({ message: 'Item removed from wishlist' });
        } else {
            res.status(404).json({ message: 'Item not found ' });
        }
    }
    catch (error) {
        console.error('Error removing item from whishlist:', error);
        res.status(500).json({ message: 'Error removing item from whishlist' });
    }

}
module.exports.addWishList = addWishList;
module.exports.displayWishlist = displayWishlist;
module.exports.deleteWishlist = deleteWishlist;