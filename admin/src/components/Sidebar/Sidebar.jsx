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

        <NavLink to='/addIngredient' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Ingredient</p>
        </NavLink>
        <NavLink to='/listIngredients' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Ingredients</p>
        </NavLink>
        
        <NavLink to='/addCustomer' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Customer</p>
        </NavLink>

        <NavLink to='/listCustomer' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Customers</p>
        </NavLink>

        <NavLink to='/addEmployee' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Employee</p>
        </NavLink>

        <NavLink to='/listEmployee' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Employee</p>
        </NavLink>

        <NavLink to='/addDelivery' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Deflivery Address</p>
        </NavLink>

        <NavLink to='/listDelivery' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Delivery Address</p>
        </NavLink>

        {/* <NavLink to='/addSale' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Sales Report</p>
        </NavLink>

        <NavLink to='/listSale' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Sales Report</p>
        </NavLink> */}
      </div>
    </div>
  )
}

export default Sidebar
