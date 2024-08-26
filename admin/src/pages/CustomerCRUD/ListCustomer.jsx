import React, { useEffect, useState } from 'react'
import './ListCustomer.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const ListCustomer = ({url}) => {
  // const url = "http://localhost:4000";
  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/customer/listCustomer`)
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeCustomer = async(customerId) => {
    // console.log(ingredientId);
    const response = await axios.post(`${url}/api/customer/removeCustomer`,{id:customerId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }
  
  const updateCustomer = (customerId) => {
    navigate(`/updateCustomer/${customerId}`);
  };

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Customers List</p>
      <div className="list-customerTable-customer">
        <div className="list-customerTable-format title">
          <b>First Name</b>
          <b>Last Name</b>
          <b>Email</b>
          <b>Username</b>
          <b>Password</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-customerTable-format">
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
              <p>{item.email}</p>
              <p>₱{item.username}</p>
              <p>{item.password}</p>
              <div className="action-container">
                <p onClick={()=>updateCustomer(item._id)} className='cursor'>✎</p>
                <p onClick={()=>removeCustomer(item._id)} className='cursor'>X</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListCustomer
