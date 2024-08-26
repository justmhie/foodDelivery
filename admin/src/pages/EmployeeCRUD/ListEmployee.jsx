import React, { useEffect, useState } from 'react'
import './ListEmployee.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const ListEmployee = ({url}) => {
  // const url = "http://localhost:4000";
  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/employees/listEmployee`)
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeEmployee = async(employeeId) => {
    // console.log(ingredientId);
    const response = await axios.post(`${url}/api/employees/removeEmployee`,{id:employeeId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  }
  
  const updateEmployee = (employeeId) => {
    navigate(`/updateEmployee/${employeeId}`);
  };

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Employees List</p>
      <div className="list-employeeTable-employee">
        <div className="list-employeeTable-format title">
          <b>First Name</b>
          <b>Last Name</b>
          <b>Email</b>
          <b>Username</b>
          <b>Password</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-employeeTable-format">
              <p>{item.employeeFirstName}</p>
              <p>{item.employeeLastName}</p>
              <p>{item.employeeEmail}</p>
              <p>{item.employeeUsername}</p>
              <p>{item.employeePassword}</p>
              <div className="action-container">
                <p onClick={()=>updateEmployee(item._id)} className='cursor'>✎</p>
                <p onClick={()=>removeEmployee(item._id)} className='cursor'>X</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListEmployee
