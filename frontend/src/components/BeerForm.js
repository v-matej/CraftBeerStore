import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BeerService from '../services/BeerService';
import BreweryService from '../services/BreweryService'; // Import BreweryService
import '../styles/BeerForm.css';

const BeerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beer, setBeer] = useState({
    name: '',
    price: '',
    alcoholPercentage: '',
    color: '',
    type: '',
    brewery: '',
  });
  const [breweries, setBreweries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isEdit = Boolean(id);

  // Fetch breweries and beer details (if editing)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch breweries
        const breweryList = await BreweryService.getAllBreweries();
        setBreweries(breweryList);

        // If editing, fetch beer details
        if (isEdit) {
          const data = await BeerService.getBeerById(id);
          setBeer({
            name: data.name,
            price: data.price,
            alcoholPercentage: data.alcoholPercentage,
            color: data.color,
            type: data.type,
            brewery: data.brewery._id
          });
        }
      } catch (err) {
        console.error('Failed to fetch data:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBeer({ ...beer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await BeerService.updateBeer(id, beer);
      } else {
        await BeerService.createBeer(beer);
      }
      navigate('/admin/beers');
    } catch (err) {
      console.error('Failed to save beer:', err.message);
    }
  };

  return (
    <div className="beer-form-page">
      <h1>{isEdit ? 'Edit Beer' : 'Add New Beer'}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={beer.name}
            onChange={handleChange}
            placeholder="Beer Name"
            required
          />
          <input
            type="number"
            name="price"
            value={beer.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="alcoholPercentage"
            value={beer.alcoholPercentage}
            onChange={handleChange}
            placeholder="Alcohol Percentage (%)"
            required
          />
          <input
            type="text"
            name="color"
            value={beer.color}
            onChange={handleChange}
            placeholder="Color"
            required
          />
          <input
            type="text"
            name="type"
            value={beer.type}
            onChange={handleChange}
            placeholder="Type"
            required
          />
          <select
            name="brewery"
            value={beer.brewery}
            onChange={handleChange}
            required
          >
            <option value="">Select Brewery</option>
            {breweries.map((brewery) => (
              <option key={brewery._id} value={brewery._id}>
                {brewery.name}
              </option>
            ))}
          </select>
          <button type="submit">{isEdit ? 'Update Beer' : 'Add Beer'}</button>
        </form>
      )}
    </div>
  );
};

export default BeerForm;
