import React, { useState } from "react";
import { AddAccount } from "../services/account";
import { useSelector } from "react-redux";
import { AlignRight } from "lucide-react";
export function AddAccountModal({ isAccountModalActive, setIsAccountModalActive }) {
  const user_id = useSelector(state => state.user.userId);
  const [accountData, setAccountData] = useState({
    name: "",
    type: "checking",
    balance: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(accountData);
    try {
      const data = await AddAccount(user_id, accountData.name, accountData.balance, accountData.type)
      if (data.success) {
        setIsAccountModalActive(false);
      }
    } catch (error) {
      console.error(error)
    }
};

const handleOverlayClick = (e) => {
  // Only close if clicking the overlay itself, not the modal content
  if (e.target === e.currentTarget) {
    setIsAccountModalActive(false);
  }
};

if (!isAccountModalActive) return null;

return (
  <div
    className="fixed inset-0 bg-gray-50/75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    onClick={handleOverlayClick}  // Add click handler to overlay
  >
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative transform transition-all">
      {/* Header */}
      <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-xl font-medium">Add New Account</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Account Name */}
        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700 mb-1">
            Account Name
          </label>
          <input
            type="text"
            name="name"
            value={accountData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g., Main Checking Account"
            required
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Account Type */}
          <div>
            <label className="text-left block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              name="type"
              value={accountData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          {/* Currency */}
          {/* <div>
              <label className="text-left block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={accountData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div> */}
        </div>

        {/* Initial Balance */}
        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700 mb-1">
            Initial Balance
          </label>
          <input
            type="number"
            step="0.01"
            name="balance"
            value={accountData.balance}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="0.00"
            required
          />
        </div>

        {/* Description */}
        {/* <div className="mb-6">
            <label className="text-left text-left block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={accountData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              rows="3"
              placeholder="Add any notes about this account"
            />
          </div> */}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsAccountModalActive(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  </div>
);
}