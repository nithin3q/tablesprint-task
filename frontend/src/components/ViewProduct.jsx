import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { FaArrowLeft } from "react-icons/fa6";
import axiosInstance from '../utils/axiosInstance';

const ViewProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/api/product/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  // if (!product) return <div>Loading...</div>;

  return (
    <AdminLayout>
      {product && (
      <div className="container mt-4">
        <h2>
          <FaArrowLeft onClick={() => navigate('/product')} /> View Product
        </h2>
        <div className="row mb-3">
          <div className="col-md-4 mx-5">
            <div className="form-group">
              <label><strong>Name:</strong></label>
              <p>{product.name}</p>
            </div>
          </div>
          <div className="col-md-4 mx-5">
            <div className="form-group">
              <label><strong>Category:</strong></label>
              <p>{product.Category.name}</p>
            </div>
          </div>
          <div className="col-md-4 mx-5">
            <div className="form-group">
              <label><strong>Subcategory:</strong></label>
              <p>{product.Subcategory.name}</p>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4 mx-5">
            <div className="form-group">
              <label><strong>Status:</strong></label>
              <p>{product.status}</p>
            </div>
          </div>
          <div className="col-md-4 mx-5">
            <div className="form-group">
              <label><strong>Sequence:</strong></label>
              <p>{product.sequence}</p>
            </div>
          </div>
        </div>
        {product.image && (
          <div className="row mb-3">
            <div className="col-md-4 mx-5">
              <div className="form-group">
                <label><strong>Image:</strong></label>
                <br />
                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} style={{ maxWidth: '300px' }} />
              </div>
            </div>
          </div>
        )}
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
            Back
          </button>
        </div>
      </div>)}
      {!product && <div class="spinner-border" role="status">
  <span class="sr-only"></span>
</div>}
    </AdminLayout>
  );
};

export default ViewProduct;
