import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSale = ({ url }) => {
  const { id: saleId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    totalSale: "",
    totalQuantity: "",
    saleCount: "",
    productName: "",
  });

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(`${url}/api/sales/listSale`);
        const sale = response.data.data.find(item => item._id === saleId);
        if (sale) {
          setData({
            startDate: sale.startDate,
            endDate: sale.endDate,
            totalSale: sale.totalSale,
            totalQuantity: sale.totalQuantity,
            saleCount: sale.saleCount,
            productName: sale.productName,
          });
        } else {
          toast.error("Sales Report not found");
        }
      } catch (error) {
        toast.error("Error fetching customer details");
      }
    };
    fetchCustomer();
  }, [url, saleId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/sales/updateSale`, {
        id: saleId,
        ...data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/listSale');
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

        <div className="add-sale-startDate flex-col">
          <p>Start Date</p>
          <input 
            onChange={onChangeHandler} 
            value={data.startDate} 
            type="text" 
            name='startDate' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-sale-endDate flex-col">
          <p>End Date</p>
          <input 
            onChange={onChangeHandler} 
            value={data.endDate} 
            type="text" 
            name='endDate' 
            placeholder='Type here' 
          />
        </div>
        
        <div className="add-sale-totalSale flex-col">
          <p>Total Sales</p>
          <input 
            onChange={onChangeHandler} 
            value={data.totalSale} 
            type="text" 
            name='totalSale' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-sale-startDate flex-col">
          <p>Total Quantity</p>
          <input 
            onChange={onChangeHandler} 
            value={data.totalQuantity} 
            type="text" 
            name='totalQuantity' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-sale-saleCount flex-col">
          <p>Sale Count</p>
          <input 
            onChange={onChangeHandler} 
            value={data.saleCount} 
            type="text" 
            name='saleCount' 
            placeholder='Type here' 
          />
        </div>

        <div className="add-sale-productName flex-col">
          <p>Product Name</p>
          <input 
            onChange={onChangeHandler} 
            value={data.productName} 
            type="text" 
            name='productName' 
            placeholder='Type here' 
          />
        </div>
        <button type='submit' className='add-btn'>UPDATE SALES REPORT</button>
      </form>
    </div>
  );
};

export default UpdateSale;
