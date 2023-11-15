import React, { useEffect, useState } from 'react';
import { deleteProductApi, displayProductsApi } from '../../Api/Api';
import './ViewProduct.css';
import Sidebar from '../Sidebar/Sidebar';
import { CardMedia } from '@mui/material'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    displayProductsApi()
      .then((response) => {
        setProducts(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

  }, [])
  // Function to delete a product by ID
  const deleteProduct = async (_id) => {
    // Show a confirmation dialog using Swal
    Swal.fire({
      title: 'Delete Product?',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // User confirmed, delete the product
        const response = await deleteProductApi(_id);
        console.log(response);
        const updatedProducts = products.filter((product) => product._id !== _id);
        setProducts(updatedProducts);
        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
      } else {
        // User canceled the deletion
        Swal.fire('Cancelled', 'The product was not deleted.', 'error');
      }
    });
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="products-page">
        <h1 className="page-title">Products</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div>
                <CardMedia sx={{ objectFit: 'contain' }}


                  component="img"
                  alt={product.productName}
                  height="140"
                  style={{ padding: '15px' }}
                  image={product.pimage}
                  title={product.productName}
                />
                
              </div>
              <div>
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-description">{product.Description}</p>
                <p className="product-price">Price: ${product.price.toFixed(2)}</p>
              </div>
              <div className="buttoncontainer">
              <button className="update-button" onClick={() => navigate(`/editproduct/${product._id}`)}>Update</button>
                <button className="delete-button" onClick={() => deleteProduct(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
