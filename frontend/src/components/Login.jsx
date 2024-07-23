import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance'; 
import logo from '../assets/logo2.png';
import login from '../assets/login.png';
import { Button, Modal } from 'react-bootstrap';
import '../assets/css/Login.css';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState(''); // Separate state for forgot password email
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Invalid email or password');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/forgot-password', { email: forgotEmail });
      alert('Password reset link sent!');
      setShowForgotPasswordModal(false); // Close the modal
    } catch (error) {
      console.error('Error requesting password reset:', error);
      alert('Failed to send password reset link');
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
        backgroundColor: 'white',
        zIndex: 1,
        marginTop: '3%',
      }}>
        <img src={logo} className='img-fluid mb-3' width={209} height={69} alt="Logo"/>
        <h6 className="text-center mb-4">Welcome to TableSprint admin</h6>
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
          <div className="form-group mb-1">
            <label>Password:</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group mb-5 text-center">
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); setShowForgotPasswordModal(true); }} 
              className="text-decoration-none" 
              style={{ color: '#662671' }}
            >
              Forgot password?
            </a>
          </div>
          {error && <p className="text-danger">{error}</p>}
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
            Login
          </Button>
        </form>
        <div className="mt-2 mb-3">
          Don't have an account? 
          <Link to="/signup" style={{ color: '#662671' }} className="text-decoration-none">SignUp</Link>
        </div>

        {/* Forgot Password Modal */}
        <Modal 
          show={showForgotPasswordModal} 
          onHide={() => setShowForgotPasswordModal(false)} 
          centered
        >
          <Modal.Header className="justify-content-center" style={{ border: 'none' }}>
            <Modal.Title style={{ color: '#662671' }}>Did you forget your password?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: '14px', textAlign: 'center' }}>
              Enter your email address and we’ll send you a link to restore password
            </p>
            <form onSubmit={handleForgotPasswordSubmit} className='px-5'>
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={forgotEmail} 
                  onChange={(e) => setForgotEmail(e.target.value)} 
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
                  padding: '10px 115px',
                  marginTop: '10px',
                }}
              >
                Request Reset Link
              </Button>
            </form>
            <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '20px', color: '#662671' }}>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setShowForgotPasswordModal(false); }} 
                style={{ color: '#662671' }}
              >
                Back to Login
              </a>
            </p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
