import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-700">
      <div className="text-sm text-blue-500 mb-2">Dashboard / Profile</div>
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-lg">Admin</h3>
          <p className="text-gray-400 mb-4">Admin</p>
          <div className="text-left border-t pt-4 mt-4">
            <p className="text-sm font-semibold mb-2">Contact Information</p>
            <p className="flex items-center gap-2 text-sm mb-1">
              📱 1234567890
            </p>
            <p className="flex items-center gap-2 text-sm">
              ✉️ info@gmail.com
            </p>
          </div>
        </div>

        {/* Right Form with Tab Switching */}
        <div className="lg:col-span-2 bg-white rounded shadow p-6">
          {/* Tabs */}
          <div className="flex space-x-6 border-b mb-4 pb-2">
            <span
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer pb-1 font-medium ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-400"
              }`}
            >
              Edit Profile
            </span>
            <span
              onClick={() => setActiveTab("password")}
              className={`cursor-pointer pb-1 font-medium ${
                activeTab === "password"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-400"
              }`}
            >
              Change Password
            </span>
          </div>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Profile Form */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Choose Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-600 file:text-white file:cursor-pointer"
                  />
                  <img
                    src="https://via.placeholder.com/300x150"
                    alt="Preview"
                    className="mt-4 max-h-40 border rounded"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value="Admin"
                      className="w-full border px-4 py-2 rounded"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value="info@gmail.com"
                      className="w-full border px-4 py-2 rounded bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value="1234567890"
                      className="w-full border px-4 py-2 rounded"
                      readOnly
                    />
                  </div>
                </div>

                <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
                  Update Profile
                </button>
              </motion.div>
            )}

            {activeTab === "password" && (
              <motion.div
                key="password"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Change Password Form */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>

                <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
                  Update Password
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
