
const Cart = require('../model/cartSchema')
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log(req.body); 
        const cartEntry = new Cart({
            userId,
            productId,
            quantity,
        });

        const cartDetails = await cartEntry.save();

        res.json({
            message: 'Product added to cart',
            data: {
                data: cartDetails._id
            }
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
}
const deleteFromCart = async (req, res) => {
    try {
        const deletedCartItem = await Cart.deleteOne({ _id: req.params.cartId });

        if (deletedCartItem.deletedCount > 0) {
            res.status(200).json({ message: 'Item removed from cart' });
        } else {
            res.status(404).json({ message: 'Cart entry not found' });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
}
const displayCart = async (request, response) => {

    try {
        const userId = request.params.userId;
        console.log(userId);
        const cartItems = await Cart.find({ userId: userId}).populate('productId');
        response.status(200).json({
            data: {
                data: cartItems
            }
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Error fetching cart items' });
    }

}
const updateQuantity = async (req, res) => {
    try {
        console.log("inside the update quantity")
      const cartId = req.params.cartId;
      const { quantity } = req.body;
  
      const cartItem = await Cart.findOne({ _id: cartId });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      cartItem.quantity = quantity;
      const updatedCartItem = await cartItem.save();
  
      res.status(200).json({ message: 'Cart item quantity updated', data: updatedCartItem });
      console.log(updatedCartItem)
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      
      res.status(500).json({ message: 'Error updating cart item quantity' });
    }
  }                                                                                                                                                                     
  

  


  


module.exports.deleteFromCart = deleteFromCart;
module.exports.addToCart = addToCart;
module.exports.displayCart = displayCart;
module.exports.updateQuantity=updateQuantity;
