import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <BaseURLProvider> {/* Wrap your application with BaseURLProvider */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <PrivateRoute>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-category/:id"
          element={
            <PrivateRoute>
              <EditCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/subcategory"
          element={
            <PrivateRoute>
              <Subcategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-subcategory"
          element={
            <PrivateRoute>
              <AddSubcategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-subcategory/:id"
          element={
            <PrivateRoute>
              <EditSubcategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-product/:id"
          element={
            <PrivateRoute>
              <ViewProduct />
            </PrivateRoute>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BaseURLProvider>
  </Router>
);

export default App;
