import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDelivery = ({ url }) => {
  const { id: deliveryId } = useParams();  // Retrieve the ingredientId from the route
  const navigate = useNavigate();
  const [data, setData] = useState({
    customerName: "",
    street: "",
    city: "",
    province: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await axios.get(`${url}/api/deliveries/listDelivery`);
        const delivery = response.data.data.find(item => item._id === deliveryId);
        if (delivery) {
          setData({
            customerName: delivery.customerName,
            street: delivery.street,
            city: delivery.city,
            province: delivery.province,
            zipCode: delivery.zipCode,
          });
        } else {
          toast.error("Delivery not found");
        }
      } catch (error) {
        toast.error("Error fetching delivery details");
      }
    };
    fetchDelivery();
  }, [url, deliveryId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/deliveries/updateDelivery`, {
        id: deliveryId,
        ...data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/listDelivery');  // Redirect to the list ingredients page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating delivery");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-delivery-customername flex-col">
          <p>Cutomer name</p>
          <input onChange={onChangeHandler} value={data.customerName} type="text" name='customerName' placeholder='Type here' />
        </div>

        <div className="add-delivery-street flex-col">
          <p>Street</p>
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

        <button type='submit' className='add-btn'>UPDATE DELIVERY ADDRESS</button>
      </form>
    </div>
  );
};

export default UpdateDelivery;