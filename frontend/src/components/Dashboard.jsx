import React from 'react';
import AdminLayout from './AdminLayout';
import logo from '../assets/logo2.png';
import '../assets/css/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard-content">
        <img src={logo} width="299" height="99" className="d-inline-block align-top" alt="Logo" />
        <h2>Welcome to TableSprint admin</h2>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
