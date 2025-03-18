import React from 'react';

const BudgetBakersHomepage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <img src="/api/placeholder/200/50" alt="BudgetBakers Logo" className="h-8" />
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>How it works</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>Resources</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="cursor-pointer">Support</span>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md cursor-pointer">For Business</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-green-500 border border-green-500 rounded-full hover:bg-green-50">Log In</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="flex items-center mb-6">
              <div className="bg-green-400 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="text-2xl font-bold">
                Wallet
                <div className="text-sm font-normal text-gray-500">by budgetbakers</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Your Finances<br />in One Place</h1>
            <div className="flex space-x-4">
              <img src="assets/google-play.png" alt="Google Play" className="h-12" />
              <img src="assets/app-store.png" alt="App Store" className="h-12" />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img src="/assets/home-hero.png" alt="Wallet App Screenshot" className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold mb-4">6.5 M</h2>
              <div className="flex items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span>Downloads</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold mb-4">4.7</h2>
              <div className="flex items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 5z" />
                </svg>
                <span>Rating</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold mb-4">20+</h2>
              <div className="flex items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>Languages</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-4xl font-bold mb-4">15 K</h2>
              <div className="flex items-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Banks Connect</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BudgetBakersHomepage;