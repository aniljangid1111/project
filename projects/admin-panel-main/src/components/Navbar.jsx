import React, { useState } from 'react'
import { FaBars, FaUserCircle, FaSignOutAlt, FaBuilding, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Navbar() {

       const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
   <>
         
   <header className=" Navbar flex justify-between items-center px-4 py-3 bg-white shadow-sm w-full sticky top-0 z-50">
      {/* Left: Menu Icon */}
      <div className="flex items-center gap-4">
        <button className="text-xl text-gray-600 hover:text-black">
          <FaBars />
        </button>
        <h2 className="text-xl font-medium text-gray-700">Welcome! Admin</h2>
      </div>

      {/* Right: Profile */}
      <div className="relative">
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
            Ad
          </div>
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in">
            <ul className="text-gray-700">
              <Link to={'/dashboard/profile'}>
              <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                <FaUser /> Profile
              </li>
              </Link>
              <Link to={'/dashboard/company-profile'}>
              <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                <FaBuilding /> Company Profile
              </li>
              </Link>
              <Link to={'/'}>
              <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer border-t">
                <FaSignOutAlt /> Logout
              </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </header>
   </>
  )
}
