import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    const parsedUser = userData ? JSON.parse(userData) : null;

    if (parsedUser && parsedUser._id) {
      // If user exists, go to the questionnaire page
      navigate('/question');
    } else {
      // If not logged in, go to login page
      navigate('/login');
    }
  };

  return (
    <main className="flex-grow">
      {/* Quote Section */}
      <div className="bg-blue-100 text-blue-800 py-6 px-6 shadow-inner">
        <blockquote className="text-center text-xl italic font-serif">
          "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          <footer className="mt-2 text-sm text-blue-600 font-sans">— Malcolm X</footer>
        </blockquote>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Boost Your Skills with Personalized Learning Paths
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto">
            Discover your current skill level and get tailored recommendations to advance your career.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-blue-100 transition duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <h4 className="text-2xl font-semibold mb-4 text-blue-600">1. Register</h4>
              <p className="text-gray-600">Create an account to start your learning journey.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <h4 className="text-2xl font-semibold mb-4 text-blue-600">2. Skill Assessment</h4>
              <p className="text-gray-600">Take a test to determine your current skill level.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <h4 className="text-2xl font-semibold mb-4 text-blue-600">3. Personalized Path</h4>
              <p className="text-gray-600">Receive a customized learning path and course recommendations.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

