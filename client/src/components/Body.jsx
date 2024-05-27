// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Brand from './Brand';
import Dashboard from './Dashboard';
import AdminMenu from "./AdminMenu";
import Category from './Category';
import Subcategory from './Subcategory';
import Products from './products';
const App = () => {
  return (
    <Router>
      <div className="body">
        <AdminMenu />
        <div className="body-content">
          <Routes>
            <Route path="/admin" element={<Dashboard/>} />
            <Route path='/admin/Brand' element={<Brand/>}></Route>
            <Route path='/admin/Brand/:id' element={<Brand/>}></Route>
            <Route path="/admin/category" element={<Category/>} />
            <Route path="/admin/subcategory" element={<Subcategory/>} />
            <Route path="/admin/products" element={<Products/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
