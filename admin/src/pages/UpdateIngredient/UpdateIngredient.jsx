import React, { useState, useEffect } from 'react';
import '../AddIngredient/AddIngredient.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateIngredient = ({ url }) => {
  const { id: ingredientId } = useParams();  // Retrieve the ingredientId from the route
  const navigate = useNavigate();
  const [data, setData] = useState({
    ingredient: "",
    amount: "",
    unitOfMeasurement: "",
    pricePerUnit: "",
    expirationDate: "",
    status: "In Stock"
  });

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const response = await axios.get(`${url}/api/ingredients/listIngredients`);
        const ingredient = response.data.data.find(item => item._id === ingredientId);
        if (ingredient) {
          setData({
            ingredient: ingredient.ingredient,
            amount: ingredient.amount,
            unitOfMeasurement: ingredient.unitOfMeasurement,
            pricePerUnit: ingredient.pricePerUnit,
            expirationDate: ingredient.expirationDate.split('T')[0],
            status: ingredient.status,
          });
        } else {
          toast.error("Ingredient not found");
        }
      } catch (error) {
        toast.error("Error fetching ingredient details");
      }
    };
    fetchIngredient();
  }, [url, ingredientId]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/ingredients/updateIngredient`, {
        id: ingredientId,
        ...data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/listIngredients');  // Redirect to the list ingredients page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating ingredient");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-ingredient-name flex-col">
          <p>Ingredient name</p>
          <input onChange={onChangeHandler} value={data.ingredient} type="text" name='ingredient' placeholder='Type here' />
        </div>
        <div className="add-ingredient-amount-unitOfMeasurement">
          <div className="add-ingredient-amount flex-col">
            <p>Amount</p>
            <input onChange={onChangeHandler} value={data.amount} type="Number" name='amount' placeholder='1.5' />
          </div>
          <div className="add-ingredient-unitOfMeasurement flex-col">
            <p>Unit of Measurement</p>
            <input onChange={onChangeHandler} value={data.unitOfMeasurement} type="text" name='unitOfMeasurement' placeholder='kg' />
          </div>
        </div>
        <div className="add-ingredient-pricePerUnit flex-col">
          <p>Price Per Unit</p>
          <input onChange={onChangeHandler} value={data.pricePerUnit} type="Number" name='pricePerUnit' placeholder='100' />
        </div>
        <div className="add-ingredient-expirationDate flex-col">
          <p>Expiration Date</p>
          <input onChange={onChangeHandler} value={data.expirationDate} type="date" name='expirationDate' />
        </div>
        <div className="add-ingredient-status flex-col">
          <p>Status</p>
          <select onChange={onChangeHandler} name="status" value={data.status}>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <button type='submit' className='add-btn'>UPDATE INGREDIENT</button>
      </form>
    </div>
  );
};

export default UpdateIngredient;