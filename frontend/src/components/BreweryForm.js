import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreweryService from '../services/BreweryService';
import '../styles/BreweryForm.css';

const BreweryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    yearFounded: '',
    country: '',
    description: '',
    logoUrl: '',
  });

  useEffect(() => {
    if (id) {
      BreweryService.getBreweryById(id).then(setFormData).catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await BreweryService.updateBrewery(id, formData);
      } else {
        await BreweryService.createBrewery(formData);
      }
      navigate('/admin/breweries');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="brewery-form-container">
      <form className="brewery-form" onSubmit={handleSubmit}>
        <h1 className="form-title">{id ? 'Edit' : 'Add'} Brewery</h1>
        <input
          className="form-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="form-input"
          name="yearFounded"
          value={formData.yearFounded}
          onChange={handleChange}
          placeholder="Year Founded"
          required
        />
        <input
          className="form-input"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <textarea
          className="form-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          className="form-input"
          name="logoUrl"
          value={formData.logoUrl}
          onChange={handleChange}
          placeholder="Logo URL"
          required
        />
        <button className="form-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default BreweryForm;
