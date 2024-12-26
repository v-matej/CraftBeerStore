import React from "react";
import "../styles/Filter.css";

const Filter = ({
  breweries,
  selectedBrewery,
  selectedType,
  alcoholPercentage,
  alcoholRange,
  onBreweryChange,
  onTypeChange,
  onRangeChange,
  onAlcoholToggle,
  uniqueBeerTypes,
}) => {
  return (
    <aside className="filter">
      <h3>Filter Options</h3>
      <div>
        <label>Brewery:</label>
        <select onChange={onBreweryChange} value={selectedBrewery}>
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
        <select onChange={onTypeChange} value={selectedType}>
          <option value="">All Types</option>
          {uniqueBeerTypes.map((type) => (
            <option key={type} value={type}>
              {type}
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
            name="selectedMin"
            min={alcoholRange.min}
            max={alcoholRange.max}
            step="0.1"
            value={alcoholPercentage.selectedMin}
            onChange={onRangeChange} // Trigger onRangeChange when the slider value changes
          />
          <input
            type="range"
            id="rangeInput"
            name="selectedMax"
            min={alcoholRange.min}
            max={alcoholRange.max}
            step="0.1"
            value={alcoholPercentage.selectedMax}
            onChange={onRangeChange} // Trigger onRangeChange when the slider value changes
          />
        </div>
        <label>
          <input
            type="checkbox"
            checked={alcoholPercentage.isActive}
            onChange={onAlcoholToggle}
          />
          Enable Alcohol Filter
        </label>
      </div>
    </aside>
  );
};

export default Filter;
