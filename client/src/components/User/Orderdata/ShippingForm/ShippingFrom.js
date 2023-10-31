import React, { useState } from "react";
import { useAuth } from '../../../contexts/AuthContexts';
import './ShippingForm.css';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { createOrderApi } from "../../../Api/Api";
import { Form } from "react-router-dom";
const ShippingForm = () => {
    const { productData } = useAuth();
    console.log("productData", productData);
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        landMark: "",
        postcode: "",
        paymentMethod: "",
    });

    const [errors, setErrors] = useState({});

    const shippingFormSchema = yup.object().shape({
        fullName: yup.string().required('Full Name is required'),
        phoneNumber: yup.string().required('Phone Number is required'),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
        country: yup.string().required('Country is required'),
        // landMark: yup.string().required('landMark is required'),
        postcode: yup.string().required('Postcode is required'),

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await shippingFormSchema.validate(formData, { abortEarly: false });
            // Validation passed
            console.log("Form data is valid:", formData);
            handleCreateOrder()

            // Handle form submission here, e.g., process the payment
        } catch (validationErrors) {
            const errors = {};

            validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message;
            });

            setErrors(errors);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        for (const item of productData) {
            total += item.productId.price || item.price * item.quantity;
        }
        formData.totalAmount = total.toFixed(2)
        return total.toFixed(2);
    };
    const handleCreateOrder = async () => {
        formData.orderDetails = productData
        console.log("formData", formData);
        const response = await createOrderApi(formData)
        console.log("response-----", response);

    }
    return (
        <>
            {productData && productData.length > 0 ? (
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3}>
                                <form onSubmit={handleSubmit}>
                                    <h2>Shipping Address</h2>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Full Name"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.fullName)}
                                                helperText={errors.fullName}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.phoneNumber)}
                                                helperText={errors.phoneNumber}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.address)}
                                                helperText={errors.address}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="City"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.city)}
                                                helperText={errors.city}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.country)}
                                                helperText={errors.country}
                                            >
                                                <option value="" disabled>
                                                    Select Country
                                                </option>
                                                <option value="India">India</option>
                                                <option value="United States">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Other">Other</option>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="landMark"
                                                name="landMark"
                                                value={formData.landMark}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.landMark)}
                                                helperText={errors.landMark}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Postcode"
                                                name="postcode"
                                                value={formData.postcode}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.postcode)}
                                                helperText={errors.postcode}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                select
                                                label="Select Payment Method"
                                                name="paymentMethod"
                                                value={formData.paymentMethod}
                                                onChange={handleInputChange}
                                            >
                                                <option value="online_payment">online payment</option>

                                                <option value="COD">COD</option>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                fullWidth
                                            >
                                                Place Order
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3}>
                                <h2>Order Details</h2>
                                <ul>
                                    {productData.map((item, index) => (
                                        <li key={index}>
                                            <img
                                                src={item.productId.pimage}
                                                alt={item.productId.productname}
                                                width="100"
                                                height="100"
                                            />
                                            {item.productId.productName} - ${item.productId.price} - Quantity: {item.quantity}
                                        </li>
                                    ))}
                                    <p>Total: ${calculateTotal()}</p>
                                </ul>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            ) : (
                <Alert error="info">page not found</Alert>
            )}
        </>

    );

};

export default ShippingForm;
