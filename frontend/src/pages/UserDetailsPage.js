import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import {jwtDecode} from "jwt-decode"; // To decode JWT
import "../styles/UserDetailsPage.css";

const UserDetailsPage = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({}); // State for form values
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUserId(decodedToken.id);
    }

    const fetchUser = async () => {
      try {
        const fetchedUser = await UserService.getUserById(id);
        setUser(fetchedUser);
        setUpdatedUser({ email: fetchedUser.email, role: fetchedUser.role });
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch user details.");
      }
    };

    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await UserService.deleteUser(id);
      navigate("/admin/users"); // Redirect to user list after deletion
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete user.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await UserService.updateUser(id, updatedUser);
      setUser(updatedData);
      setSuccess("User updated successfully.");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (error) {
    return (
      <div className="user-details-page">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-details-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  const isOwnAccount = user._id === loggedInUserId;

  return (
    <div className="user-details-page">
      <h2>User Details</h2>
      <div className="user-info">
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {!isOwnAccount ? (
        <button className="delete-button" onClick={openModal}>
          Delete User
        </button>
      ) : (
        <p className="error-message">You cannot delete your own account.</p>
      )}

      {isModalOpen && !isOwnAccount && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h2>Edit User</h2>
      <form className="edit-user-form" onSubmit={handleUpdate}>
        <label>
          Email:
          <input
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            required
          />
        </label>
        <label>
          Role:
          <select
            value={updatedUser.role}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, role: e.target.value })
            }
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" className="update-button">
          Update User
        </button>
      </form>

      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default UserDetailsPage;
