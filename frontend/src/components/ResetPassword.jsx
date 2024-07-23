import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import login from '../assets/login.png';
import logo from '../assets/logo2.png';
import { Button } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/reset-password', { token, newPassword });
      setMessage('Password has been reset successfully');
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Failed to reset password');
    }
  };

  return (
    // <div>
    //   <h2>Reset Password</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>New Password:</label>
    //       <input 
    //         type="password" 
    //         value={newPassword} 
    //         onChange={(e) => setNewPassword(e.target.value)} 
    //         required 
    //       />
    //     </div>
    //     <button type="submit">Reset Password</button>
    //   </form>
      <div 
      style={{ 
        backgroundImage: `url(${login})`,
        backgroundSize: '1100px 750px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(92, 33, 139, 0.3)',
        }}
      />
      <div className="container rounded p-4 p-md-5 align-left" style={{
        maxWidth: '450px',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255)',
        zIndex: 1, 
        marginTop: '3%',
      }}>
        <img src={logo} className='img-fluid mb-3' width={209} height={69} alt="Logo"/>
        <h6 className="text-center mb-4">Welcome to TableSprint admin</h6>
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          
          <div className="form-group mb-4">
            <label>New Password:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
      {message && <p className='alert alert-success'>{message}</p>}

          <Button 
              type="submit"
              variant="secondary"
              style={{
                backgroundColor: '#662671',
                color: 'white',
                border: '1px solid #662671',
                borderRadius: '14px',
                padding: '10px 50px',
                display: 'block',
                margin: '0 auto' 
              }}
          >
              Reset Password
          </Button>
        </form>
        <div className="mt-2">Back to login?
          <Link to="/Login" style={{ color: '#662671' }} className="text-decoration-none">
            Login
          </Link>
        </div>
      </div>
    </div>
    
    
  );
};

export default ResetPassword;
