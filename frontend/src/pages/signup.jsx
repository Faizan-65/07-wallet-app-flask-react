import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/users';
const WalletSignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
         e.preventDefault();
         setError(''); // Clear any previous errors
         try {
             const response = await signupUser(name, email, password);
             if (response.success) {
                 // Redirect to login page on success
                 navigate('/login');
             } else {
                 // Set error from response if signup failed
                 setError(response.error || 'Signup failed');
             }
         } catch (err) {
             setError('An unexpected error occurred');
         }
     };

    return (
        <div className="flex min-h-screen bg-emerald-500">
            {/* Left section (green background with app info) */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center text-white p-8">
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-bold mb-2">Your Finances</h1>
                    <h2 className="text-4xl font-bold mb-12">in One Place</h2>

                    <div className="mb-12">
                        <img
                            src="/api/placeholder/500/320"
                            alt="BudgetBakers app preview"
                            className="mx-auto"
                        />
                    </div>

                    <p className="mb-4 text-lg">
                        Dive into reports, build budgets, sync with your banks and enjoy automatic categorization.
                    </p>

                    <button className="text-white underline font-medium mb-16">
                        Learn more about how Wallet works
                    </button>

                    <div className="mt-4">
                        <div className="flex items-center justify-center">
                            <div className="bg-white text-emerald-500 p-1 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet">
                                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-bold ml-2">Wallet</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right section (white background with form) */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Wallet account</h2>
                    <p className="text-gray-600 mb-6">Sign up below to create your Wallet account</p>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="mb-4 text-red-500">{error}</div>}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-500 text-white py-3 rounded-full font-medium mb-6"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="text-center mb-6">
                        <p className="text-gray-500">or continue with</p>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button className="p-2 border border-gray-300 rounded-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button className="p-2 border border-gray-300 rounded-full">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#EA4335" />
                                    <path d="M7.545,9.672v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032" fill="#FBBC05" />
                                    <path d="M24,12c0-6.627-5.373-12-12-12S0,5.373,0,12c0,6.627,5.373,12,12,12S24,18.627,24,12z" fill="#4285F4" />
                                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12" fill="#34A853" />
                                </svg>
                            </button>
                            <button className="p-2 border border-gray-300 rounded-full">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                                    <path d="M12.152,4.08c1.326,0,2.442,0.705,3.294,1.626c0.783-0.783,1.548-1.626,2.371-2.371 c-1.469-1.331-3.411-2.158-5.665-2.158C6.837,1.175,2.47,5.461,2.47,11c0,5.538,4.367,9.825,9.682,9.825 c5.392,0,9.682-4.287,9.682-9.825c0-0.705-0.078-1.41-0.234-2.077H12.152V4.08z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-700">
                            Already have account?
                            <Link to='/login' className="text-emerald-500 font-medium hover:underline"> Login</Link>
                            {/* <a href="#" className="text-blue-500">Log In</a> */}
                        </p>
                    </div>

                    <div className="mt-16 text-xs text-gray-500 text-center">
                        <p>
                            By signing up or connecting with the services above you agree to our{' '}
                            <a href="#" className="text-blue-500">Terms of Service</a>{' '}
                            and acknowledge our{' '}
                            <a href="#" className="text-blue-500">Privacy Policy</a>{' '}
                            describing how we handle your personal data.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletSignupPage;