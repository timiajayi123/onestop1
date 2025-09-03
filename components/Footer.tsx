'use client';

import { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
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

  // create 75 floating carts
  const carts = Array.from({ length: 75 });

  return (
    <>
      <footer className="relative text-white overflow-hidden">
        {/* Backgrounds + Floating carts (absolute overlays) */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-gray-900 via-indigo-900 to-teal-800"></div>
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="absolute inset-0 pointer-events-none z-10">
          {carts.map((_, i) => {
            const initialX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200);
            const drift = Math.random() * 100 - 50;
            const size = 28 + Math.random() * 20;

            return (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: initialX, y: -50, opacity: 0 }}
                animate={{
                  y: ['-10%', '110%'],
                  x: [initialX, initialX + drift],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <ShoppingCart size={size} className="text-white" />
              </motion.div>
            );
          })}
        </div>

        {/* Actual footer content wrapper (relative to keep height in flow) */}
        <div className="relative z-10">
          {/* Footer main content */}
          <div className="py-12 px-6 md:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              {/* Company */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="hover:underline">About Us</a></li>
                  <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><a href="/#features" className="hover:underline">Features</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Support</h4>
                <ul className="space-y-2">
                  <li><a href="/terms" className="hover:underline">Terms</a></li>
                  <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                  <li><a href="/delivery-policy" className="hover:underline">Delivery Policy</a></li>
                  <li><a href="/refund-policy" className="hover:underline">Refund Policy</a></li>
                </ul>
              </div>

              {/* Connect */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Connect</h4>
                <div className="flex space-x-4 mt-2 text-xl">
                  <a href="#"><FaFacebook /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaLinkedin /></a>
                  <a href="#"><FaInstagram /></a>
                </div>
                <p className="text-xs mt-4 opacity-80">
                  &copy; {new Date().getFullYear()} One Stop Shop. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="mt-10 bg-black/40 p-4 rounded-lg text-sm text-gray-200 text-center leading-relaxed">
            <p>
              Please ensure your business complies with{" "}
              <a href="/delivery-policy" className="text-indigo-300 hover:underline">
                shipping/delivery
              </a>{" "}and{" "}
              <a href="/refund-policy" className="text-indigo-300 hover:underline">
                refund policies
              </a>.
            </p>
          </div>

          {/* Admin trigger */}
          <div
            className="absolute bottom-3 right-4 text-xs text-gray-300 cursor-pointer select-none z-10"
            onClick={() => setShowModal(true)}
          >
            Powered by OSS
          </div>
        </div>
      </footer>

      {/* Admin PIN Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
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
                className="w-full text-center tracking-widest text-xl p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="flex justify-between items-center mt-6 space-x-3">
                <button
                  className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
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

      {/* Gradient + Icon Animation CSS */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientShift 15s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounceSlow 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
