import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user and cached data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const cachedRecommendations = localStorage.getItem('recommendations');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (cachedRecommendations) setRecommendationData(JSON.parse(cachedRecommendations));
  }, []);

  const fetchRecommendations = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post('http://localhost:8000/aifeature', {
        username: user.username,
      });

      setRecommendationData(response.data);
      localStorage.setItem('recommendations', JSON.stringify(response.data)); // cache it
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecommendations = () => {
    localStorage.removeItem('recommendations');
    setRecommendationData(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">No user data available. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* --- USER INFO --- */}
        <div className="flex items-center mb-8">
          <img
            src={user.profilePic || '/default-profile.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-extrabold text-gray-800">{user.username}</h1>
            <p className="text-md text-gray-600 mt-1">{user.email}</p>
            <p className="text-gray-500 mt-2">User ID: {user._id}</p>
          </div>
        </div>

        {/* --- BUTTON CONTROLS --- */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={fetchRecommendations}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md text-white font-semibold transition ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? 'Fetching...' : 'Give Me Recommendation'}
          </button>

          {recommendationData && (
            <button
              onClick={clearRecommendations}
              className="px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Clear Recommendation
            </button>
          )}
        </div>

        {/* --- RECOMMENDATION RESULTS --- */}
        {error && (
          <div className="text-center text-red-500 mb-6 text-lg">{error}</div>
        )}

        {recommendationData ? (
          <>
            {/* Recommended Courses */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recommended Courses
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {recommendationData.recommendations.map((course, index) => (
                  <div key={index} className="bg-gray-50 border rounded-lg shadow p-6 hover:shadow-md transition">
                    <h4 className="text-lg font-bold text-gray-900">{course.courseName}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {course.platform} • {course.difficulty} • {course.duration}
                    </p>
                    <p className="text-gray-700 mt-3">{course.description}</p>
                    <p className="text-indigo-600 text-sm font-medium mt-3">
                      Relevance: {course.relevance}
                    </p>
                    <div className="mt-2">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                        {course.skillsGained.join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Path Suggestion */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Suggested Learning Path</h3>
              <p className="text-gray-700">{recommendationData.learningPathSuggestion}</p>
            </div>

            {/* Additional Resources */}
            <div className="bg-gray-50 rounded-lg shadow p-6 mb-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Additional Resources</h3>
              <ul className="list-disc list-inside text-gray-700">
                {recommendationData.additionalResources.map((resource, i) => (
                  <li key={i}>{resource}</li>
                ))}
              </ul>
            </div>

            {/* Career Insight */}
            <div className="bg-gray-50 rounded-lg shadow p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Career Insight</h3>
              <p className="text-gray-700">{recommendationData.careerInsight}</p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Click “Give Me Recommendation” to generate personalized suggestions.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

