import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BreweryService from '../services/BreweryService';
import "../styles/BreweryDetailsPage.css";

const BreweryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brewery, setBrewery] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    BreweryService.getBreweryById(id)
      .then(setBrewery)
      .catch((err) => {
        console.error(err);
        setError("Failed to load brewery details. Please try again.");
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await BreweryService.deleteBrewery(id);
      navigate('/admin/breweries');
    } catch (err) {
      console.error(err);
      setError("Failed to delete the brewery. Please try again.");
    } finally {
      setShowModal(false); // Close the modal
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (error) {
    return <p className="brewery-loading">{error}</p>;
  }

  return brewery ? (
    <div className="brewery-details">
      <h1 className="brewery-header">{brewery.name}</h1>
      <div className="brewery-info">
        <p className="brewery-info-item">
          <span>Founded:</span> {brewery.yearFounded}
        </p>
        <p className="brewery-info-item">
          <span>Country:</span> {brewery.country}
        </p>
        <p className="brewery-description">{brewery.description}</p>
      </div>
      <div className="brewery-actions">
        <button
          className="brewery-action-button edit"
          onClick={() => navigate(`/admin/breweries/${id}/edit`)}
        >
          Edit
        </button>
        <button
          className="brewery-action-button delete"
          onClick={openModal}
        >
          Delete
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this brewery?</p>
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
    <p className="brewery-loading">Loading...</p>
  );
};

export default BreweryDetails;
