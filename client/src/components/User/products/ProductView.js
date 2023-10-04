
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios'

import NavigationBar from '../../nav/NavigationBar';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import { handleWishlistToggle } from './cartFunction'





import './ProductView.css'
import Loader from './Loader';
const ProductView = () => {

    const { _id } = useParams();
    // console.log("userId", userId)

    const [productsDetails, setproductsDetails] = useState([])
    const [loading, setLoading] = useState(true);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlistId, setWishlistId] = useState()
    useEffect(() => {
        console.log("productId", _id)

//

        axios.get(`http://localhost:3000/dislayproduct/${_id}`)
            .then(response => {
                //console.log(response.data.data)
                setproductsDetails(response.data.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setLoading(true)
            })
    }, [_id])
      const handleWishlistToggle = () => {

        const formData = {
            userId: localStorage.getItem('uId'),
            productId: _id
        }
        console.log(formData)
        const Id = wishlistId



        console.log("isInWishlist", isInWishlist)

        if (isInWishlist) {
            console.log("wishlistId", Id)
            // Remove from wishlist
            axios
                .delete(`http://localhost:3000/removewishlist/${Id}`)
                .then(response => {
                    console.log("deletesuccess", response.data.data);
                    setIsInWishlist(false);
                })
                .catch(error => {

                    console.log(error);
                });
        }
        else {

            axios
                .post('http://localhost:3000/addwishlist', formData)
                .then(response => {
                    console.log("addwishlistresponce", response.data.data.data);
                    localStorage.setItem("wishlistId", response.data.data.data)
                    setIsInWishlist(true);
                    setWishlistId(response.data.data.data)

                })
                .catch(error => {
                    console.log("errId", error.response.data.data.id);
                    const whishId = error.response.data.data.id
                    const message = error.response.data.message

                    if (message === "Product is already in the wishlist") {
                        //alert("product is in wishlist")
                        setIsInWishlist(true);
                        setWishlistId(whishId)


                    }

                });
        }


    };

    return (
        <>
            <NavigationBar />
            <div className='view-container'>

                {loading ? (
                    <Loader />
                ) : (<>






                    <div >
                        <img src={productsDetails.pimage} alt='logo' className='view-image'
                        />
                    </div>
                    <div className='viewlist'>
                        <div className={`favotate_btn ${isInWishlist ? 'in-wishlist' : ''}`} onClick={handleWishlistToggle}>
                            <FavoriteIcon style={{ color: isInWishlist ? 'red' : 'rgb(79, 14, 14)' }} />

                        </div>

                        <h1>{productsDetails.productName}</h1>
                        <div className='box-div'>
                            < h3>Display:{productsDetails.Display}</h3>
                            < h3>Processor:{productsDetails.Processor}</h3>
                            < h3>Camera:{productsDetails.Camera}</h3>
                            <h3>Battey:{productsDetails.Battery}</h3>
                            <h3>Storage:{productsDetails.Storage}</h3>


                            <p className='Description'>Description :{productsDetails.Description}</p>
                            <h3>${productsDetails.price}</h3>
                        </div>

                        <Button
                            variant="contained"
                            size='large'
                            style={{ backgroundColor: '#563517', color: 'white', marginRight: "100px" }}
                            onClick={() => {
                                
                            }}
                        >
                            Buy
                        </Button>
                        <Button

                            variant="outlined"
                            size='large'
                            style={{ color: '#563517', borderColor: '#563517' }}
                            onClick={() => {

                                
                            }}
                        >
                            Add to cart
                        </Button>


                    </div>





                </>
                )}


            </div >

        </>
    )
}

export default ProductView;
