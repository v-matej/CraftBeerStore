import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../styles/ManageUserPage.css";

const ManageUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getAllUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddUser = () => navigate("/admin/users/new");

  return (
    <div className="manage-user-page">
      <h1>Manage Users</h1>
      <button onClick={handleAddUser} className="add-user-button">
        Add New User
      </button>
      {loading ? (
        <p className="user-loading">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="user-loading">No users found.</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user._id}
              className="user-card"
              onClick={() => navigate(`/admin/users/${user._id}`)}
            >
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUserPage;
