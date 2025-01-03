import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-cards">
        <div className="admin-card" onClick={() => navigate('/admin/breweries')}>
          <h2>Breweries</h2>
        </div>
        <div className="admin-card" onClick={() => navigate('/admin/beers')}>
          <h2>Beers</h2>
        </div>
        <div className="admin-card" onClick={() => navigate('/admin/users')}>
          <h2>Users</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
