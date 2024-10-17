import React, { useEffect, useState } from 'react';
import './MyOrders.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify'; 

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const cancelOrder = async (orderId, amount) => {
        try {
            const response = await axios.delete(url + "/api/order/cancel", {
                headers: { token },
                data: { orderId } 
            });
            if (response.data.success) {
                toast.success(`Order cancelled successfully! Your refund will be processed shortly.`);
                fetchOrders();
            } else {
                toast.error("Error cancelling the order.");
            }
        } catch (error) {
            console.error("Error cancelling the order:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    console.log(order); 
                    return (
                        <div className="my-orders-order" key={index}>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity; // no comma on last item
                                } else {
                                    return item.name + " x " + item.quantity + ", ";
                                }
                            })}</p>
                            <p>₱{order.amount}.00</p>
                            <p>Items: {order.items.length}<br />Date: {formatDate(order.date)}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <div className="my-order-buttons">
                                <button onClick={fetchOrders}>Track Order</button>
                                {order.status === "Brewing your Coffee" && (
                                    <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;
