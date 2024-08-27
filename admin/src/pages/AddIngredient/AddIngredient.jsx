import React, { useState } from 'react'
import './AddIngredient.css';
import axios from "axios"
import { toast } from 'react-toastify'

const AddIngredient = ({url}) => {
   
    const [data, setData] = useState({
      ingredient: "",
      // amount: "",
      unitOfMeasurement: "",
      pricePerUnit: "",
      // expirationDate: "",
      // status: "In Stock"
    })
    
    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value})) 
    }

    // useEffect(()=>{
    //   console.log(data);
    // },[data])
    const onSubmitHandler = async (event) => {
      event.preventDefault();
      const response = await axios.post(`${url}/api/ingredients/addIngredient`,data);
      if (response.data.success) {
        setData({
          ingredient: "",
          // amount: "",
          unitOfMeasurement: "",
          pricePerUnit: "",
          // expirationDate: "",
          // status: "In Stock"
        })
      toast.success(response.data.message)
      }else {
      toast.error(response.data.message)
      }
    }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-ingredient-name flex-col">
            <p>Ingredient name</p>
            <input onChange={onChangeHandler} value={data.ingredient} type="text" name='ingredient' placeholder='Type here' />
        </div>
        <div className="add-ingredient-amount-unitOfMeasurement">
            {/* <div className="add-ingredient-amount flex-col">
                <p>Amount</p>
                <input onChange={onChangeHandler} value={data.amount} type="Number" name='amount' placeholder='1.5' />
            </div> */}
            <div className="add-ingredient-unitOfMeasurement flex-col">
                <p>Unit of Measurement</p>
                <input onChange={onChangeHandler} value={data.unitOfMeasurement} type="text" name='unitOfMeasurement' placeholder='kg' />
            </div>
        </div>
        <div className="add-ingredient-pricePerUnit flex-col">
                <p>Price Per Unit</p>
                <input onChange={onChangeHandler} value={data.pricePerUnit} type="Number" name='pricePerUnit' placeholder='100'/>
        </div>
        {/* <div className="add-ingredient-expirationDate flex-col">
                <p>Expiration Date</p>
                <input onChange={onChangeHandler} value={data.expirationDate} type="date" name='expirationDate' />
        </div> */}
        {/* <div className="add-ingredient-status flex-col">
            <p>Status</p>
            <select onChange={onChangeHandler} name="status">
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Expired">Expired</option>
            </select>   
        </div> */}
        <button type='submit' className='add-btn'>ADD INGREDIENT</button>
      </form>
    </div>
  )
}

export default AddIngredient
