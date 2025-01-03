import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BeerService from '../services/BeerService';
import "../styles/BeerDetailsPage.css";

const BeerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beer, setBeer] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    BeerService.getBeerById(id)
      .then(setBeer)
      .catch((err) => {
        console.error(err);
        setError("Failed to load beer details. Please try again.");
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await BeerService.deleteBeer(id);
      navigate('/admin/beers');
    } catch (err) {
      console.error(err);
      setError("Failed to delete the beer. Please try again.");
    } finally {
      setShowModal(false); // Close the modal
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (error) {
    return <p className="beer-loading">{error}</p>;
  }

  return beer ? (
    <div className="beer-details">
      <h1 className="beer-header">{beer.name}</h1>
      <div className="beer-info">
        <p className="beer-info-item">
          <span>Brewery:</span> {beer.brewery?.name || 'Unknown Brewery'}
        </p>
        <p className="beer-info-item">
          <span>Type:</span> {beer.type || 'N/A'}
        </p>
        <p className="beer-info-item">
          <span>Color:</span> {beer.color || 'N/A'}
        </p>
        <p className="beer-info-item">
          <span>Alcohol Percentage:</span> {beer.alcoholPercentage || 'N/A'}%
        </p>
      </div>
      <div className="beer-actions">
        <button
          className="beer-action-button edit"
          onClick={() => navigate(`/admin/beers/${id}/edit`)}
        >
          Edit
        </button>
        <button
          className="beer-action-button delete"
          onClick={openModal}
        >
          Delete
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this beer?</p>
            <div className="modal-actions">
              <button
                className="modal-button confirm"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="modal-button cancel"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="beer-loading">Loading...</p>
  );
};

export default BeerDetailsPage;
