import React from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function EditUser() {
  return (
    <div className="p-6 bg-[#f1f4f5] min-h-screen w-full text-[#76838F]">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link to={'/dashboard/dashboardhome'} >  
          {" "}
          <span className="text-blue-500 cursor-pointer">Dashboard</span> /{" "}
        </Link>
        <Link to={'/dashboard/user'}  >
          {" "}
          <span className="text-blue-500 cursor-pointer">Users</span> /{" "}
        </Link>
        <span className="text-gray-800">User Profile</span>
      </div>

      {/* Profile & Info */}
      <div className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-6 mb-6">
        {/* Profile Info Box */}
        <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg relative">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
            alt="Profile Background"
            className="w-full h-64 object-cover"
          />

          {/* Overlay Text */}
          <div className="absolute bottom-0 w-full bg-black/50 text-white p-4 backdrop-blur-sm">
            <p className="text-sm font-semibold">📧 user@example.com</p>
            <p className="text-xs text-gray-300 mt-1">🗓️ Joined: 2023-02-14</p>
          </div>
        </div>

        {/* Billing & Shipping */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Billing Info</h3>
            <div className="text-gray-500 text-sm">[Add billing details]</div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Shipping Info</h3>
            <div className="text-gray-500 text-sm">[Add shipping details]</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="mb-4">
          <h3 className="text-blue-600 border-b-2 border-blue-600 inline-block pb-1 font-semibold">
            Orders
          </h3>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-sm">
            <label>Show</label>
            <select className="border rounded px-2 py-1">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <label>entries</label>
            <div className="ml-4">
              <label className="mr-1">Search:</label>
              <input
                type="text"
                className="border rounded px-2 py-1"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-100 p-2 rounded">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16l-4-4m0 0l4-4m-4 4h16"
                />
              </svg>
            </button>
            <button className="bg-gray-100 p-2 rounded">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8l4 4-4 4m16-8l-4 4 4 4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Order Info</th>
                <th className="px-4 py-2">User Info</th>
                <th className="px-4 py-2">Price Info</th>
                <th className="px-4 py-2">Order Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 text-sm text-gray-600">
            Showing 0 to 0 of 0 entries
          </div>
        </div>
      </div>
    </div>
  );
}
