import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/forgot-password', { email });
      setMessage('Password reset link sent!');
      // Optionally redirect to login or show confirmation
      navigate('/login');
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('Failed to send password reset link');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPasswordSubmit}>
        <div className="form-group mb-3">
          <label>Email:</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <Button 
          type="submit"
          variant="secondary"
          style={{
            backgroundColor: '#662671',
            color: 'white',
            border: '1px solid #662671',
            borderRadius: '14px',
            padding: '10px 50px',
          }}
        >
          Request Reset Link
        </Button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
