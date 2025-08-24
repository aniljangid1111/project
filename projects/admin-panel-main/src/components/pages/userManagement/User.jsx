import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEye, FaFile, FaPlus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { VscArrowSwap } from "react-icons/vsc";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function User() {
  const [showFilter, setShowFilter] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [admins, setAdmins] = useState([
    {
      name: "N/A",
      email: "vinodulondhe@gmail.com",
      mobile: "N/A",
      status: "Active",
    },
    {
      name: "N/A",
      email: "nishant.sanghani133351@marwadiuniversity.ac.in",
      mobile: "N/A",
      status: "Active",
    },
    {
      name: "N/A",
      email: "gk5895201@gmail.com",
      mobile: "N/A",
      status: "Active",
    },
    {
      name: "N/A",
      email: "sunilmahaseth000@gmail.com",
      mobile: "N/A",
      status: "Active",
    },
  ]);

  const openAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full text-[#76838F]">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Users Listing</h2>
          <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              <p className="text-blue-500 text-sm">Dashboard </p>{" "}
            </Link>
            <span> / Users</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center hover:bg-blue-600 cursor-pointer"
          >
            {showFilter ? <MdOutlineAirplanemodeInactive /> : <IoMdAirplane />}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilter && (
        <div className="bg-white rounded shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="border p-2 rounded" placeholder="Name" />
            <input className="border p-2 rounded" placeholder="Email" />
            <input className="border p-2 rounded" placeholder="Mobile Number" />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Filter
              </button>
              <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded cursor-pointer">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {/* Top Controls */}
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <input
              type="number"
              className="w-16 border rounded px-2 py-1"
              defaultValue={10}
            />
            <span>entries</span>
            <div className="ml-4 flex items-center gap-1">
              <span>Search:</span>
              <input
                type="text"
                placeholder="Search"
                className="border rounded px-2 py-1"
              />
            </div>
          </div>
          <ul className="flex gap-4">
            <li>
              <button className="cursor-pointer">
                <VscArrowSwap />
              </button>
            </li>
            <li>
              <button className="cursor-pointer">
                <MdDeleteForever />
              </button>
            </li>
            <li>
              <button className="cursor-pointer">
                <AiFillFileText />
              </button>
            </li>
            <li>
              <button className="cursor-pointer">
                <FaFile />
              </button>
            </li>
          </ul>
        </div>

        {/* Table */}
        <table className="min-w-full text-sm text-left border-t">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" className="cursor-pointer"/>
              </th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email ID</th>
              <th className="px-4 py-2">Mobile Number</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">{admin.mobile}</td>
                <td className="px-4 py-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs cursor-pointer">
                    {admin.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link to={"/dashboard/edit-user"}>
                    <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                      <FaEye size={"18px"} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-sm ">
          Showing 1 to {admins.length} of {admins.length} entries
        </div>
      </div>

      {/* Modal */}
    </div>
  );
}
