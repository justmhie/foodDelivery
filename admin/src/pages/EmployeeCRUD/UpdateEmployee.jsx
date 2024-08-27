import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = ({ url }) => {
  const { id: employeeId } = useParams();  
  const navigate = useNavigate();
  const [data, setData] = useState({
    employeeFirstName: "",
    employeeLastName: "",
    employeeEmail: "",
    employeeUsername: "",
    employeePassword: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${url}/api/employees/listEmployee`);
        const employee = response.data.data.find(item => item._id === employeeId);
        if (employee) {
          setData({
            employee: employee.employee,
            employeeFirstName: employee.employeeFirstName,
            employeeLastName: employee.employeeLastName,
            employeeEmail: employee.employeeEmail,
            employeeUsername: employee.employeeUsername,
            employeePassword: employee.employeePassword
          });
        } else {
          toast.error("Employee not found");
        }
      } catch (error) {
        toast.error("Error fetching employee details");
      }
    };
    fetchEmployee();
  }, [url, employeeId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/employees/updateEmployee`, {
        id: employeeId,
        ...data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/listEmployee');  
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating employee");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-employee-firstname flex-col">
          <p>First name</p>
          <input onChange={onChangeHandler} value={data.employeeFirstName} type="text" name='employeeFirstName' placeholder='Type here' />
        </div>

        <div className="add-employee-lastname flex-col">
          <p>Last name</p>
          <input onChange={onChangeHandler} value={data.employeeLastName} type="text" name='employeeLastName' placeholder='Type here' />
        </div>

        <div className="add-employee-email flex-col">
          <p>Email</p>
          <input onChange={onChangeHandler} value={data.employeeEmail} type="text" name='employeeEmail' placeholder='Type here' />
        </div>

        <div className="add-employee-username flex-col">
          <p>Username</p>
          <input onChange={onChangeHandler} value={data.employeeUsername} type="text" name='employeeUsername' placeholder='Type here' />
        </div>

        <div className="add-employee-password flex-col">
          <p>Password</p>
          <input onChange={onChangeHandler} value={data.employeePassword} type="text" name='employeePassword' placeholder='Type here' />
        </div>


        <button type='submit' className='add-btn'>UPDATE EMPLOYEE</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;