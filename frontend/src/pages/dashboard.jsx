/**
 * FinancialDashboard Component
 * Main dashboard interface for the wallet application
 * Features:
 * - Account balance overview
 * - Navigation menu
 * - Quick action buttons
 * - User profile access
 * 
 * @component
 * @returns {React.ReactElement}
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, UserCircleIcon, ChevronDownIcon, Settings, LogOut } from 'lucide-react';
import {AddAccountModal} from "/src/components/AddAccountModal";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { get_user_accounts } from '../services/account';

const FinancialDashboard = () => {
  const userId = useSelector(state => state.user.userId);
  const dispatch = useDispatch();
  const [isAccountModalActive, setIsAccountModalActive] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded bg-green-400 flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="ml-3 text-gray-800 font-medium">Dashboard</span>
              </div>

              {/* Navigation Links */}
              <div className="ml-10 flex space-x-8">
                <a href="#" className="border-b-2 border-transparent text-gray-800 px-1 pt-1 font-medium">
                  Accounts
                </a>
                <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 px-1 pt-1 font-medium">
                  Records
                </a>
                <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 px-1 pt-1 font-medium">
                  Analytics
                </a>
                <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 px-1 pt-1 font-medium">
                  Investments
                </a>
                <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 px-1 pt-1 font-medium">
                  Imports
                </a>
              </div>
            </div>

            {/* Right side navigation items */}
            <div className="flex items-center">
              <button className="mr-4 bg-blue-500 text-white px-4 py-1 rounded-md flex items-center">
                <PlusIcon className="h-4 w-4 mr-1" />
                Record
              </button>

              <div className="relative ml-4">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 mr-1 text-gray-700">{userId || 'User'}</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => navigate('/settings')}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </button>
                      <button
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex space-x-6">
          {/* Cash Card */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md w-64">
            <div className="flex items-center">
              <div className="mr-3">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6h12v3H6V6zm0 4h12v2H6v-2zm0 3h12v2H6v-2z" fill="currentColor" />
                      </svg>
                      <span className="ml-2 font-medium">Cash</span>
                    </div>
                    <div className="mt-2 text-xl font-bold">PKR 31,836.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Account Card */}
          <button
            className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex items-center justify-center w-64 cursor-pointer focus:outline-none"
            onClick={() => setIsAccountModalActive(true) }
          >
            {console.log(get_user_accounts(userId))}
            <div className="text-center">
              <PlusIcon className="h-6 w-6 text-gray-400 mx-auto" />
              <span className="mt-2 block text-gray-500">Add Account</span>
            </div>
          </button>
        </div>
      </div>
      <AddAccountModal 
        isAccountModalActive={isAccountModalActive} 
        setIsAccountModalActive={() => setIsAccountModalActive(false)} 
      />
    </div>
  );
};

export default FinancialDashboard;