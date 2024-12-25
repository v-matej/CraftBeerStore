import api from './api';

const BeerService = {
  getAllBeers: async () => {
    const response = await api.get('/beer');
    return response.data;
  },
  getBeerById: async (id) => {
    const response = await api.get(`/beer/${id}`);
    return response.data;
  },
  // Add more methods if needed, like createBeer, updateBeer, deleteBeer, etc.
};

export default BeerService;
