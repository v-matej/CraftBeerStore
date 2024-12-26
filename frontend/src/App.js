import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css"
import AuthProvider from "./context/AuthContext";
import TopBar from './components/TopBar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';


// import ManufacturerListPage from './pages/ManufacturerListPage';
// import ManufacturerDetailsPage from './pages/ManufacturerDetailsPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <TopBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products/:productId" element={<ProductDetailsPage />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>}/>
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>} />

            
            {/* 
            <Route path="/manufacturers" element={<ManufacturerListPage />} />
            <Route path="/manufacturers/:manufacturerId" element={<ManufacturerDetailsPage />} />
             /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
