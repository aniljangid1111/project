import React from 'react'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);

  const pageVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showLogin ? (
            <motion.div
              key="login"
              variants={pageVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
                Admin Login
              </h2>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Link to={'/dashboard/dashboardhome'} >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                  Login
                </motion.button>
                    </Link>
              </form>
              <div className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setShowLogin(false)}
                >
                  Register
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              variants={pageVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
                Admin Register
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Admin Name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Register
                </motion.button>
              </form>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
