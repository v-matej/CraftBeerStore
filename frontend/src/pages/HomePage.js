import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeerService from "../services/BeerService";
import BreweryService from "../services/BreweryService";
import FavoriteService from "../services/FavoriteService"; // Import FavoriteService
import Filter from "../components/Filter";
import "../styles/HomePage.css";

const HomePage = () => {
  const [beers, setBeers] = useState([]);
  const [breweries, setBreweries] = useState([]);
  const [favorites, setFavorites] = useState([]); // To store favorite beers
  const [selectedBrewery, setSelectedBrewery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [alcoholPercentage, setAlcoholPercentage] = useState({
    selectedMin: 4,
    selectedMax: 7,
    isActive: false,
  });
  const [alcoholRange, setAlcoholRange] = useState({
    min: 4,
    max: 7,
  });
  const [beersLoading, setBeersLoading] = useState(true);
  const [breweriesLoading, setBreweriesLoading] = useState(true);
  const [beersError, setBeersError] = useState(null);
  const [breweriesError, setBreweriesError] = useState(null);

  const handleRangeChange = (event) => {
    const { name, value } = event.target;
    const newValue = parseFloat(value);

    setAlcoholPercentage((prev) => {
      if (name === "selectedMin" && newValue > prev.selectedMax) {
        return { ...prev, [name]: prev.selectedMax };
      }
      if (name === "selectedMax" && newValue < prev.selectedMin) {
        return { ...prev, [name]: prev.selectedMin };
      }
      return { ...prev, [name]: newValue };
    });
  };

  // Fetch beers and update state
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const data = await BeerService.getAllBeers();
        setBeers(data);
        const minAlcohol = Math.min(...data.map((beer) => beer.alcoholPercentage));
        const maxAlcohol = Math.max(...data.map((beer) => beer.alcoholPercentage));
        setAlcoholRange({ min: minAlcohol, max: maxAlcohol });
      } catch (err) {
        setBeersError("Failed to fetch beers.");
      } finally {
        setBeersLoading(false);
      }
    };

    fetchBeers();
  }, []);

  // Fetch breweries and update state
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const data = await BreweryService.getAllBreweries();
        setBreweries(data);
      } catch (err) {
        setBreweriesError("Failed to fetch breweries.");
      } finally {
        setBreweriesLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Fetch user's favorite beers
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteList = await FavoriteService.getFavorites();
        setFavorites(favoriteList.map((fav) => fav.product._id)); // Store only beer IDs
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, []);

  // Add beer to favorites
  const handleAddToFavorites = async (beerId) => {
    try {
      await FavoriteService.addFavorite(beerId);
      setFavorites((prevFavorites) => [...prevFavorites, beerId]);
    } catch (err) {
      console.error("Error adding to favorites", err);
    }
  };

  // Remove beer from favorites
  const handleRemoveFromFavorites = async (beerId) => {
    try {
      await FavoriteService.removeFavorite(beerId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== beerId)
      );
    } catch (err) {
      console.error("Error removing from favorites", err);
    }
  };

  // Filter beers based on selected filters
  const filteredBeers = React.useMemo(() => {
    return beers.filter((beer) => {
      const isWithinAlcoholRange =
        !alcoholPercentage.isActive ||
        (beer.alcoholPercentage >= alcoholPercentage.selectedMin &&
          beer.alcoholPercentage <= alcoholPercentage.selectedMax);

      const isMatchingBrewery = !selectedBrewery || beer.brewery.name === selectedBrewery;
      const isMatchingType = !selectedType || beer.type === selectedType;

      return isWithinAlcoholRange && isMatchingBrewery && isMatchingType;
    });
  }, [beers, selectedBrewery, selectedType, alcoholPercentage]);

  return (
    <div className="home-page">
      <main className="content">
        <Filter
          breweries={breweries}
          selectedBrewery={selectedBrewery}
          selectedType={selectedType}
          alcoholPercentage={alcoholPercentage}
          alcoholRange={alcoholRange}
          onBreweryChange={(e) => setSelectedBrewery(e.target.value)}
          onTypeChange={(e) => setSelectedType(e.target.value)}
          onRangeChange={(e) => handleRangeChange(e)}
          onAlcoholToggle={() => setAlcoholPercentage((prev) => ({ ...prev, isActive: !prev.isActive }))}
          uniqueBeerTypes={[...new Set(beers.map((beer) => beer.type))]}
        />
        <section className="products">
          <h2>All Beers</h2>
          {beersLoading && <p>Loading beers...</p>}
          {breweriesLoading && <p>Loading breweries...</p>}
          {beersError && <p className="error">{beersError}</p>}
          {breweriesError && <p className="error">{breweriesError}</p>}
          <div className="product-list">
            {!beersLoading &&
              !beersError &&
              filteredBeers.map((beer) => (
                <div key={beer._id} className="product-card">
                  {/* Link on beer name instead of a separate link */}
                  <h3>
                    <Link to={`/products/${beer._id}`}>{beer.name}</Link>
                  </h3>
                  <p>Type: {beer.type}</p>
                  <p>Alcohol: {beer.alcoholPercentage}%</p>
                  <p>Price: ${beer.price.toFixed(2)}</p>
                  {/* Check if the beer is in the favorites list */}
                  {favorites.includes(beer._id) ? (
                    <button onClick={() => handleRemoveFromFavorites(beer._id)}>Remove from Favorites</button>
                  ) : (
                    <button onClick={() => handleAddToFavorites(beer._id)}>Add to Favorites</button>
                  )}
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
