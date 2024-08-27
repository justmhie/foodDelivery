import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const AddSale = ({url}) => {
   
    const [data, setData] = useState({
      startDate: "",
      endDate: "",
      totalSale: "",
      totalQuantity: "",
      saleCount: "",
      productName: "",
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
      const response = await axios.post(`${url}/api/sales/addSale`,data);
      if (response.data.success) {
        setData({
          startDate: "",
          endDate: "",
          totalSale: "",
          totalQuantity: "",
          saleCount: "",
          productName: "",
        })
      toast.success(response.data.message)
      }else {
      toast.error(response.data.message)
      }
    }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-sale-startDate flex-col">
            <p>Enter Start Date</p>
            <input onChange={onChangeHandler} value={data.startDate} type="text" name='startDate' placeholder='Type here' />
        </div>

        <div className="add-sale-endDate flex-col">
            <p>Enter End Date</p>
            <input onChange={onChangeHandler} value={data.endDate} type="text" name='endDate' placeholder='Type here' />
        </div>


        <div className="add-sale-totalSale flex-col">
            <p>Enter Total Sale</p>
            <input onChange={onChangeHandler} value={data.totalSale} type="text" name='totalSale' placeholder='Type here' />
        </div>

        <div className="add-sale-totalQuantity flex-col">
            <p>Enter Total Quantity</p>
            <input onChange={onChangeHandler} value={data.totalQuantity} type="text" name='totalQuantity' placeholder='Type here' />
        </div>

        <div className="add-sale-saleCount flex-col">
            <p>Sale Count</p>
            <input onChange={onChangeHandler} value={data.saleCount} type="text" name='saleCount' placeholder='Type here' />
        </div>

        <div className="add-sale-productName flex-col">
            <p>Enter Associated Producty</p>
            <input onChange={onChangeHandler} value={data.productName} type="text" name='productName' placeholder='Type here' />
        </div>


        <button type='submit' className='add-btn'>ADD SALES REPORT</button>
      </form>
    </div>
  )
}

export default AddSale
