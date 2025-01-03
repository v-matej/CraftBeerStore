import api from './api';

const BeerService = {
  getAllBeers: async () => {
    const response = await api.get('/beer');
    return response.data;
  },
  getBeerById: async (beerId) => {
    try {
      const response = await api.get(`/beer/${beerId}`);
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch beer by ID");
    }
  },

  createBeer: async (beerData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/beer', beerData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw new Error('Failed to create beer');
    }
  },

  updateBeer: async (beerId, beerData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`/beer/${beerId}`, beerData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw new Error('Failed to update beer');
    }
  },

  deleteBeer: async (beerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(`/beer/${beerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw new Error('Failed to delete beer');
    }
  },
};

export default BeerService;