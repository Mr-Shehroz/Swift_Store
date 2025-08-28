'use client';

import Link from 'next/link';
import { FaArrowRight, FaStar } from 'react-icons/fa';

export default function HomePage() {
  // Mock trending products
  const trendingProducts = [
    { id: 1, name: 'Wireless Earbuds', price: 89.99, image: '/images/earbuds.jpg', rating: 4.8 },
    { id: 2, name: 'Smart Watch', price: 149.99, image: '/images/watch.jpg', rating: 4.6 },
    { id: 3, name: 'Bluetooth Speaker', price: 59.99, image: '/images/speaker.jpg', rating: 4.7 },
    { id: 4, name: 'Fitness Tracker', price: 79.99, image: '/images/fitness.jpg', rating: 4.5 },
  ];

  // Mock categories
  const categories = [
    { name: 'Electronics', image: '/images/electronics.jpg' },
    { name: 'Fashion', image: '/images/fashion.jpg' },
    { name: 'Home & Kitchen', image: '/images/home.jpg' },
    { name: 'Sports', image: '/images/sports.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Upgrade Your Lifestyle
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Discover premium products at unbeatable prices. Fast shipping, easy returns.
            </p>
            <Link href="/shop">
              <button className="mt-6 bg-white text-blue-900 hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto md:mx-0 transition">
                <span>Shop Now</span>
                <FaArrowRight />
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl">🛍️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href="/shop"
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cat.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold group-hover:scale-105 transition">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition group"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {/* Replace with actual image or Image component */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <FaStar className="text-yellow-400" size={16} />
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{product.rating}</span>
                  </div>
                  <p className="mt-2 font-bold text-blue-600 dark:text-blue-400">${product.price}</p>
                  <Link href={`/product/${product.id}`}>
                    <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop">
              <span className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Browse All Products →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Flash Sale! Up to 50% Off</h2>
          <p className="mt-4 text-lg opacity-90">Limited time offer. Shop now before it’s gone!</p>
          <Link href="/sale">
            <button className="mt-6 bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition">
              Shop Sale
            </button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Join Our Newsletter</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Be the first to hear about new arrivals, exclusive deals, and more.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="px-5 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}