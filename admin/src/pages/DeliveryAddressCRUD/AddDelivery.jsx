import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const AddDelivery = ({url}) => {
   
    const [data, setData] = useState({
      customerName: "",
      street: "",
      city: "",
      province: "",
      zipCode: "",
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
      const response = await axios.post(`${url}/api/deliveries/addDelivery`,data);
      if (response.data.success) {
        setData({
            customerName: "",
            street: "",
            city: "",
            province: "",
            zipCode: "",
        })
      toast.success(response.data.message)
      }else {
      toast.error(response.data.message)
      }
    }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-delivery-customername flex-col">
            <p>Customer Name</p>
            <input onChange={onChangeHandler} value={data.customerName} type="text" name='customerName' placeholder='Type here' />
        </div>

        <div className="add-delivery-street flex-col">
            <p>Street Name</p>
            <input onChange={onChangeHandler} value={data.street} type="text" name='street' placeholder='Type here' />
        </div>

        <div className="add-delivery-city flex-col">
            <p>City</p>
            <input onChange={onChangeHandler} value={data.city} type="text" name='city' placeholder='Type here' />
        </div>

        <div className="add-delivery-province flex-col">
            <p>Province</p>
            <input onChange={onChangeHandler} value={data.province} type="text" name='province' placeholder='Type here' />
        </div>
        <div className="add-delivery-zipcode flex-col">
            <p>ZIP Code</p>
            <input onChange={onChangeHandler} value={data.zipCode} type="text" name='zipCode' placeholder='Type here' />
        </div>


        <button type='submit' className='add-btn'>ADD DELIVERY ADDRESS</button>
      </form>
    </div>
  )
}

export default AddDelivery
