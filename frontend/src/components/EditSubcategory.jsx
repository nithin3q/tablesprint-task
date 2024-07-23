import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { FaArrowLeft } from "react-icons/fa6";
import gallery from '../assets/Gallery.png'; // Assuming you have this asset
import axiosInstance from '../utils/axiosInstance';

const EditSubcategory = () => {
  const [subcategory, setSubcategory] = useState({ categoryId: '', name: '', sequence: '', image: null, status: 'active' });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); 
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const res = await axiosInstance.get(`/api/subcategory/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setSubcategory({
          categoryId: res.data.categoryId,
          name: res.data.name,
          sequence: res.data.sequence,
          image: res.data.image,
          status: res.data.status,
        });
        setImagePreview(`http://localhost:5000/uploads/${res.data.image}`);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/api/category', {
          headers: {
            Authorization: `${token}`,
          },
        });
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchSubcategory();
    fetchCategories();
  }, [id, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { 
        setSubcategory({ ...subcategory, image: file });
        setImagePreview(URL.createObjectURL(file)); 
      } else {
        alert('File size exceeds 10MB');
        setSubcategory({ ...subcategory, image: null });
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('categoryId', subcategory.categoryId);
    formData.append('name', subcategory.name);
    formData.append('sequence', subcategory.sequence);
    formData.append('status', subcategory.status);
    if (subcategory.image) formData.append('image', subcategory.image);

    try {
      await axiosInstance.put(`/api/subcategory/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });
      navigate('/subcategory'); // Use navigate instead of history.push
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h2>
          <FaArrowLeft onClick={() => navigate('/subcategory')} /> Edit Subcategory
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-3 mx-3">
              <div className="form-group">
                <label>Category:</label>
                <select
                  className="form-control"
                  value={subcategory.categoryId}
                  onChange={(e) => setSubcategory({ ...subcategory, categoryId: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3 mx-3">
              <div className="form-group">
                <label>Subcategory Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={subcategory.name}
                  onChange={(e) => setSubcategory({ ...subcategory, name: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="col-md-3 mx-3">
              <div className="form-group">
                <label>Sequence:</label>
                <input
                  type="number"
                  className="form-control"
                  value={subcategory.sequence}
                  onChange={(e) => setSubcategory({ ...subcategory, sequence: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
           
          </div>
          <div className="row mb-3">
            <div className="col-md-3 mx-3">
              <div className="form-group">
                <label>Status:</label>
                <select
                  className="form-control"
                  value={subcategory.status}
                  onChange={(e) => setSubcategory({ ...subcategory, status: e.target.value })}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 mx-3">
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
                  <img src={gallery} alt="Preview" width="70" onClick={() => document.getElementById('imageUpload').click()}/>
                  <p className="text-muted mt-2" style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                    Upload Maximum allowed<br /> file size is 10MB
                  </p>
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
                onClick={() => navigate('/subcategory')}
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
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditSubcategory;
