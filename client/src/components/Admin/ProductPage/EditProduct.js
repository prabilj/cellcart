import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { displayProductByIdApi, updateProductApi } from '../../Api/Api';
import { Button, Container, TextField, Typography, Card, CardMedia, CardActions, Grid } from '@mui/material';
import './EditProduct.css';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../../Header/Footer';

const EditProduct = () => {
    const { ProductId } = useParams();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const schema = yup.object().shape({
        productName: yup.string().required('Product Name is required').default(''),
        price: yup.number().required('Product Price is required'),
        Description: yup.string().required('Product Description is required'),
        Display: yup.string().required('Product Display is required'),
        Processor: yup.string().required('Product Processor is required'),
        Camera: yup.string().required('Product Camera is required'),
        Battery: yup.string().required('Product Battery is required'),
        Storage: yup.string().required('Product Storage is required'),
        productCount: yup.number().required('Count is required'),
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        async function fetchProductData() {
            setLoading(true);
            setError(null);
            try {
                const response = await displayProductByIdApi(ProductId);
                const productData = response.data.data;
                setValue('productName', productData.productName || '');
                setValue('price', productData.price || 0);
                setValue('Description', productData.Description || '');
                setValue('Display', productData.Display || '');
                setValue('Processor', productData.Processor || '');
                setValue('Camera', productData.Camera || '');
                setValue('Battery', productData.Battery || '');
                setValue('Storage', productData.Storage || '');
                setValue('productCount', productData.productCount || 0);
                setSelectedImage(productData.pimage);
            } catch (error) {
                setError('Error fetching product data');
            } finally {
                setLoading(false);
            }
        }

        fetchProductData();
    }, [ProductId]);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            if (imageUrl !== "") {
                data.pimage = imageUrl;
            }
            const response = await updateProductApi(ProductId, data);
            if (response.status == 200) {


                console.log("response---", response)
                alert('Product updated successfully');
                navigate('/ViewProducts')
            }

        } catch (error) {
            setError('Error updating product');
        } finally {
            setLoading(false);
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
            setImageUrl(response.data.data.pimage);
            setSelectedImage(URL.createObjectURL(file));
        } catch (error) {
            setError('Error uploading file');
        }
    };

    return (
        <Grid container>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Container style={{ marginLeft: '20px' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card className="edit-product-card">
                            <Typography variant="h4">Edit Product</Typography>
                            <div className="form-row">
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="productName"
                                        {...register('productName')}
                                        placeholder="Product Name"
                                        error={!!errors.productName}
                                        helperText={errors.productName?.message}
                                        variant="outlined"
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="price"
                                        type="number"
                                        {...register('price')}
                                        placeholder="Product Price"
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="Description"
                                        multiline
                                        rows={4}
                                        {...register('Description')}
                                        placeholder="Product Description"
                                        error={!!errors.Description}
                                        helperText={errors.Description?.message}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="Display"
                                        {...register('Display')}
                                        placeholder="Product Display"
                                        error={!!errors.Display}
                                        helperText={errors.Display?.message}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="Processor"
                                        {...register('Processor')}
                                        placeholder="Product Processor"
                                        error={!!errors.Processor}
                                        helperText={errors.Processor?.message}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="Camera"
                                        {...register('Camera')}
                                        placeholder="Product Camera"
                                        error={!!errors.Camera}
                                        helperText={errors.Camera?.message}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="Battery"
                                        {...register('Battery')}
                                        placeholder="Product Battery"
                                        error={!!errors.Battery}
                                        helperText={errors.Battery?.message}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="Storage"
                                        {...register('Storage')}
                                        placeholder="Product Storage"
                                        error={!!errors.Storage}
                                        helperText={errors.Storage?.message}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <TextField
                                        fullWidth
                                        id="productCount"
                                        type="number"
                                        {...register('productCount')}
                                        placeholder="Product Count"
                                        error={!!errors.productCount}
                                        helperText={errors.productCount?.message}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="file"
                                        id="productImage"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                            {selectedImage && (
                                <Card>
                                    <CardMedia
                                        sx={{ objectFit: 'contain' }}
                                        component="img"
                                        alt="Product Image"
                                        height="140"
                                        image={selectedImage}
                                    />
                                </Card>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Updating Product...' : 'Update Product'}
                            </Button>
                        </Card>
                    </form>
                </Container>
            </Grid>
        </Grid>
    );
};

export default EditProduct;
