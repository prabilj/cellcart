import React, { useState } from 'react';
import './ViewProduct.css'; 
import Sidebar from '../Sidebar/Sidebar';

const ViewProducts = () => {
  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 29.99,
    },
    // Add more product objects as needed
  ]);

  // Function to update a product by ID
  const updateProduct = (id) => {
    // Implement your update logic here
    alert(`Update product with ID ${id}`);
  };

  // Function to delete a product by ID
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="products-page">
        <h1 className="page-title">Products</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price.toFixed(2)}</p>
              <div className="buttoncontainer">
                <button className="update-button" onClick={() => updateProduct(product.id)}>Update</button>
                <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
