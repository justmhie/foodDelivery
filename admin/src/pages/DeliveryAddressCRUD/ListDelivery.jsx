import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import './ListDelivery.css';

const ListDelivery = ({url}) => {
  // const url = "http://localhost:4000";
  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/deliveries/listDelivery`)
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeDelivery = async(deliveryId) => {
    // console.log(ingredientId);
    const response = await axios.post(`${url}/api/deliveries/removeDelivery`,{id:deliveryId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }
  
  const updateDelivery = (deliveryId) => {
    navigate(`/updateDelivery/${deliveryId}`);
  };

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>Delivery Address List</p>
      <div className="list-deliveryTable-delivery">
        <div className="list-deliveryTable-format title">
          <b>Customer Name</b>
          <b>Street</b>
          <b>City</b>
          <b>Province</b>
          <b>ZIP Code</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-deliveryTable-format">
              <p>{item.customerName}</p>
              <p>{item.street}</p>
              <p>{item.city}</p>
              <p>{item.province}</p>
              <p>{item.zipCode}</p>
              <div className="action-container">
                <p onClick={()=>updateDelivery(item._id)} className='cursor'>✎</p>
                <p onClick={()=>removeDelivery(item._id)} className='cursor'>X</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListDelivery
