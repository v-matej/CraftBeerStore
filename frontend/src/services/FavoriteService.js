import api from './api';

const FavoriteService = {
    getFavorites: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not logged in");
  
      const response = await api.get("/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  
    addFavorite: async (productId) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not logged in");
  
      const response = await api.post(
        "/favorite",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  
    removeFavorite: async (productId) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not logged in");
  
      const response = await api.delete(`/favorite/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  };

export default FavoriteService