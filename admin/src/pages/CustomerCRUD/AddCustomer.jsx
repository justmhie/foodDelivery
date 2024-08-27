import React, { useState } from 'react'
import './AddCustomer.css';
import axios from "axios"
import { toast } from 'react-toastify'

const AddCustomer = ({url}) => {
   
    const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
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
      const response = await axios.post(`${url}/api/customers/addCustomer`,data);
      if (response.data.success) {
        setData({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        })
      toast.success(response.data.message)
      }else {
      toast.error(response.data.message)
      }
    }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-customer-firstname flex-col">
            <p>First Name</p>
            <input onChange={onChangeHandler} value={data.firstName} type="text" name='firstName' placeholder='Type here' />
        </div>
        <div className="add-customer-lastname flex-col">
            <p>Last Name</p>
            <input onChange={onChangeHandler} value={data.lastName} type="text" name='lastName' placeholder='Type here' />
        </div>
        <div className="add-customer-email flex-col">
            <p>Email</p>
            <input onChange={onChangeHandler} value={data.email} type="text" name='email' placeholder='Type here' />
        </div>
        <div className="add-customer-username flex-col">
            <p>Username</p>
            <input onChange={onChangeHandler} value={data.username} type="text" name='username' placeholder='Type here' />
        </div>
        <div className="add-customer-password flex-col">
            <p>Password</p>
            <input onChange={onChangeHandler} value={data.password} type="text" name='password' placeholder='Type here' />
        </div>
        <button type='submit' className='add-btn'>ADD CUSTOMER INFORMATION</button>
      </form>
    </div>
  )
}

export default AddCustomer
