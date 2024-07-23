import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { FaArrowLeft } from "react-icons/fa6";
import gallery from '../assets/Gallery.png';
import axiosInstance from '../utils/axiosInstance';

const EditProduct = () => {
  const [product, setProduct] = useState({ categoryId: '', subcategoryId: '', name: '', sequence: '', image: null, status: 'active' });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); 
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/api/product/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setProduct({
          categoryId: res.data.categoryId,
          subcategoryId: res.data.subcategoryId,
          name: res.data.name,
          sequence: res.data.sequence,
          image: res.data.image,
          status: res.data.status,
        });
        setImagePreview(`https://tablesprint-task.onrender.com/uploads/${res.data.image}`);

      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/category', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axiosInstance.get('/api/subcategory', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
    fetchSubcategories();
  }, [id, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { 
        setProduct({ ...product, image: file });
        setImagePreview(URL.createObjectURL(file)); 
      } else {
        alert('File size exceeds 10MB');
        setProduct({ ...product, image: null });
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('categoryId', product.categoryId);
    formData.append('subcategoryId', product.subcategoryId);
    formData.append('name', product.name);
    formData.append('sequence', product.sequence);
    formData.append('status', product.status);
    if (product.image) formData.append('image', product.image);

    try {
      await axiosInstance.put(`/api/product/${id}`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate('/product');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h2><FaArrowLeft onClick={() => navigate('/product')} /> Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-3 mx-5">
              <div className="form-group">
                <label>Category:</label>
                <select
                  className="form-control"
                  value={product.categoryId}
                  onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3 mx-5">
              <div className="form-group">
                <label>Subcategory:</label>
                <select
                  className="form-control"
                  value={product.subcategoryId}
                  onChange={(e) => setProduct({ ...product, subcategoryId: e.target.value })}
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 mx-5">
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="col-md-3 mx-5">
              <div className="form-group">
                <label>Sequence:</label>
                <input
                  type="number"
                  className="form-control"
                  value={product.sequence}
                  onChange={(e) => setProduct({ ...product, sequence: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3 mx-5">
              <div className="form-group">
                <label>Status:</label>
                <select
                  className="form-control"
                  value={product.status}
                  onChange={(e) => setProduct({ ...product, status: e.target.value })}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 mx-5">
              <div className="form-group">
                <label>Upload Image:</label>
                <div
                  className="image-upload-area"
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      width="100"
                      style={{}}
                    />
                  ) : (
                    <span>Click to upload an image</span>
                  )}
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2 align-self-center align-items-center text-center">
              <div style={{
                border: '1px dashed #ddd',
                borderRadius: '14px',
                borderWidth: '2px',
                borderSpacing: '10px',
              }}>
                <img src={gallery} alt="Preview" width="70" />
                <p className="text-muted mt-2" style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>Upload Maximum allowed<br /> file size is 10MB</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-5 pt-5">
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                backgroundColor: 'white',
                color: '#662671',
                border: '1px solid #662671',
                borderRadius: '24px',
                padding: '10px 40px',
              }}
              onClick={() => navigate('/product')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: '#662671',
                border: 'none',
                borderRadius: '24px',
                marginRight: '10px',
                padding: '10px 40px',
                marginLeft: '10px',
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
