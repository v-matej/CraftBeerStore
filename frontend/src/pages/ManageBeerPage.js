import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeerService from "../services/BeerService";
import "../styles/ManageBeerPage.css";

const ManageBeerPage = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    BeerService.getAllBeers()
      .then(setBeers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddBeer = () => navigate("/admin/beers/new");

  return (
    <div className="manage-beer-page">
      <h1>Manage Beers</h1>
      <button onClick={handleAddBeer} className="add-beer-button">
        Add New Beer
      </button>
      {loading ? (
        <p className="beer-loading">Loading beers...</p>
      ) : beers.length === 0 ? (
        <p className="beer-loading">No beers found.</p>
      ) : (
        <div className="beer-list">
          {beers.map((beer) => (
            <div
              key={beer._id}
              className="beer-card"
              onClick={() => navigate(`/admin/beers/${beer._id}`)}
            >
              <h2>{beer.name}</h2>
              <p>{beer.brewery?.name}</p>
              <p>Type: {beer.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBeerPage;
