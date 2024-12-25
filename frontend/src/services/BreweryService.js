import api from './api';

const BreweryService = {
  getAllBreweries: async () => {
    const response = await api.get('/brewery');
    return response.data;
  },
  getBreweryById: async (id) => {
    const response = await api.get(`/brewery/${id}`);
    return response.data;
  },
  // Add more methods if needed, like createBrewery, updateBrewery, deleteBrewery, etc.
};

export default BreweryService;
