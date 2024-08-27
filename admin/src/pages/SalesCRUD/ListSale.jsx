import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const ListSale = ({url}) => {
  // const url = "http://localhost:4000";
  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/sales/listSale`)
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeSale = async(saleId) => {
    // console.log(ingredientId);
    const response = await axios.post(`${url}/api/sales/removeSale`,{id:saleId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }
  
  const updateSale = (saleId) => {
    navigate(`/updateSale/${saleId}`);
  };

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>Sales Report</p>
      <div className="list-saleTable-sale">
        <div className="list-saleTable-format title">
          <b>Starting Date</b>
          <b>Ending Date</b>
          <b>Total Sales</b>
          <b>Quantity</b>
          <b>Sale Count</b>
          <b>Associated Product Name</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-saleTable-format">
              <p>{item.startDate}</p>
              <p>{item.endDate}</p>
              <p>{item.totalSale}</p>
              <p>₱{item.totalQuantity}</p>
              <p>{item.saleCount}</p>
              <p>{item.productName}</p>
              <div className="action-container">
                <p onClick={()=>updateSale(item._id)} className='cursor'>✎</p>
                <p onClick={()=>removeSale(item._id)} className='cursor'>X</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListSale
