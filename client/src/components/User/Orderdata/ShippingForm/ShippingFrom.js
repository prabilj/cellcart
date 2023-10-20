import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./ShippingForm.css";

const ShippingForm = () => {
    const location = useLocation();
    console.log(location)
    const cartItems = location.state ? location.state : [];
    console.log("cartItems", cartItems)
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        province: "",
        postcode: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const countryOptions = ["India", "United States", "Canada", "Other"];


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="shipping-main-container">
            <div className="shipping-data-container">
                <form onSubmit={handleSubmit}>
                    <h2>Shipping Address</h2>
                    <div className="shipping-form">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                        />

                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Select Country
                            </option>
                            {countryOptions.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                        />


                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                        />

                        <button type="submit">Place Order</button>
                    </div>
                </form>
            </div>
            <div className="order-details">
                <h2>Order Details</h2>

            </div>
        </div>
    );
};

export default ShippingForm;
