import React, { useState, useEffect } from 'react';
import { addToCartApi, removeFromWishlistApi } from '../../Api/Api';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import NavigationBar from '../../nav/NavigationBar';
import './Wishlist.css';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const userId = localStorage.getItem('uId');

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}/wishlist`)
            .then((response) => {
                console.log("responseData", response.data);
                setWishlistItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching wishlist items:', error);
            });
    }, [userId]);

    const handleRemoveItem = async (itemId) => {
        try {
            await removeFromWishlistApi(itemId);
            setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } catch (error) {
            console.error('Error removing wishlist item:', error);
        }
    };

    const handleAddToCart = async (productId, itemId) => {
        try {
            await addToCartApi(productId);
            await removeFromWishlistApi(itemId);
            setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="wishlist-container">
                <h1 className="wishlist-header">Wishlist</h1>
                {wishlistItems.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <ul>
                        {wishlistItems.map((item) => (
                            <li key={item._id} className="wishlist-item">
                                <div className="item-details">
                                    <img src={item.productId.pimage} alt='logo' style={{ width: '40px', height: '40px' }} />
                                    <p>{item.productId.productName}</p>
                                    <p>${item.productId.price}</p>
                                </div>
                                <IconButton className="add-to-cart-button" onClick={() => handleAddToCart(item.productId._id, item._id)}>
                                    <AddShoppingCartIcon />
                                </IconButton>
                                <IconButton className="remove-button" onClick={() => handleRemoveItem(item._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Wishlist;
