import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import AdminLayout from './AdminLayout'; 
import { FaArrowLeft } from "react-icons/fa6";
import gallery from '../assets/Gallery.png';
import axiosInstance from '../utils/axiosInstance';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [status, setStatus] = useState('active'); // Default status set to 'active'
  const navigate = useNavigate(); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { 
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); 
      } else {
        alert('File size exceeds 10MB');
        setImage(null);
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sequence', sequence);
    formData.append('status', status); // Include status in formData
    if (image) formData.append('image', image);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/api/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}` 
        }
      });
      console.log('Category added successfully:', response.data);
      navigate('/category');
    } catch (error) {
      console.error('Error adding category:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h2><FaArrowLeft onClick={() => navigate('/category')}/> Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-3 mx-5">
              <div className="form-group">
                <label>Category Name:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
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
                  value={sequence} 
                  onChange={(e) => setSequence(e.target.value)} 
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
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)} 
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 ms-5 ">
              <div className="form-group">
                <label>Upload Image:</label>
                <div 
                  className="image-upload-area" 
                  style={{
                    // border: '1px solid #ddd', 
                    borderRadius: '4px', 
                    padding: '10px', 
                    // textAlign: 'center', 
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
                    <img src={gallery} alt="Preview" width="100" style={{
                      border: '1px solid #ddd',
                      borderRadius: '14px',
                      padding: '10px',
                      // textAlign: 'center',
                      cursor: 'pointer',
                      position: 'relative'
                    }}/>
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
                // padding: '20px',
                borderWidth: '2px', // Thinner lines
                borderSpacing: '10px', // Larger gaps between dashes
              }}>
                <img src={gallery} alt="Preview" width="70" onClick={() => document.getElementById('imageUpload').click()}/>
                <p className="text-muted mt-2" style={{textAlign: 'center', fontSize: '12px', fontWeight: 'bold'}}>Upload Maximum allowed<br /> file size is 10MB</p>
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
              onClick={() => navigate('/category')}
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

export default AddCategory;
