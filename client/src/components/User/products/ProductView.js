import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../../nav/NavigationBar';
import { Button,CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCartApi } from '../../Api/Api';
import { useAuth } from '../../contexts/AuthContexts'
import Swal from 'sweetalert2'
import './ProductView.css';
import Footer from '../../Header/Footer';

const ProductView = () => {
  const navigate = useNavigate();
  const { cart } = useAuth();
  const { _id } = useParams();
  const [productsDetails, setproductsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState();

  const details = {

    productId: productsDetails,
    quantity: 1
  }

  console.log("details is", details)

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${_id}`)
      .then(response => {
        setproductsDetails(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(true);
      });
  }, [_id]);

  const handleWishlistToggle = async () => {
    const formData = {
      userId: localStorage.getItem('uId'),
      productId: _id

    };

    const Id = wishlistId;

    if (isInWishlist) {

      await axios.delete(`http://localhost:3000/users/wishlist/${Id}`)
        .then(response => {
          console.log("deletesuccess", response.data.data);
          setIsInWishlist(false);
        })
        .catch(error => {
          console.log(error);
        });
    } else {

      await axios.post(`http://localhost:3000/users/wishlist`, formData)
        .then(response => {
          console.log("addwishlistresponce", response.data.data.data);
          localStorage.setItem("wishlistId", response.data.data.data);
          setIsInWishlist(true);
          setWishlistId(response.data.data.data);
        })
        .catch(error => {
          //console.log("errId", error.response.data.data.id);
          const whishId = error.response.data.data.id;
          const message = error.response.data.message;

          if (message === "Product is already in the wishlist") {
            setIsInWishlist(true);
            setWishlistId(whishId);
          }
        });
    }
  };

  const handleAddToCart = (productId) => {
    addToCartApi(productId)
      .then((response) => {
        console.log(`Added to Cart`, response.data.message);
        if (response.data.message === 'Item is already in the cart') {
          toast.warning('Item is already in the cart', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (response.data.message === 'Product added to cart') {
          toast.success('Product added to cart', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };
  const handleBuyItem = () => {
    console.log("productCount", productsDetails.productCount);
    // if (productsDetails.productCount > 0) {
    navigate('/checkout');
    cart([details]);
    // } else {
    //   Swal.fire({
    //     title: 'Out of Stock',
    //     text: 'This product is currently out of stock.',
    //     icon: 'error',
    //     confirmButtonText: 'OK'
    //   });
    // }
  };


  return (
    <>
      <NavigationBar />
      <div className='view-container'>
        {loading ? (
          <CircularProgress/>
        ) : (
          <>
            <div>
              <img src={productsDetails.pimage} alt='logo' className='view-image' />
            </div>
            <div className='viewlist'>
              <div className={`favotate_btn ${isInWishlist ? 'in-wishlist' : ''}`} onClick={handleWishlistToggle}>
                <FavoriteIcon style={{ color: isInWishlist ? 'red' : 'rgb(79, 14, 14)' }} />
              </div>
              <h1>{productsDetails.productName}</h1>
              <div className='box-div'>
                <h3>Display:{productsDetails.Display}</h3>
                <h3>Processor:{productsDetails.Processor}</h3>
                <h3>Camera:{productsDetails.Camera}</h3>
                <h3>Battery:{productsDetails.Battery}</h3>
                <h3>Storage:{productsDetails.Storage}</h3>
                <p className='Description'>Description :{productsDetails.Description}</p>
                <h3>${productsDetails.price}</h3>
              </div>
              <Button
                variant="contained"
                size='large'
                style={{ backgroundColor: '#563517', color: 'white', marginRight: "100px" }}
                onClick={handleBuyItem}
              >
                Buy
              </Button>
              <Button
                variant="outlined"
                size='large'
                style={{ color: '#563517', borderColor: '#563517' }}
                onClick={() => {
                  handleAddToCart(_id);
                }}
              >
                Add to cart
              </Button>
            </div>
          </>
        )}
      </div>
      
      <Footer/>
    </>
  );
}

export default ProductView;
