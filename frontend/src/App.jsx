// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BaseURLProvider } from './components/BaseURLContext'; // Import BaseURLProvider
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Category from './components/Category';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import Subcategory from './components/Subcategory';
import AddSubcategory from './components/AddSubcategory';
import EditSubcategory from './components/EditSubcategory';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ViewProduct from './components/ViewProduct';
import ResetPassword from './components/ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <BaseURLProvider> {/* Wrap your application with BaseURLProvider */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/add-subcategory" element={<AddSubcategory />} />
        <Route path="/edit-subcategory/:id" element={<EditSubcategory />} />
        <Route path="/product" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/view-product/:id" element={<ViewProduct />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BaseURLProvider>
  </Router>
);

export default App;
