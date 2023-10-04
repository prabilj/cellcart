// wishlistFunctions.js
import axios from 'axios';

export const handleWishlistToggle = async (productId, isInWishlist, currentWishlistId) => {
    const formData = {
        userId: localStorage.getItem('uId'),
        productId: productId
    };

    try {
        if (isInWishlist) {
            // Remove from wishlist
            await axios.delete(`http://localhost:3000/removewishlist/${currentWishlistId}`);
            return { success: true, message: "Product removed from wishlist" };
        } else {
            // Add to wishlist
            const response = await axios.post('http://localhost:3000/addwishlist', formData);
            localStorage.setItem("wishlistId", response.data.data.data);
            return { success: true, message: "Product added to wishlist", newWishlistId: response.data.data.data };
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.data) {
            const errorMessage = error.response.data.data.message;
            if (errorMessage === "Product is already in the wishlist") {
                localStorage.setItem("wishlistId", error.response.data.data.id);
                alert("Product is already in the wishlist");
                return { success: true, message: "Product is already in the wishlist" };
            }
        }
        console.error("Error in handleWishlistToggle:", error);
        return { success: false, message: "An error occurred" };
    }
};
