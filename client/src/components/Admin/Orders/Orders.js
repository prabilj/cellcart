import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import Sidebar from '../Sidebar/Sidebar';
import { displayOrderApi, updateOrderStatusApi } from '../../Api/Api';
import { FormControl, Select, MenuItem, Grid, CircularProgress } from '@mui/material';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Step 1: Create a loading state

    useEffect(() => {
        displayOrderApi()
            .then((response) => {
                const formattedOrders = response.data.data.orders.map((order) => ({
                    ...order,
                    date: moment(order.createdAt).format('DD MMM YYYY'),
                }));
                setOrders(formattedOrders);
            })
            .finally(() => {
                setLoading(false); // Step 3: Set loading to false when API call is complete
            });
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setLoading(true); // Set loading to true before making the status change API call
        updateOrderStatusApi(orderId, newStatus)
            .then((response) => {
                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        return {
                            ...order,
                            status: newStatus,
                        };
                    }
                    return order;
                });
                setOrders(updatedOrders);
            })
            .catch((error) => {
                console.error(error);
                // Handle error, e.g., show an error message to the user
            })
            .finally(() => {
                setLoading(false); // Step 3: Set loading to false after status change API call
            });
    };

    return (
        <Grid container>
            <Grid item xs={2}>
                <Sidebar />
            </Grid>
            <Grid item xs={9}>
                <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px', margin: '10px' }}>
                    <Typography variant="h4" gutterBottom>
                        Orders
                    </Typography>
                    {loading ? ( // Step 4: Conditionally render the loader
                        <CircularProgress />
                    ) : (
                        <TableContainer component={Paper} elevation={4}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order Number</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer Email</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Shipment Status</TableCell>
                                        <TableCell>Payment Status</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.slice().reverse().map((order) => (
                                        <TableRow key={order._id}>
                                            <TableCell>{order.orderID}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.userId.email}</TableCell>
                                            <TableCell>
                                                {order.orderDetails.map((orderDetail) => (
                                                    <div key={orderDetail.productId._id}>
                                                        * {orderDetail.productId.productName}
                                                    </div>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <FormControl variant="outlined">
                                                    <Select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        label="Shipment Status"
                                                    >
                                                        <MenuItem value="pending">Pending</MenuItem>
                                                        <MenuItem value="shipped">Shipped</MenuItem>
                                                        <MenuItem value="delivered">Delivered</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>{order.paymentMethod}</TableCell>
                                            <TableCell>{order.totalAmount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

export default OrdersPage;
