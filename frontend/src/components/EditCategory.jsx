import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { FaArrowLeft } from "react-icons/fa6";
import gallery from '../assets/Gallery.png';
import axiosInstance from '../utils/axiosInstance';

const EditCategory = () => {
  const [category, setCategory] = useState({ name: '', sequence: '', image: null, status: 'active' });
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const fileInputRef = React.createRef();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get(`/api/category/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setCategory({
          name: res.data.name,
          sequence: res.data.sequence,
          image: res.data.image,
          status: res.data.status,
        });
        setImagePreview(`https://tablesprint-task.onrender.com/uploads/${res.data.image}`);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category:', error.response ? error.response.data : error.message);
      }
    };

    fetchCategory();
  }, [id, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { // 10MB size limit
        setCategory(prevCategory => ({
          ...prevCategory,
          image: file
        }));
        setImagePreview(URL.createObjectURL(file));
      } else {
        alert('File size exceeds 10MB');
        setCategory(prevCategory => ({
          ...prevCategory,
          image: null
        }));
        setImagePreview(null);
      }
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('sequence', category.sequence);
    formData.append('status', category.status);
    if (category.image) formData.append('image', category.image);

    try {
      await axiosInstance.put(`/api/category/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });
      navigate('/category');
    } catch (error) {
      console.error('Error updating category:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h2><FaArrowLeft onClick={() => navigate('/category')} /> Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-3 mx-5">
              <div className="form-group">
                <label>Category Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={category.name}
                  onChange={(e) => setCategory(prev => ({ ...prev, name: e.target.value }))}
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
                  value={category.sequence}
                  onChange={(e) => setCategory(prev => ({ ...prev, sequence: e.target.value }))}
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
                  value={category.status}
                  onChange={(e) => setCategory(prev => ({ ...prev, status: e.target.value }))}
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
                  onClick={handleImageUploadClick}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      width="100"
                    />
                  ) : (
                    <img src={gallery} alt="Upload" width="70" />
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-2 align-self-center text-center">
              <div style={{ 
                border: '1px dashed #ddd', 
                borderRadius: '14px',
                borderWidth: '2px', 
                borderSpacing: '10px', 
              }}>
                <img src={gallery} alt="Upload" width="70" onClick={handleImageUploadClick}/>
                <p className="text-muted mt-2" style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                  Upload Maximum allowed<br /> file size is 10MB
                </p>
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

export default EditCategory;
