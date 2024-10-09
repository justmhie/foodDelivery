import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from "axios"
import {toast} from "react-toastify"
import {assets} from '../../assets/assets'
  const Orders = ({url}) => {
      const [orders,setOrders] = useState([]);

      const fetchAllOrders = async () => {
        const response = await axios.get((url+"/api/order/list"))
        if (response.data.success) {
          setOrders(response.data.data);
          console.log(response.data.data);
        } else {
          toast.error("Error")
        }
      }
    
      const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(url + "/api/order/status", {
                orderId,
                status: event.target.value // 
            });
            if (response.data.success) {
                await fetchAllOrders();
            } else {
                toast.error("Error updating order status");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    
    useEffect(()=> {
      fetchAllOrders();
    },[])

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index) => {
                  if (index === order.items.length-1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}<br/>Date: {formatDate(order.date)}</p>
            <p>₱{order.amount}</p>
            {order.status !== "Delivered" && (
              <div className="order-item-buttons">
                  {order.status === "Brewing your Coffee" && (
                      <button onClick={(event) => statusHandler(event, order._id)} value="Out for Delivery">
                          Out for Delivery
                      </button>
                  )}
                  {order.status === "Out for Delivery" && (
                      <button onClick={(event) => statusHandler(event, order._id)} value="Delivered">
                          Delivered
                      </button>
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
