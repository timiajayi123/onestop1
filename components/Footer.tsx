'use client';

import { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePinSubmit = () => {
    const correctPin = '911911'; // 🔐 CHANGE THIS TO YOUR SECURE PIN

    if (pin === correctPin) {
      setShowModal(false);
      router.push('/admin');
    } else {
      setError('Incorrect PIN. Try again.');
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-12 px-6 md:px-20 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-lg mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/careers" className="hover:underline">Careers</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="/features" className="hover:underline">Features</a></li>
              <li><a href="/pricing" className="hover:underline">Pricing</a></li>
              <li><a href="/docs" className="hover:underline">Documentation</a></li>
              <li><a href="/roadmap" className="hover:underline">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="/help" className="hover:underline">Help Center</a></li>
              <li><a href="/faq" className="hover:underline">FAQs</a></li>
              <li><a href="/terms" className="hover:underline">Terms</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Connect</h4>
            <div className="flex space-x-4 mt-2">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
            </div>
            <p className="text-xs mt-4">&copy; {new Date().getFullYear()} OneStop Shop. All rights reserved.</p>
          </div>
        </div>

        {/* 🔒 Hidden Admin Access Trigger */}
        <div
          className="absolute bottom-3 right-4 text-xs text-gray-500 cursor-pointer select-none"
          onClick={() => setShowModal(true)}
        >
Powered by OSS
        </div>
      </footer>

      {/* 🔐 Admin PIN Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Enter Admin PIN
              </h2>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                placeholder="••••••"
                className="w-full text-center tracking-widest text-xl p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="flex justify-between items-center mt-6 space-x-3">
                <button
                  className="w-full py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-semibold"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold"
                  onClick={handlePinSubmit}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
