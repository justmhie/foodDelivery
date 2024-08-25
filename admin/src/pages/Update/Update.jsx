import React, { useState, useEffect } from 'react';
import '../Add/Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Update = ({ url }) => {
  const { id: foodId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Originals",
    image: null
  });

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
          const food = response.data.data.find(item => item._id === foodId);
          if (food) {
            setData({
              name: food.name,
              description: food.description,
              price: food.price,
              category: food.category,
              image: food.image // Optional: if you want to handle image preview
            });
          } else {
            toast.error("Food not found");
          }
        } else {
          toast.error("Error fetching food details");
        }
      } catch (error) {
        toast.error("Error fetching food details");
      }
    };

    fetchFoodDetails();
  }, [url, foodId]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onFileChange = (event) => {
    setData(prevData => ({ ...prevData, image: event.target.files[0] }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", foodId); // Include ID in form data
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating food");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='Type here'
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder='Write content here'
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Originals">Originals</option>
              <option value="Classics">Classics</option>
              <option value="Milk Tea">Milk Tea</option>
              <option value="Smoothies">Smoothies</option>
              <option value="Fruit Tea">Fruit Tea</option>
              <option value="Milk Shakes">Milk Shakes</option>
              <option value="Charge Up">Charge Up</option>
              <option value="Customize">Customize</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
              placeholder='₱100'
            />
          </div>
        </div>
        <div className="add-image flex-col">
          <p>Product image</p>
          <input
            type="file"
            onChange={onFileChange}
            accept="image/*"
          />
        </div>
        <button type='submit' className='add-btn'>UPDATE</button>
      </form>
    </div>
  );
};

export default Update;
