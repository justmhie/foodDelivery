import React, { useState } from 'react'
import './AddEmployee.css';
import axios from "axios"
import { toast } from 'react-toastify'

const AddEmployee = ({url}) => {
   
    const [data, setData] = useState({
      employeeFirstName: "",
      employeeLastName: "",
      employeeEmail: "",
      employeeUsername: "",
      employeePassword: "",
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
      const response = await axios.post(`${url}/api/employees/addEmployee`,data);
      if (response.data.success) {
        setData({
            employeeFirstName: "",
            employeeLastName: "",
            employeeEmail: "",
            employeeUsername: "",
            employeePassword: "",
        })
      toast.success(response.data.message)
      }else {
      toast.error(response.data.message)
      }
    }
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-employee-firstname flex-col">
            <p>Employee First Name</p>
            <input onChange={onChangeHandler} value={data.employee} type="text" name='employee' placeholder='Type here' />
        </div>

        <div className="add-employee-lastname flex-col">
            <p>Employee Last Name</p>
            <input onChange={onChangeHandler} value={data.employee} type="text" name='employee' placeholder='Type here' />
        </div>

        <div className="add-employee-email flex-col">
            <p>Employee First Name</p>
            <input onChange={onChangeHandler} value={data.employee} type="text" name='employee' placeholder='Type here' />
        </div>

        <div className="add-employee-username flex-col">
            <p>Employee First Name</p>
            <input onChange={onChangeHandler} value={data.employee} type="text" name='employee' placeholder='Type here' />
        </div>

        <div className="add-employee-password flex-col">
            <p>Employee First Name</p>
            <input onChange={onChangeHandler} value={data.employee} type="text" name='employee' placeholder='Type here' />
        </div>

        <button type='submit' className='add-btn'>ADD EMPLOYEE</button>
      </form>
    </div>
  )
}

export default AddEmployee
