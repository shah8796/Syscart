import React from 'react';
import '../css/OrderNew.css';

const OrderCard = ({ order }) => {
    // Helper function to truncate long text
    const Truncate = (string, number) => {
        if (!string) return null;
        if (string.length <= number) return string;
        return string.slice(0, number) + "...";
    };

    // Helper function to display items if necessary
    const renderItems = (items) => {
        if (!items || items.length === 0) return <p>No items in this order.</p>;
        return (
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{Truncate(item, 50)}</li> // Adjust based on actual item structure
                ))}
            </ul>
        );
    };

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">Order {order._id}</h5>
                <p className="card-text">
                    <strong>Customer:</strong> {order.firstName} {order.lastName}
                </p>
                <p className="card-text">
                    <strong>Address:</strong> {order.address}, {order.city}, {order.state}, {order.zip}, {order.country}
                </p>
                <p className="card-text">
                    <strong>Customer Email:</strong> {order.customerId}
                </p>
                <div className="order-items">
                    <h6>Items:</h6>
                    {renderItems(order.items)}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
