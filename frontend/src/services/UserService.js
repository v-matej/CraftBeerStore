import api from "./api";

const getAuthToken = () => localStorage.getItem("token");

const UserService = {
  getAllUsers: () =>
    api
      .get("/user", {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((response) => response.data),

  getUserById: (userId) =>
    api
      .get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((response) => response.data),

  createUser: (userData) =>
    api
      .post("/user", userData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((response) => response.data),

  updateUser: (userId, updatedData) =>
    api
      .put(`/user/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((response) => response.data),

  deleteUser: (userId) =>
    api
      .delete(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      .then((response) => response.data),
};

export default UserService;
