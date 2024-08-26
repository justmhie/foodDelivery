import React, { useState, useEffect } from 'react';
// import '../AddCustomer/AddCustomer.css';
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
        const response = await axios.get(`${url}/api/customer/listCustomer`);
        const customer = response.data.data.find(item => item._id === customerId);
        if (customer) {
          setData({
            firstName: firstName.firstName,
            lastName: lastName.lastName,
            email: email.email,
            username: username.username,
            password: password.password,
          });
        } else {
          toast.error("Customer not found");
        }
      } catch (error) {
        toast.error("Error fetching custp,rt details");
      }
    };
    fetchCustomer();
  }, [url, customerId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/customer/updateCustomer`, {
        id: customerId,
        ...data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/listCustomer');  // Redirect to the list ingredients page
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
          <p>First name</p>
          <input onChange={onChangeHandler} value={data.customer} type="text" name='customer' placeholder='Type here' />
        </div>

        <div className="add-customer-lastName flex-col">
          <p>Last name</p>
          <input onChange={onChangeHandler} value={data.customer} type="text" name='customer' placeholder='Type here' />
        </div>

        <div className="add-customer-email flex-col">
          <p>Email</p>
          <input onChange={onChangeHandler} value={data.customer} type="text" name='customer' placeholder='Type here' />
        </div>

        <div className="add-customer-username flex-col">
          <p>Username</p>
          <input onChange={onChangeHandler} value={data.customer} type="text" name='customer' placeholder='Type here' />
        </div>

        <div className="add-customer-password flex-col">
          <p>Password</p>
          <input onChange={onChangeHandler} value={data.customer} type="text" name='customer' placeholder='Type here' />
        </div>

        <button type='submit' className='add-btn'>UPDATE INGREDIENT</button>
      </form>
    </div>
  );
};

export default UpdateCustomer;