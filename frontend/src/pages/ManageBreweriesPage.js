import React, { useEffect, useState } from 'react';
import BreweryService from '../services/BreweryService';
import { useNavigate } from 'react-router-dom';
import "../styles/ManageBreweryPage.css";

const ManageBreweries = () => {
  const [breweries, setBreweries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    BreweryService.getAllBreweries()
      .then(setBreweries)
      .catch(console.error);
  }, []);

  return (
    <div className="manage-brewery-page">
      <h1>Manage Breweries</h1>
      <button className="add-brewery-button" onClick={() => navigate('/admin/breweries/new')}>Add New Brewery</button>
      <div className="brewery-list">
        {breweries.map((brewery) => (
          <div
            key={brewery.id}
            className="brewery-card"
            onClick={() => navigate(`/admin/breweries/${brewery._id}`)}
          >
            <h2>{brewery.name}</h2>
            <p>{brewery.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBreweries;
