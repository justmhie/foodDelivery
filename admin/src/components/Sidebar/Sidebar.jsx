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
            <p>Add Products</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Products</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>

        <NavLink to='/userInfo' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>View Users</p>
        </NavLink>

        <NavLink to='/addIngredient' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Ingredient</p>
        </NavLink>
        <NavLink to='/listIngredients' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Ingredients</p>
        </NavLink>

        <NavLink to='/addEmployee' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Employee</p>
        </NavLink>

        <NavLink to='/listEmployee' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Employee</p>
        </NavLink>

        <NavLink to='/viewSales' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>View Sales Report</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
