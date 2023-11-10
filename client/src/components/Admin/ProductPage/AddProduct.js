import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addproduct.css';
import Sidebar from '../Sidebar/Sidebar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addProductsApi } from '../../Api/Api';

const AddProduct = () => {
    const Navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState()
    const schema = yup.object().shape({
        productName: yup.string().required('Product Name is required'),
        price: yup.number().required('Product Price is required'),
        Description: yup.string().required('Product Description is required'),
        //pimage: yup.string().required('Product Image is required'),
        Display: yup.string().required('Product Display is required'),
        Processor: yup.string().required('Product Processor is required'),
        Camera: yup.string().required('Product Camera is required'),
        Battery: yup.string().required('Product Battery is required'),
        Storage: yup.string().required('Product Storage is required'),
        productCount: yup.number().required('count is requried')

    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {
        try {
            if (imageUrl) {
                data.pimage = imageUrl

                console.log("data", data)

                const response = await addProductsApi(data)
                console.log(response)


                console.log('Product added successfully:', response.data);
                alert('Product added successfully')
                Navigate('/ViewProducts')

            }
            else {
                alert("product image is not added")
            }
        } catch (error) {

            console.error('Error adding product:', error);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append('file', file);


            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response as needed
            console.log('File uploaded successfully:', response.data.data.pimage);
            setImageUrl(response.data.data.pimage)


            // alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    };

    return (
        <div className="app">
            <Sidebar />
            <div className="add-product-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Add Product</h2>
                    <div className="add-product-form">
                        <div className='productDiv'>
                            <div className="input-container">
                                <label htmlFor="productName">Product Name:</label>
                                <input
                                    type="text"
                                    id="productName"
                                    {...register('productName')}
                                />
                                <p className="error-message">{errors.productName?.message}</p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="Price">Product Price:</label>
                                <input
                                    type="number"
                                    id="price"
                                    {...register('price')}
                                />
                                <p className="error-message">{errors.price?.message}</p>
                            </div>
                        </div>
                        <div className='productDiv'>
                            <div className="input-container">
                                <label htmlFor="productDescription">Product Description:</label>
                                <textarea
                                    id="productDescription"
                                    {...register('Description')}
                                />
                                <p className="error-message">{errors.Description?.message}</p>
                            </div>

                            <div className="input-container">
                                <label htmlFor="Display">Display:</label>
                                <input
                                    type="text"
                                    id="Display"
                                    {...register('Display')}
                                />
                                <p className="error-message">{errors.Display?.message}</p>
                            </div>
                        </div>
                        <div className='productDiv'>
                            <div className="input-container">
                                <label htmlFor="Processor">Processor:</label>
                                <input
                                    type="text"
                                    id="Processor"
                                    {...register('Processor')}
                                />
                                <p className="error-message">{errors.Processor?.message}</p>
                            </div>
                            <div className="input-container">
                                <label htmlFor="Camera">Camera:</label>
                                <input
                                    type="text"
                                    id="Camera"
                                    {...register('Camera')}
                                />
                                <p className="error-message">{errors.Camera?.message}</p>
                            </div>
                        </div>
                        <div className='productDiv'>

                            <div className="input-container">
                                <label htmlFor="Battery">Battery:</label>
                                <input
                                    type="text"
                                    id="Battery"
                                    {...register('Battery')}
                                />
                                <p className="error-message">{errors.Battery?.message}</p>
                            </div>
                            <div className="input-container">
                                <label htmlFor="Storage">Storage:</label>
                                <input
                                    type="text"
                                    id="Storage"
                                    {...register('Storage')}
                                />
                                <p className="error-message">{errors.Storage?.message}</p>
                            </div>

                        </div>
                        <div className='productDiv'>
                            <div className="input-container">
                                <label htmlFor="productImage">Product Image:</label>
                                <input
                                    type="file"
                                    id="productImage"
                                    onChange={handleFileChange}
                                />
                                <p className="error-message">{errors.productImage?.message}</p>
                            </div>
                            <div className="input-container">
                                <label htmlFor="productCount">count:</label>
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    name="productCount"
                                    {...register('productCount')}
                                />
                                <p className="error-message">{errors.productCount?.message}</p>
                            </div>


                        </div>
                        <button type="submit">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
