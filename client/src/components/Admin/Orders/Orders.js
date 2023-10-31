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
import { FormControl, Select, MenuItem } from '@mui/material';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        displayOrderApi()
            .then((response) => {
                const formattedOrders = response.data.data.orders.map((order) => ({
                    ...order,
                    date: moment(order.date).format('DD MMM YYYY'),
                }));
                setOrders(formattedOrders);
            });
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
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
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <Sidebar />
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px', marginLeft: "10%" }}>
                <Typography variant="h4" gutterBottom>
                    Orders
                </Typography>
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
                            {orders.map((order) => (
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
            </div>
        </div>
    );
};

export default OrdersPage;
