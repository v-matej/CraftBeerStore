import api from './api';

const BreweryService = {
  getAllBreweries: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get('/brewery', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching breweries:', error.response?.data || error.message);
      throw error;
    }
  },
  
  getBreweryById: async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get(`/brewery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching brewery by ID:', error.response?.data || error.message);
      throw error;
    }
  },
  
  createBrewery: async (breweryData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.post('/brewery', breweryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating brewery:', error.response?.data || error.message);
      throw error;
    }
  },
  
  updateBrewery: async (id, breweryData) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(breweryData);
    try {
      const response = await api.put(`/brewery/${id}`, breweryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating brewery:', error.response?.data || error.message);
      throw error;
    }
  },
  
  deleteBrewery: async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.delete(`/brewery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting brewery:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default BreweryService;
