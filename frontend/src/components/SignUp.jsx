import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png';
import login from '../assets/login.png'; // Reuse background image for consistency
import { Button } from 'react-bootstrap';
import '../assets/css/Login.css'; // Assuming you have styles in Login.css
import axiosInstance from '../utils/axiosInstance';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axiosInstance.post('/api/auth/signup', { email, password });
      console.log(res.data.message); // Handle success message
      navigate('/login'); // Redirect to login page after successful sign-up
    } catch (error) {
      setError('Failed to sign up. Please try again.');
      console.error(error);
    }
  };

  return (
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
        zIndex: 1, // Ensures this div is above the overlay
        marginTop: '3%',
      }}>
        <img src={logo} className='img-fluid mb-3' width={209} height={69} alt="Logo"/>
        <h6 className="text-center mb-4">Welcome to TableSprint admin</h6>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="form-group mb-4">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                display: 'block',
                margin: '0 auto' // Center button horizontally
              }}
          >
              Sign Up
          </Button>
        </form>
        <div className="mt-2">Already have an account?
          <Link to="/Login" style={{ color: '#662671' }} className="text-decoration-none">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
