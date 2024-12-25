import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import BeerService from "../services/BeerService";
import BreweryService from "../services/BreweryService";
import "../styles/HomePage.css";

const HomePage = () => {
  const [beers, setBeers] = useState([]);
  const [breweries, setBreweries] = useState([]);
  const [selectedBrewery, setSelectedBrewery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alcoholPercentage, setAlcoholPercentage] = useState({
    min: 0,
    max: 0,
    selectedMin: 0.0,
    selectedMax: 0.0,
    isActive: false,
  });

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const data = await BeerService.getAllBeers();
        setBeers(data);
        setLoading(false);
        const minAlcohol = Math.min(...data.map((beer) => beer.alcoholPercentage));
        const maxAlcohol = Math.max(...data.map((beer) => beer.alcoholPercentage));
        setAlcoholPercentage((prev) => ({
          ...prev,
          min: minAlcohol,
          max: maxAlcohol,
          selectedMin: minAlcohol,
          selectedMax: maxAlcohol,
        }));
      } catch (err) {
        console.error("Error fetching beers:", err);
        setError("Failed to fetch beers. Please try again later.");
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const data = await BreweryService.getAllBreweries();
        setBreweries(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching breweries:", err);
        setError("Failed to fetch breweries. Please try again later.");
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  const handleRangeChange = (event) => {
    const { name, value } = event.target;
    const newValue = parseFloat(value).toFixed(1);

    if (name === "min") {
      if (parseFloat(newValue) > alcoholPercentage.selectedMax) return;
      setAlcoholPercentage((prev) => ({
        ...prev,
        selectedMin: newValue,
      }));
    } else if (name === "max") {
      if (parseFloat(newValue) < alcoholPercentage.selectedMin) return;
      setAlcoholPercentage((prev) => ({
        ...prev,
        selectedMax: newValue,
      }));
    }
  };

  const handleBreweryChange = (event) => {
    setSelectedBrewery(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAlcoholToggle = () => {
    setAlcoholPercentage((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  const filteredBeers = beers.filter((beer) => {
    const matchesAlcohol =
      !alcoholPercentage.isActive ||
      (beer.alcoholPercentage >= alcoholPercentage.selectedMin &&
        beer.alcoholPercentage <= alcoholPercentage.selectedMax);
    const matchesBrewery = selectedBrewery
      ? beer.brewery.name === selectedBrewery
      : true;
    const matchesType = selectedType ? beer.type === selectedType : true;
    return matchesAlcohol && matchesBrewery && matchesType;
  });

  return (
    <div className="home-page">
      <TopBar />
      <main className="content">
        <section className="products">
          <h2>All Beers</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          <div className="product-list">
            {!loading &&
              !error &&
              filteredBeers.map((beer) => (
                <div key={beer._id} className="product-card">
                  <h3>{beer.name}</h3>
                  <p className="beer-type">Type: {beer.type}</p>
                  <p className="beer-alcohol">Alcohol: {beer.alcoholPercentage}%</p>
                  <p className="beer-price">Price: ${beer.price.toFixed(2)}</p>
                  {/* Optionally, add an image if available */}
                  {beer.imageUrl && <img src={beer.imageUrl} alt={beer.name} className="beer-image" />}
                </div>
              ))}
          </div>

        </section>
        <aside className="filter">
          <h3>Filter Options</h3>
          <div>
            <label>Brewery:</label>
            <select onChange={handleBreweryChange} value={selectedBrewery}>
              <option value="">All Breweries</option>
              {breweries.map((brewery) => (
                <option key={brewery.name} value={brewery.name}>
                  {brewery.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Type:</label>
            <select onChange={handleTypeChange} value={selectedType}>
              <option value="">All Types</option>
              {beers.map((beer) => (
                <option key={beer.type} value={beer.type}>
                  {beer.type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Alcohol % Range:</label>
            <div className="range-container">
              <label>
                {alcoholPercentage.selectedMin}% - {alcoholPercentage.selectedMax}%
              </label>
              <input
                type="range"
                id="rangeInput"
                name="min"
                min={alcoholPercentage.min}
                max={alcoholPercentage.max}
                step="0.1"
                value={alcoholPercentage.selectedMin}
                onChange={handleRangeChange}
              />
              <input
                type="range"
                id="rangeInput"
                name="max"
                min={alcoholPercentage.min}
                max={alcoholPercentage.max}
                step="0.1"
                value={alcoholPercentage.selectedMax}
                onChange={handleRangeChange}
              />
            </div>
            <label>
              <input
                type="checkbox"
                checked={alcoholPercentage.isActive}
                onChange={handleAlcoholToggle}
              />
              Enable Alcohol Filter
            </label>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
