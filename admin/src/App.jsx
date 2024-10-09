import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Add from './pages/Add/Add';
import Update from './pages/Update/Update';

import AddIngredient from './pages/AddIngredient/AddIngredient';
import ListIngredients from './pages/ListIngredients/ListIngredients';
import UpdateIngredient from './pages/UpdateIngredient/UpdateIngredient';

import AddEmployee from './pages/EmployeeCRUD/AddEmployee';
import ListEmployee from './pages/EmployeeCRUD/ListEmployee';
import UpdateEmployee from './pages/EmployeeCRUD/UpdateEmployee';
import UserInfo from './pages/User/UserInfo';
import ViewSales from './pages/Sales/ViewSales'; // Renamed import

// import AddDelivery from './pages/DeliveryAddressCRUD/AddDelivery';
// import ListDelivery from './pages/DeliveryAddressCRUD/ListDelivery';
// import UpdateDelivery from './pages/DeliveryAddressCRUD/UpdateDelivery';

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          {/* food */}
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/update/:id' element={<Update url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
          {/* ingredient */}
          <Route path='/addIngredient' element={<AddIngredient url={url} />} />
          <Route path='/listIngredients' element={<ListIngredients url={url} />} />
          <Route path='/updateIngredient/:id' element={<UpdateIngredient url={url} />} />

          <Route path='/addEmployee' element={<AddEmployee url={url} />} />
          <Route path='/listEmployee' element={<ListEmployee url={url} />} />
          <Route path='/updateEmployee/:id' element={<UpdateEmployee url={url} />} />

          <Route path='/userInfo' element={<UserInfo url={url} />} />
          <Route path='/viewSales' element={<ViewSales url={url} />} /> {/* Updated route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
