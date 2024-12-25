import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css"

import HomePage from './pages/HomePage';
// import ProductDetailsPage from './pages/ProductDetailsPage';
// import ManufacturerListPage from './pages/ManufacturerListPage';
// import ManufacturerDetailsPage from './pages/ManufacturerDetailsPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ShoppingCartPage from './pages/ShoppingCartPage';
// import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/manufacturers" element={<ManufacturerListPage />} />
        <Route path="/manufacturers/:manufacturerId" element={<ManufacturerDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
