import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import NavigationBar from '../../../nav/NavigationBar';
import { displayorderByIdApi } from '../../../Api/Api';
import Footer from '../../../Header/Footer';

const UserOrderPage = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //console.log("Fetching data...");
                const response = await displayorderByIdApi();
               // console.log("response........", response);

                // Sort orders by date in descending order
                const sortedOrders = response.data.data.orders.sort((a, b) =>
                    moment(b.createdAt).diff(moment(a.createdAt))
                );

                setOrders(sortedOrders);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <NavigationBar />
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
                {loading ? (
                     <CircularProgress
                     style={{
                         margin: '20px auto',
                         display: 'block',
                         color: '#4CAF50', 
                         animation: 'pulse 1s infinite', // Add a pulsating effect
                     }}/>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>
                            My Orders
                        </Typography>
                        <TableContainer component={Paper} elevation={4}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order Number</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Product Image</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Order Status</TableCell>
                                        <TableCell>Payment Status</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order._id}>
                                            <TableCell>{order.orderID}</TableCell>
                                            <TableCell>{moment(order.createdAt).format('DD MMM YYYY')}</TableCell>
                                            <TableCell>
                                                {order.orderDetails.map((orderDetail) => (
                                                    <div key={orderDetail.productId._id}>
                                                        <img
                                                            src={orderDetail.productId.pimage}
                                                            alt="Product"
                                                            style={{
                                                                maxWidth: '100px',
                                                                height: 'auto',
                                                                border: '1px solid #ddd',
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                {order.orderDetails.map((orderDetail) => (
                                                    <div key={orderDetail.productId._id}>
                                                        {orderDetail.productId.productName}
                                                    </div>
                                                ))}
                                            </TableCell>
                                            <TableCell>{order.status}</TableCell>
                                            <TableCell>{order.paymentMethod}</TableCell>
                                            <TableCell>{order.totalAmount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Footer/>
                    </>
                )}
            </div>
        </>
    );
};

export default UserOrderPage;
