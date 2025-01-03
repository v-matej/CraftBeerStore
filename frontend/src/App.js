import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import AuthProvider from "./context/AuthContext";
import TopBar from "./components/TopBar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import ManageBreweriesPage from "./pages/ManageBreweriesPage";
import BreweryDetailsPage from "./pages/BreweryDetailsPage";
import BreweryForm from "./components/BreweryForm";
import ManageBeerPage from "./pages/ManageBeerPage";
import BeerDetailsPage from "./pages/BeerDetailsPage";
import BeerForm from "./components/BeerForm"; 
import ManageUserPage from "./pages/ManageUserPage";
import CreateUserForm from "./components/CreateUserForm";
import UserDetailsPage from "./pages/UserDetailsPage";

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
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/breweries"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ManageBreweriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/breweries/new"
              element={
                <ProtectedRoute adminOnly={true}>
                  <BreweryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/breweries/:id"
              element={
                <ProtectedRoute adminOnly={true}>
                  <BreweryDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/breweries/:id/edit"
              element={
                <ProtectedRoute adminOnly={true}>
                  <BreweryForm />
                </ProtectedRoute>
              }
            />
            {/* Beer Management Routes */}
            <Route
              path="/admin/beers"
              element={
                <ProtectedRoute adminOnly={true}>
                  <ManageBeerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/beers/new"
              element={
                <ProtectedRoute adminOnly={true}>
                  <BeerForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/beers/:id"
              element={
                <ProtectedRoute adminOnly={true}>
                  <BeerDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/beers/:id/edit"
              element={
                <ProtectedRoute adminOnly={true}>
                  <BeerForm />
                </ProtectedRoute>
              }
            />
            {/*User Management*/}
            <Route path="/admin/users"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageUserPage />
              </ProtectedRoute>
              }
            />
            <Route path="/admin/users/new"
            element={
              <ProtectedRoute adminOnly={true}>
                <CreateUserForm />
              </ProtectedRoute>
              }
            />
            <Route path="/admin/users/:id"
            element={
              <ProtectedRoute adminOnly={true}>
                <UserDetailsPage />
              </ProtectedRoute>
              }
            />
          </Routes> 
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
