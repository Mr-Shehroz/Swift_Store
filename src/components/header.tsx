'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ← Start as false
  const [loading, setLoading] = useState(true); // To avoid flash of wrong state

  // Check login status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/me', { withCredentials: true });
        setIsLoggedIn(!!res.data.user); // Set to true if user exists
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout', { withCredentials: true });
      setIsLoggedIn(false);
      setIsUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Show loading skeleton or nothing while checking auth
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">ShopSwift</div>
            <div className="hidden md:flex space-x-6">
              <div className="w-16 h-8 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <button className="md:hidden text-gray-300">
              <FaBars />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/" className="hover:text-blue-400 transition">
              ShopSwift
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/shop" className="text-gray-300 hover:text-blue-400 transition">
              Shop
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-blue-400 transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg w-64 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Conditional: User is logged in */}
            {isLoggedIn ? (
              <div className="relative">
                {/* User Icon Button */}
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-gray-300 hover:text-blue-400 transition"
                  aria-label="User menu"
                >
                  <FaUser size={20} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaUser className="mr-2" /> My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-red-400 hover:bg-gray-700 transition"
                    >
                      <FaSignOutAlt className="mr-2" /> Sign Out
                    </button>
                  </div>
                )}

                {/* Click outside to close dropdown */}
                {isUserMenuOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  ></div>
                )}
              </div>
            ) : (
              /* ✅ Now this will show when NOT logged in */
              <div className="flex items-center space-x-4">
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  Join Now
                </Link>
              </div>
            )}

            {/* Cart */}
            {isLoggedIn && (
              <Link href="/cart" className="relative">
                <FaShoppingCart
                  size={20}
                  className="text-gray-300 hover:text-blue-400 transition"
                />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-gray-300 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden bg-gray-800 p-4 rounded-lg shadow-lg space-y-3">
            <Link
              href="/"
              className="block text-gray-300 hover:text-blue-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block text-gray-300 hover:text-blue-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block text-gray-300 hover:text-blue-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-300 hover:text-blue-400 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-gray-700 space-y-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className="block text-blue-400 hover:text-blue-300 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-300 hover:text-red-400 flex items-center space-x-2 transition"
                  >
                    <FaSignOutAlt /> <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>

            {isLoggedIn && (
              <div className="pt-2 border-t border-gray-700 mt-2">
                <Link
                  href="/cart"
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 relative transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart /> <span>Cart</span>
                  <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}