import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = 'http://localhost:8000/api/auth/signup';
      const payload = { username, email, password };

      const response = await axios.post(endpoint, payload);

      console.log(response.data);
      console.log("UserSign")

      // Store the token in localStorage
      localStorage.setItem('userToken', response.data.token);

      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
