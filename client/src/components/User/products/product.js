import React, { useState, useEffect } from 'react';
import { addToCartApi, addToWishlistApi, displayProductsApi } from '../../Api/Api';
import './Product.css';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import NavigationBar from '../../nav/NavigationBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Change this based on the number of products you want per page

  useEffect(() => {
    displayProductsApi()
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (productId) => {
    addToCartApi(productId)
      .then((response) => {
        if (response.data.message === 'Item is already in the cart') {
          toast.warning('Item is already in the cart');
        } else if (response.data.message === 'Product added to cart') {
          toast.success('Product added to cart');
        }
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };

  const handleAddToWishlist = (productId) => {
    addToWishlistApi(productId)
      .then((response) => {
        if (response.data.message === 'Product added to wishlist') {
          toast.success('Product added to wishlist');
        } else if (response.data.message === 'Product is already in the wishlist') {
          toast.warning('Product is already in the wishlist');
        }
      })
      .catch((error) => {
        console.error('Error adding to wishlist:', error);
      });
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'name') {
        return a.productName.localeCompare(b.productName);
      }
      return 0;
    })
    .filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavigationBar />
      <br />
      <div className="search-and-filters">
        <TextField
          label="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
        />
        <FormControl variant="outlined">
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2} className="productContainer">
        {currentProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card>
              <Link to={`/productview/${product._id}`} className="link-style">
                <CardMedia
                  sx={{ objectFit: 'contain' }}
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
                    handleAddToCart(product._id);
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  style={{ color: '#563517', borderColor: '#563517' }}
                  onClick={() => {
                    handleAddToWishlist(product._id);
                  }}
                >
                  Add to Wishlist
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <div className="pagination">
        <ul className="pagination-list">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map(
            (_, index) => (
              <li key={index} className="pagination-item">
                <button onClick={() => paginate(index + 1)} className="pagination-link">
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
