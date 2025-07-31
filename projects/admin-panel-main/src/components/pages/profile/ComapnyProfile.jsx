import React from "react";
import { motion } from "framer-motion";

export default function StaticCompanyProfile() {
  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6 mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-medium text-gray-700 mb-2">Choose Logo</p>
          <div className="border rounded-md p-4 h-[160px] flex items-center justify-center bg-gray-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Monsta_Logo.svg/512px-Monsta_Logo.svg.png"
              alt="Company Logo"
              className="h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          className="grid grid-cols-1 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <p className="text-sm font-medium text-gray-700">Name</p>
            <div className="w-full border p-2 rounded mt-1 text-gray-800 bg-gray-50">
              Furniture
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Email</p>
            <div className="w-full border p-2 rounded mt-1 text-gray-800 bg-gray-50">
              furnitureinfo@gmail.com
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Mobile Number</p>
            <div className="w-full border p-2 rounded mt-1 text-gray-800 bg-gray-50">
              98745612330
            </div>
          </div>
        </motion.div>
      </div>

      {/* Address + Map */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>
          <p className="text-sm font-medium text-gray-700">Address</p>
          <div className="w-full border p-3 rounded mt-1 text-gray-800 bg-gray-50 min-h-[96px]">
            Claritas est etiam processus dynamicus
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Google Map URL</p>
          <div className="w-full border p-3 rounded mt-1 text-sm text-gray-800 bg-gray-50 min-h-[96px] break-words">
            https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.631421124823!2d73.0283626508787!3d26.27362318332549...
          </div>
        </div>
      </motion.div>

      {/* Embedded Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.631421124823!2d73.0283626508787!3d26.27362318332549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1ea7d0c7%3A0xf14d81eb1531921c!2sLaxmi%20Kirana%20Store!5e0!3m2!1sen!2sin!4v1580291833220!5m2!1sen!2sin"
          className="w-full h-64 border rounded-lg"
          allowFullScreen=""
          loading="lazy"
          title="Company Location"
        ></iframe>
      </motion.div>
    </motion.div>
  );
}
