'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Brand & Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">ShopSwift</h2>
            <p className="mb-4 text-gray-400 leading-relaxed">
              Your one-stop destination for premium products at unbeatable prices. 
              We deliver quality, style, and speed straight to your door.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link href="/shop" className="hover:text-blue-400 transition">Shop</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="hover:text-blue-400 transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-blue-400 transition">Returns & Exchanges</Link></li>
              <li><Link href="/support" className="hover:text-blue-400 transition">Customer Support</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for exclusive deals.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ShopSwift. All rights reserved.</p>
          <p className="mt-1">
            Made with ❤️ using <span className="text-blue-400">Next.js</span> & <span className="text-blue-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}