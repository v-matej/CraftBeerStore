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
  // Add more methods if needed, like createBeer, updateBeer, deleteBeer, etc.
};

export default BeerService;
