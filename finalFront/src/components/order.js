import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from './ordercard.js'
import axios from 'axios'
import '../css/order.css'; // Import your CSS file for styling

const Front = () => {

  const [orders, setOrders] = useState([]); // State to hold fetched orders
  const [loading, setLoading] = useState(true); // State for loading status
useEffect(()=>{
  axios.get('http://localhost:8000/orders')
.then(orders=>setOrders(orders.data))
.catch(err=>console.log(err))

}, [])
return(

    <>
    <div className="container">
        <div className="header">
            <h1 className="title">Order List</h1>
            <Link to="/cart" className="view-cart">View Cart</Link>
        </div>

        <div className="items-container">
            {orders.length === 0 ? (
                <p>No orders available.</p>
            ) : (
                orders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                ))
            )}
        </div>

        <div className="button-container">
            <Link to="/all-orders" className="view-all">View All Orders</Link>
        </div>
    </div>
</>
);
}
export default Front;
