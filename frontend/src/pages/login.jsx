/**
 * WalletLoginPage Component
 * Handles user authentication and login functionality
 * Features:
 * - Email/password authentication
 * - Error handling and display
 * - Redirect to dashboard on successful login
 * - Social login options
 * 
 * @component
 * @returns {React.ReactElement}
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

const WalletLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        // Store token properly
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        dispatch(login(response.user.id));
        navigate('/dashboard');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Green section (left side) */}
      <div className="hidden md:flex md:w-1/2 bg-emerald-500 flex-col items-center justify-between p-8 text-white">
        <div className="w-full pt-4">
          {/* <img src="/api/placeholder/120/32" alt="BudgetBakers Logo" className="h-8" /> */}
        </div>
        
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Finances</h1>
          <h2 className="text-4xl font-bold mb-12">in One Place</h2>
          
          {/* <div className="max-w-md">
            <img src="/api/placeholder/480/300" alt="App Dashboard Preview" className="mb-8" />
          </div> */}
          
          <p className="text-lg mb-4">
            Dive into reports, build budgets, sync with your 
            banks and enjoy automatic categorization.
          </p>
          
          <button className="border-2 border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-emerald-500 transition-colors">
            Learn more about how Wallet works
          </button>
        </div>
        
        <div className="mb-4">
          {/* <img src="/api/placeholder/120/40" alt="Wallet Logo" className="h-10" /> */}
        </div>
      </div>

      {/* Login section (right side) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-6">
            <div className="relative inline-block text-left">
              <button className="flex items-center text-gray-700">
                English
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Log in</h2>
          
          <form className="mb-6" onSubmit={handleSubmit}>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            
            <div className="mb-6">
              <a href="#" className="text-emerald-500 text-sm hover:underline">Forgot password?</a>
            </div>
            
            <button type="submit" className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors">
              Log In
            </button>
          </form>
          
          <div className="relative flex items-center justify-center text-sm text-gray-500 my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4">or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/api/placeholder/24/24" alt="Facebook" />
              </div>
            </button>
            
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/api/placeholder/24/24" alt="Google" />
              </div>
            </button>
            
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/api/placeholder/24/24" alt="Apple" />
              </div>
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-700">
              Don't have account? 
              <Link to='/signup' className="text-emerald-500 font-medium hover:underline"> Sign Up</Link>
            </p>
          </div>
          
          <div className="mt-12 text-xs text-gray-500 text-center">
            <p>
              By signing up or connecting with the services above you agree to our 
              <a href="#" className="text-emerald-500 hover:underline ml-1">Terms of Service</a> and acknowledge our 
              <a href="#" className="text-emerald-500 hover:underline ml-1">Privacy Policy</a> describing how we handle your personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletLoginPage;