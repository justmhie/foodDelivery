import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCustomer = ({ url }) => {
  const { id: customerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${url}/api/customers/listCustomer`);
        const customer = response.data.data.find(item => item._id === customerId);
        if (customer) {
          setData({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            username: customer.username,
            password: customer.password,
          });
        } else {
          toast.error("Customer not found");
        }
      } catch (error) {
        toast.error("Error fetching customer details");
      }
    };
    fetchCustomer();
  }, [url, customerId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/customers/updateCustomer`, {
        id: customerId,
        ...data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/listCustomer');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating customer");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-customer-firstname flex-col">
          <p>First Name</p>
          <input 
            onChange={onChangeHandler} 
            value={data.firstName} 
            type="text" 
            name='firstName' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-customer-lastname flex-col">
          <p>Last Name</p>
          <input 
            onChange={onChangeHandler} 
            value={data.lastName} 
            type="text" 
            name='lastName' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-customer-email flex-col">
          <p>Email</p>
          <input 
            onChange={onChangeHandler} 
            value={data.email} 
            type="text" 
            name='email' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-customer-username flex-col">
          <p>Username</p>
          <input 
            onChange={onChangeHandler} 
            value={data.username} 
            type="text" 
            name='username' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-customer-password flex-col">
          <p>Password</p>
          <input 
            onChange={onChangeHandler} 
            value={data.password} 
            type="text" 
            name='password' 
            placeholder='Type here' 
          />
        </div>

        <button type='submit' className='add-btn'>UPDATE CUSTOMER</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
