import React, { useState, useEffect } from 'react';
import { addToCartApi, addToWishlistApi } from '../../Api/Api'
import './Product.css'
import { Link } from 'react-router-dom'
//import { Searchbar } from 'react-native-paper';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import axios from 'axios';
import NavigationBar from '../../nav/NavigationBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {


    axios.get('http://localhost:3000/dislayproduct')
      .then((response) => {
        setProducts(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  const handleAddToCart = (productId) => {
    addToCartApi(productId)
      .then((response) => {
        console.log(`Added to Cart`, response.data.message);
        if (response.data.message === 'Item is already in the cart') {
          toast.warning('Item is already in the cart', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  }
  const handleAddToWishlist = (productId) => {
    addToWishlistApi(productId)
      .then((response) => {
        console.log(`Added to Wishlist`, response);
      })
      .catch((error) => {
        console.error('Error adding to Wishlist:', error);
      });
  }

  return (
    <>
      <NavigationBar />
      <br />
      {/* <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      /> */}
      <Grid container spacing={2} className='productContainer'>
        {products.map((product) => (

          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card>
              <Link to={`/productview/${product._id}`} className="link-style">

                <CardMedia sx={{ objectFit: 'contain' }}


                  component="img"
                  alt={product.productName}
                  height="140"
                  style={{ padding: '15px' }}
                  image={product.pimage}
                  title={product.productName}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Link>
              <CardActions>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#563517', color: 'white' }}
                  onClick={() => {
                    handleAddToCart(product._id)
                    // TODO: Add to Cart functionality
                    console.log(`Added ${product.productName} to Cart`);
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  style={{ color: '#563517', borderColor: '#563517' }}
                  onClick={() => {
                    handleAddToWishlist(product._id)

                    console.log(`Added ${product.productName} to Wishlist`);
                  }}
                >
                  Add to Wishlist
                </Button>
              </CardActions>
            </Card>

          </Grid>


        ))}
      </Grid>
    </>
  );
};

export default ProductList;
