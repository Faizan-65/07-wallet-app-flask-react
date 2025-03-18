/**
 * Authentication service module
 * Handles user authentication operations including login, logout, and token management
 * @module auth
 */

import { fetchWithAuth } from './api';

const API_URL = 'http://localhost:5000';

/**
 * Attempts to log in a user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response object containing success status and data/error
 */

export const loginUser = async (email, password) => {
  try {
    const response = await fetchWithAuth('users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        token: data.token,
        user: data.user
      };
    } else {
      return {
        success: false,
        error: data.error
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error'
    };
  }
};

/**
 * Logs out the current user by removing authentication data from localStorage
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

/**
 * Retrieves the authorization header with JWT token if it exists
 * @returns {Object} Headers object containing Authorization Bearer token if available
 */
export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};
