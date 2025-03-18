/**
 * App Component
 * Root component handling routing and layout
 * Features:
 * - Route configuration
 * - Protected routes
 * - Public routes
 * - Navigation structure
 * 
 * @component
 * @returns {React.ReactElement}
 */

import { useState } from 'react'
import './App.css'
import WalletLoginPage from './pages/login'
import FinancialDashboard from './pages/dashboard'
import WalletSignupPage from './pages/signup'
import BudgetBakersHomepage from './pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BudgetBakersHomepage />} />
        <Route path="/login" element={<WalletLoginPage />} />
        <Route path="/signup" element={<WalletSignupPage />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <FinancialDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
