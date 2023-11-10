import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { displayProductsApi, displayUsersApi, displayOrderApi } from '../../Api/Api';
import moment from 'moment';
import {
    Card
} from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import Sidebar from '../Sidebar/Sidebar'; // Import your Sidebar component here
import Footer from '../../Header/Footer';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [orders, setOrders] = useState([]);

    const scrollContainerRef = useRef(null);

    const [orderStatusData, setOrderStatusData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await displayProductsApi();
                const usersResponse = await displayUsersApi();
                const ordersResponse = await displayOrderApi();

                setTotalProducts(productsResponse.data.data.length);
                setTotalUsers(usersResponse.data.data.data.length);
                setTotalOrders(ordersResponse.data.data.orders.length);

                const sortedOrders = ordersResponse.data.data.orders.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                });

                setOrders(sortedOrders);

                // Extract order status data for the pie chart
                const orderStatusCounts = {};
                sortedOrders.forEach((order) => {
                    const status = order.status;
                    orderStatusCounts[status] = (orderStatusCounts[status] || 0) + 1;
                });

                const orderStatusData = Object.keys(orderStatusCounts).map((status) => ({
                    id: status,
                    label: status,
                    value: orderStatusCounts[status],
                }));

                setOrderStatusData(orderStatusData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the list when orders change (new orders added)
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }, [orders]);

    return (
        <div>
            <Sidebar />
            <div style={{ marginLeft: '260px', marginRight: '260px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Paper className="dashboard-item" style={{ marginBottom: '20%' }}>
                            <Link to="/products" style={{ textDecoration: 'none' }}>
                                <Typography variant="h5" component="div" color="primary">
                                    Total Products
                                </Typography>
                            </Link>
                            <Typography variant="h6">{totalProducts}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className="dashboard-item">
                            <Link to="/users" style={{ textDecoration: 'none' }}>
                                <Typography variant="h5" component="div" color="primary">
                                    Total Users
                                </Typography>
                            </Link>
                            <Typography variant="h6">{totalUsers}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className="dashboard-item">
                            <Card>
                                <Link to="/orders" style={{ textDecoration: 'none' }}>
                                    <Typography variant="h5" component="div" color="primary">
                                        Total Orders
                                    </Typography>
                                </Link>
                                <Typography variant="h6">{totalOrders}</Typography>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper className="dashboard-item">
                            <PieChart series={[{ data: orderStatusData }]} width={400} height={200} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className="dashboard-item" style={{ marginRight: '20%' }}>
                            <Typography variant="h5" component="div">
                                Data Overview
                            </Typography>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }} ref={scrollContainerRef}>
                                <ul>
                                    {orders.slice().reverse().map((order) => (
                                        <li key={order._id}>
                                            <Typography variant="body1">
                                                <strong>Order ID:</strong> {order.orderID}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Order Date:</strong> {moment(order.createdAt).format('DD MMM')}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Dashboard;
