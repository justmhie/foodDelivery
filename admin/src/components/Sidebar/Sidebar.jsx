import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Food</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Foods</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>

        <NavLink to='/addIngredient' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Ingredient</p>
        </NavLink>
        <NavLink to='/listIngredients' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Ingredients</p>
        </NavLink>
        
        <NavLink to='/addCustomer' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Add Customer</p>
        </NavLink>

        <NavLink to='/listCustomer' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Customers</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
