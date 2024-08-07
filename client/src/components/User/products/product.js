import React, { useState, useEffect } from 'react';
import { addToCartApi, addToWishlistApi, displayProductsApi } from '../../Api/Api';
import './Product.css';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Pagination,
  Box
} from '@mui/material';
import NavigationBar from '../../nav/NavigationBar';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../Header/Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState('');

  const brands = ["Google", "ASUS", "Lg", "Xiaomi", "OnePlus"];

  useEffect(() => {
    fetchData();
  }, [searchQuery, sortBy, minPrice, maxPrice, currentPage]);

  const fetchData = async () => {
    try {
      const response = await displayProductsApi({
        search: searchQuery,
        sortBy: sortBy,
        minPrice: minPrice,
        maxPrice: maxPrice,
        brandFilter: brandFilter
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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

  const handleFilterDialogOpen = () => {
    setIsFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setIsFilterDialogOpen(false);
  };

  const handleFilterSubmit = () => {
    fetchData()

    setIsFilterDialogOpen(false);
  };

  const handleReset = () => {

    setIsFilterDialogOpen(false);
    setBrandFilter('');
    setMinPrice('');
    setMaxPrice('');
    fetchData()
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
        <Button
          variant="outlined"
          onClick={handleFilterDialogOpen}
          style={{ color: '#563517' }}
        >
          Filter
        </Button>

        <Dialog open={isFilterDialogOpen} onClose={handleFilterDialogClose}>
          <DialogTitle style={{ backgroundColor: '#563517', color: '#fff', marginBottom: '20px', padding: '15px' }}>
            Filter Options
          </DialogTitle>
          <DialogContent>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel shrink={!!brandFilter} style={{ color: '#563517' }}>
                Select Brand
              </InputLabel>
              <Select
                label="Brand"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Select Brand
                </MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box width="48%">
                <InputLabel shrink={!!minPrice} style={{ color: '#563517' }}>
                  Min Price
                </InputLabel>
                <TextField
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  variant="outlined"
                  placeholder="Min Price"
                  fullWidth
                />
              </Box>

              <Box width="48%">
                <InputLabel shrink={!!maxPrice} style={{ color: '#563517' }}>
                  Max Price
                </InputLabel>
                <TextField
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  variant="outlined"
                  placeholder="Max Price"
                  fullWidth
                />
              </Box>
            </Box>
            {/* Add more filter options as needed */}
          </DialogContent>
          <DialogActions style={{ padding: '15px' }}>
            <Button
              onClick={handleReset}
              color="secondary"
              variant="outlined"
              style={{ marginRight: '10px' }}
            >
              Reset
            </Button>
            <Button
              onClick={handleFilterSubmit}
              color="primary"
              variant="contained"
              style={{ backgroundColor: '#563517' }} // Change this to the desired color
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

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
                  <span style={{ marginLeft: '10px' }}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} style={{ color: '#ffd700', fontSize: '24px' }}>
                       {index + 0.5 <= product.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </span>
                </CardContent>
              </Link>
              <CardActions>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#563517', color: 'white' }}
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  style={{ color: '#563517', borderColor: '#563517' }}
                  onClick={() => handleAddToWishlist(product._id)}
                >
                  Add to Wishlist
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <div className="pagination" style={{ marginBottom: '20px' }}>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={(event, value) => paginate(value)}
          color="primary"
          shape="rounded"
        />
      </div>
      <Footer style={{ marginTop: '20px' }} />
    </>
  );
};

export default ProductList;
