import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('user');
      setIsLoggedIn(!!storedUser);
    };

    // Run initially
    checkLoginStatus();

    // Listen for custom events (login/logout)
    window.addEventListener('userLoginStatusChanged', checkLoginStatus);
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('userLoginStatusChanged', checkLoginStatus);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("userLoginStatusChanged"));
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">SkillPathFinder</h1>
        <nav>
          <ul className="flex space-x-6">

            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/" className="hover:text-blue-200 transition duration-300 font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/userDashboard')}
                    className="hover:text-blue-200 transition duration-300 font-medium"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/profile')}
                    className="hover:text-blue-200 transition duration-300 font-medium"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-200 transition duration-300 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition duration-300 font-medium"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

