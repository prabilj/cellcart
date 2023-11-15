import React, { useState, useEffect } from 'react';
import { updateQuantityApi, removeFromCartApi } from '../../Api/Api';
import './Cart.css';
import { Button, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import NavigationBar from '../../nav/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts'
import Footer from '../../Header/Footer';

const Cart = () => {
    const { cart } = useAuth();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('uId');
    const navigate = useNavigate(); // Define navigate here

    useEffect(() => {
        axios
            .get(`http://localhost:3000/users/${userId}/carts`)
            .then((response) => {
                console.log(response.data.data.data);
                setCarts(response.data.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    }, [userId]);

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            newQuantity = 1;
        }

        updateQuantityApi(itemId, newQuantity)
            .then((response) => {
                //const updatedCartItem = response;
                const updatedCarts = carts.map((item) => {
                    if (item._id === itemId) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
                setCarts(updatedCarts);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleRemoveItem = (itemId) => {
        removeFromCartApi(itemId)
            .then(() => {
                const updatedCarts = carts.filter((item) => item._id !== itemId);
                setCarts(updatedCarts);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const calculateTotal = () => {
        let total = 0;
        for (const item of carts) {
            total += item.productId.price * item.quantity;
        }
        return total.toFixed(2);
    };

    return (
        <>
            <NavigationBar />
            <div className="cart-container">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <h1 className="cart-header">Cart</h1>
                        {carts.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <>
                                <ul>
                                    {carts.map((item) => (
                                        <li key={item._id} className="cart-item">
                                            <div className="item-details">
                                                <img src={item.productId.pimage} alt='logo' style={{ width: '40px', height: '40px' }} />
                                                <div className="cart-details">
                                                    <p>{item.productId.productName}</p>
                                                    <p>${item.productId.price}</p>
                                                </div>
                                                <p>Total: ${item.productId.price * item.quantity}</p>
                                            </div>

                                            <div className='cart-quantity'>
                                                <IconButton onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>
                                                    <RemoveIcon style={{ color: '#563517', borderColor: '#563517' }} />
                                                </IconButton>
                                                {item.quantity}
                                                <IconButton onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>
                                                    <AddBoxIcon style={{ color: '#563517', borderColor: '#563517' }} />
                                                </IconButton>
                                            </div>
                                            <div className='btn-buy-del'>
                                                <Button
                                                    className='btn-buy'
                                                    variant="contained"
                                                    size='large'
                                                    style={{ backgroundColor: '#563517', color: 'white', marginRight: "10px" }}
                                                    onClick={() => {
                                                        navigate('/checkout');

                                                        cart([item])


                                                    }}>
                                                    Buy
                                                </Button>
                                                <IconButton className="remove-button" onClick={() => handleRemoveItem(item._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className='checkout' style={{ marginBottom: '20px' }}>
                                    <h3>Total: ${calculateTotal()}</h3>
                                    <Button
                                        className='checkout-button'
                                        variant="contained"
                                        size='large'
                                        style={{ backgroundColor: '#563517', color: 'white', marginTop: "10px" }}
                                        onClick={() => {
                                            navigate('/checkout');
                                            cart(carts)


                                        }}>

                                        Checkout
                                    </Button>

                                </div>

                            </>
                        )}

                    </>

                )}

            </div>
            <Footer style={{ marginBottom: '20px' }} />
        </>
    );
};

export default Cart;
