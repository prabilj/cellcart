import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useAuth } from '../../../contexts/AuthContexts';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { addAddressApi, createOrderApi, getAddressApi, removeAddressApi, deleteManyFromCartApi } from "../../../Api/Api";

import {
    Container,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    TextField,
    MenuItem,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';


const CheckoutPage = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [errors, setErrors] = useState({})
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressDetails, setSelectedAddressDetails] = useState([])
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        landmark: "",
        postcode: "",
        paymentMethod: "",
    });
    const { productData } = useAuth();
    let itemdata = []
    for (const itemId of productData) {
        console.log(itemId._id);
        itemdata.push(itemId._id)

    }
    const shippingFormSchema = yup.object().shape({
        fullName: yup.string().required('Full Name is required'),
        phoneNumber: yup.string().required('Phone Number is required'),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
        country: yup.string().required('Country is required'),
        postcode: yup.string().required('Postcode is required'),
    });

    const isAddressValid = () => {
        try {
            shippingFormSchema.validateSync(formData, { abortEarly: false });
            return true;
        } catch (validationErrors) {
            const errors = {};
            validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message;
            });
            setErrors(errors);
            return false;
        }
    };
    const calculateTotal = (productData) => {
        let total = 0;
        for (const item of productData) {
            total += item.productId.price * item.quantity;
        }
        console.log("total", total);
        return total;
    };

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const total = calculateTotal(productData);
        setTotalAmount(total);
    }, [productData]);


    useEffect(() => {
        async function fetchSavedAddresses() {
            const response = await getAddressApi();
            const addresses = response.data.data.data;
            console.log("addresses", addresses);
            setSavedAddresses(addresses);
        }

        fetchSavedAddresses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const toggleAddAddressForm = () => {

        setShowAddAddressForm(!showAddAddressForm);
    };

    const addNewAddress = async () => {
        try {
            if (isAddressValid()) {
                setFormData({
                    fullName: "",
                    phoneNumber: "",
                    address: "",
                    city: "",
                    country: "",
                    landmark: "",
                    postcode: "",
                });

                const response = await addAddressApi(formData);
                console.log("Address saved:", response.data.saveAddress);
                setSavedAddresses((prevAddresses) => [...prevAddresses, response.data.saveAddress])

                setErrors({});
                setShowAddAddressForm(false);
            }
        } catch (error) {
            console.error('Error adding a new address:', error);
        }
    };
    const deleteAddress = async (addressId) => {
        try {
            // console.log("addressId", addressId);
            const response = await removeAddressApi(addressId);
            if (response.status === 200) {

                setSavedAddresses((prevAddresses) =>
                    prevAddresses.filter((address) => address._id !== addressId)
                );
            } else {
                console.error('Address deletion failed. Response:', response);

            }
        }
        catch (error) {
            console.error('Error deleting the address:', error);

        }
    };
    const placeOrder = async (addressId, paymentMethod, productData) => {
        //console.log("addressId", addressId);
        //console.log("selectedAddress", selectedAddress);
        const finalData = {
            addressId,
            paymentMethod,
            orderDetails: productData,
            totalAmount: totalAmount,
        };
        console.log("finalData", finalData);
        try {
            const response = await createOrderApi(finalData);
            const orderId = response.data.order

            const invoiceData = {
                selectedAddressDetails,
                paymentMethod,
                orderDetails: productData,
                totalAmount: totalAmount,
                orderId

            }
            //console.log("invoiceData", invoiceData);
            // console.log("itemdataitemdata", itemdata)
            if (response.status === 200)
                deleteManyFromCartApi(itemdata)

            Swal.fire({
                title: 'Order Placed!',
                text: 'Your order has been placed successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/order-invoice', { state: { invoiceData } })
                //navigate('/myorders'); // Update the path to your "My Order" page.
            });

        } catch (error) {
            console.error('Error placing the order:', error);
        }
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Typography variant="h6">Saved Address</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="address"
                                name="address"
                                value={selectedAddress}
                                onChange={(e) => {
                                    setSelectedAddress(e.target.value)
                                    const selectedAddressDetails = savedAddresses.find((address) => address._id === e.target.value);
                                    setSelectedAddressDetails(selectedAddressDetails)
                                }
                                }
                            >
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Select</TableCell>
                                                <TableCell>Full Name</TableCell>
                                                <TableCell>Address</TableCell>
                                                <TableCell>City</TableCell>
                                                <TableCell>country</TableCell>
                                                <TableCell>Zip Code</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {savedAddresses.map((address) => (
                                                <TableRow key={address._id}>
                                                    <TableCell>
                                                        <Radio value={address._id} />
                                                    </TableCell>
                                                    <TableCell>{address.fullName}</TableCell>
                                                    <TableCell>{address.address}</TableCell>
                                                    <TableCell>{address.city}</TableCell>
                                                    <TableCell>{address.country}</TableCell>
                                                    <TableCell>{address.postcode}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => deleteAddress(address._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </RadioGroup>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setShowAddAddressForm(!showAddAddressForm);
                            }}
                        >
                            {showAddAddressForm ? 'Cancel' : 'Add New Address'}
                        </Button>

                        {showAddAddressForm && (

                            <form >
                                <Typography variant="h5">Shipping Address</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={12} sm={6}>
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
                                    <Grid item xs={6} sm={4}>
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
                                    <Grid item xs={6} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Country"
                                            name="country"
                                            select
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            error={Boolean(errors.country)}
                                            helperText={errors.country}
                                        >
                                            <MenuItem value="" disabled>
                                                Select Country
                                            </MenuItem>
                                            <MenuItem value="India">India</MenuItem>
                                            <MenuItem value="United States">United States</MenuItem>
                                            <MenuItem value="Canada">Canada</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Landmark"
                                            name="landmark"
                                            value={formData.landmark}
                                            onChange={handleInputChange}
                                            error={Boolean(errors.landmark)}
                                            helperText={errors.landmark}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                </Grid>

                                <Button variant="contained" color="primary" onClick={addNewAddress}>
                                    Save Address
                                </Button>
                            </form>

                        )}
                        {selectedAddress ? (
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                            </Button>
                        ) : null}
                    </>
                )
            case 1:
                return (
                    <div>
                        <Typography variant="h6">Product Details</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <img
                                                    src={item.productId.pimage}
                                                    alt={item.productId.productname}
                                                    width="100"
                                                    height="100"
                                                />
                                            </TableCell>
                                            <TableCell>{item.productId.productName}</TableCell>
                                            <TableCell>${item.productId.price}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant="h6">Total: ${totalAmount.toFixed(2)}</Typography>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Continue to Payment
                        </Button>
                    </div>

                );
            case 2:
                return (
                    <div>
                        <Typography variant="h6">Payment Method</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="paymentMethod"
                                name="paymentMethod"
                                value={selectedPaymentMethod}
                                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    value="creditCard"
                                    control={<Radio />}
                                    label="Credit Card"
                                />
                                <FormControlLabel
                                    value="paypal"
                                    control={<Radio />}
                                    label="PayPal"
                                />
                                <FormControlLabel
                                    value="bankTransfer"
                                    control={<Radio />}
                                    label="Bank Transfer"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="contained" color="primary"
                            onClick={() => placeOrder(selectedAddress, selectedPaymentMethod, productData)}>
                            Place Order
                        </Button>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };






    return (
        <Container>
            <Stepper activeStep={activeStep} alternativeLabel orientation="horizontal">
                <Step key="Address">
                    <StepLabel>Address</StepLabel>
                </Step>
                <Step key="Product Details">
                    <StepLabel>Product Details</StepLabel>
                </Step>
                <Step key="Payment Method">
                    <StepLabel>Payment Method</StepLabel>
                </Step>
            </Stepper>
            <div>
                {activeStep === 3 ? (
                    <div>
                        <Typography variant="h6">Thank you for your order!</Typography>
                    </div>
                ) : (
                    <div>{getStepContent(activeStep)}</div>
                )}
                <div>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack}>Back</Button>
                    )}
                </div>
            </div>
        </Container>
    );
};



export default CheckoutPage
