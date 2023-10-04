// src/components/AddProduct.js

import React, { useState } from 'react';
import axios from 'axios';
import './Addproduct.css'
import Sidebar from '../Sidebar/Sidebar';

function AddProduct() {
    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productDescription: '',
        productImage: null,
        // Add more fields here
        // Example:
        productCategory: '',
        productBrand: '',
    });

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        setProduct({
            ...product,
            [name]: name === 'productImage' ? files[0] : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('productPrice', product.productPrice);
        formData.append('productDescription', product.productDescription);
        formData.append('productImage', product.productImage);
        // Append more fields here
        // Example:
        formData.append('productCategory', product.productCategory);
        formData.append('productBrand', product.productBrand);

        try {
            const response = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                alert('Product added successfully!');
                // Clear form after successful submission
                setProduct({
                    productName: '',
                    productPrice: '',
                    productDescription: '',
                    productImage: null,
                    // Reset more fields here
                    // Example:
                    productCategory: '',
                    productBrand: '',
                });
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (

        <div className="add-product-container">
            <Sidebar/>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={product.productName}
                    onChange={handleInputChange}
                    required
                />
                {/* Add other input fields for price, description, and image */}
                <label htmlFor="productImage">Product Image:</label>
                <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={handleInputChange}
                    accept="image/*"
                    required
                />
                {/* Add more fields here */}
                {/* Example:
                <label htmlFor="productCategory">Product Category:</label>
                <input
                    type="text"
                    id="productCategory"
                    name="productCategory"
                    value={product.productCategory}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="productBrand">Product Brand:</label>
                <input
                    type="text"
                    id="productBrand"
                    name="productBrand"
                    value={product.productBrand}
                    onChange={handleInputChange}
                    required
                />
                */}
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
