import React from 'react'
import { FaBoxOpen, FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Orders */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 hover:shadow-lg transition">
            <div className="p-4 bg-blue-100 rounded-full">
              <FaShoppingCart className="text-2xl text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-semibold text-gray-800">120</p>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 hover:shadow-lg transition">
            <div className="p-4 bg-green-100 rounded-full">
              <FaUsers className="text-2xl text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl font-semibold text-gray-800">89</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 hover:shadow-lg transition">
            <div className="p-4 bg-yellow-100 rounded-full">
              <FaDollarSign className="text-2xl text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-xl font-semibold text-gray-800">₹34,500</p>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 hover:shadow-lg transition">
            <div className="p-4 bg-purple-100 rounded-full">
              <FaBoxOpen className="text-2xl text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-xl font-semibold text-gray-800">45</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
