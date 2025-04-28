import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('english');
  const [scrolled, setScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Demo', path: '/demo' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
    { name: 'Try Bot', path: 'https://t.me/LocalSathiBot', external: true },
  ];

  const languages = [
    { code: 'english', name: 'English', flag: '/images/en-flag.png' },
    { code: 'hindi', name: 'हिंदी', flag: '/images/in-flag.png' },
    { code: 'nepali', name: 'मराठी', flag: '/images/np-flag.png' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-light shadow-md py-2' : 'bg-cream py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-10 w-auto transition-all duration-300"
                src="/images/logo.webp"
                alt="Local Sathi"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-dark hover:text-pink hover:border-b-2 hover:border-pink"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-pink font-semibold border-b-2 border-pink'
                        : 'text-dark hover:text-pink hover:border-b-2 hover:border-pink'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <div className="relative">
                <button 
                  type="button"
                  className="flex items-center text-dark px-3 py-1 rounded-md text-sm font-medium hover:bg-teal hover:bg-opacity-20 focus:outline-none border border-gray-200 shadow-sm"
                  onClick={() => setLanguage(language === 'english' ? 'hindi' : language === 'hindi' ? 'nepali' : 'english')}
                >
                  <img 
                    src={languages.find(lang => lang.code === language)?.flag}
                    alt={language}
                    className="w-5 h-5 mr-2"
                  />
                  <span>{languages.find(lang => lang.code === language)?.name}</span>
                </button>
              </div>
              
              {userInfo ? (
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-2 bg-pink bg-opacity-10 hover:bg-opacity-20 text-pink font-medium rounded-md text-sm px-4 py-2 transition-colors duration-200"
                  >
                    <FaUser />
                    <span>{userInfo.name || 'User'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
                    <div className="py-1">
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-dark hover:bg-pink hover:bg-opacity-10 hover:text-pink"
                      >
                        Dashboard
                      </Link>
                      {userInfo.email === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="block px-4 py-2 text-sm text-dark hover:bg-pink hover:bg-opacity-10 hover:text-pink"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-pink hover:bg-opacity-10 hover:text-pink"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/login"
                    className="text-pink hover:text-pink-700 font-medium text-sm transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup"
                    className="bg-pink hover:bg-opacity-90 text-white font-medium rounded-md text-sm px-4 py-2 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-pink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
            {navLinks.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-pink hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-pink font-semibold bg-pink bg-opacity-10'
                      : 'text-dark hover:text-pink hover:bg-gray-50'
                  }`}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {userInfo ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-pink hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                {userInfo.email === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-pink hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark hover:text-pink hover:bg-gray-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="mt-3 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-center text-pink border border-pink"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-center bg-pink text-white"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            <div className="mt-4 flex items-center px-3 py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`flex items-center mr-4 ${
                    language === lang.code ? 'font-semibold bg-pink bg-opacity-10 p-1 rounded' : ''
                  }`}
                  onClick={() => {
                    setLanguage(lang.code);
                    toggleMenu();
                  }}
                >
                  <img src={lang.flag} alt={lang.name} className="w-5 h-5 mr-1" />
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 