import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import './Dashboard.css'
import { displayOrderApi, displayProductsApi, displayUsersApi } from "../../Api/Api";
const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [productCount, setproductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);


    useEffect(() => {

        displayProductsApi()
            .then((response => {
                //console.log("response", response.data.data.length)
                setproductCount(response.data.data.length)

            }))

        displayUsersApi()
            .then((response => {
                //console.log("response", response.data.data.data)
                setUserCount(response.data.data.data.length)

            }))
            .catch((error) => {
                console.error("error", error);
            })
        displayOrderApi()
            .then((response) => {
                //console.log("oder_response", response.data.data.orders.length)
                setOrderCount(response.data.data.orders.length)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])


    return (
        <>
            <div className="dashboad_container">

                <Sidebar />
                <div className="product_dashboad">
                    <h1>users</h1>

                    <p>{userCount}</p>


                </div>
                <div className="product_dashboad">
                    <h1>orders</h1>
                    <p>{orderCount}</p>


                </div>
                <div className="product_dashboad">
                    <h1>products</h1>
                    <h3>{productCount}</h3>


                </div>


            </div>
        </>
    )
}


export default Dashboard