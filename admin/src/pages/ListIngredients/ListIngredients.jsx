import React, { useEffect, useState } from 'react'
import './ListIngredients.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const ListIngredients = ({url}) => {
  // const url = "http://localhost:4000";
  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/ingredients/listIngredients`)
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeIngredient = async(ingredientId) => {
    // console.log(ingredientId);
    const response = await axios.post(`${url}/api/ingredients/removeIngredient`,{id:ingredientId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }
  
  const updateIngredient = (ingredientId) => {
    navigate(`/updateIngredient/${ingredientId}`);
  };

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Ingredients List</p>
      <div className="list-ingredientTable-ingredient">
        <div className="list-ingredientTable-format title">
          <b>Ingredient</b>
          <b>Amount</b>
          <b>Unit of Measurement</b>
          <b>Price Per Unit</b>
          <b>Expiration Date</b>
          <b>Status</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-ingredientTable-format">
              <p>{item.ingredient}</p>
              <p>{item.amount}</p>
              <p>{item.unitOfMeasurement}</p>
              <p>₱{item.pricePerUnit}</p>
              <p>{item.expirationDate}</p>
              <p>{item.status}</p>
              <div className="action-container">
                <p onClick={()=>updateIngredient(item._id)} className='cursor'>✎</p>
                <p onClick={()=>removeIngredient(item._id)} className='cursor'>X</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListIngredients
