import React, { useState } from "react";
import { FaPlus, FaEdit, FaFile } from "react-icons/fa";
import { motion } from "framer-motion";
import { VscArrowSwap } from "react-icons/vsc";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import { IoMdAirplane } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NewsLetter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showmodal, setShowModal] = useState();

  const openAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openinputModal = () => {
    setShowModal(!showmodal);
  };

  return (
    <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed text-[#76838F]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Contact Enquiry Management</h2>
          <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> / Contact Enquiry</span>
          </div>
        </div>
        <div className="space-x-3 flex">
          <button
            onClick={openinputModal}
            className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
          >
            {showmodal ? <MdOutlineAirplanemodeInactive /> : <IoMdAirplane />}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        className={showmodal ? "bg-white shadow rounded-lg p-4 mb-6" : "hidden"}
      >
        <h2 className="text-lg font-semibold mb-4">FILTERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input type="date" className="border rounded px-3 py-2 col-span-2" />
          <select className="border rounded px-3 py-2">
            <option>Select Status</option>
          </select>
          <input
            type="text"
            placeholder="Name"
            className="border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
            Filter Enquiries
          </button>
          <button className="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300 cursor-pointer">
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <div className="mb-3 flex justify-between">
          {/* Show and Search */}
          <div className="flex ms-2 mt-2 gap-4">
            <div>
              <span>Show </span>
              <input type="number" className="w-[50px] border-2 rounded px-1" />
              <span className="ms-2">entries</span>
            </div>
            <div>
              <span>Search: </span>
              <input
                type="text"
                placeholder="search"
                className="ms-2 border-2 rounded px-1"
              />
            </div>
          </div>
          {/* Table Actions */}
          <ul className="flex gap-4 me-4 mt-2 items-center">
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

        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-2">User Info</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">
                <input type="checkbox" />
              </td>
              <td className="p-3">
                <p>
                  <strong>Name :</strong> sandeep
                </p>
                <p>
                  <strong>Email :</strong> sandeep@gmail.com
                </p>
                <p>
                  <strong>Number :</strong> ee5453453
                </p>
                <p>
                  <strong>Date :</strong> 6th June 2025 05:29 PM
                </p>
              </td>
              <td className="p-3">
                Address: Claritas est etiam processus dynamicus
              </td>
              <td className="p-3">
                Address: Claritas est etiam processus dynamicus
              </td>
              <td className="p-3">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">
                <input type="checkbox" />
              </td>
              <td className="p-3">
                <p>
                  <strong>Name :</strong> sandeep
                </p>
                <p>
                  <strong>Email :</strong> sandeep@gmail.com
                </p>
                <p>
                  <strong>Number :</strong> 3432432432
                </p>
                <p>
                  <strong>Date :</strong> 4th June 2025 07:27 PM
                </p>
              </td>
              <td className="p-3">Testing</td>
              <td className="p-3">Testing</td>
              <td className="p-3">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Completed
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-4 text-sm text-gray-600">
          Showing 1 to 2 of 2 entries
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Admin" : "Add New Admin"}
            </h3>
            <div>
              <label>Name:</label>
              <input
                type="text"
                className="w-full border px-4 py-2 mb-4 rounded"
              />
              <label>Email:</label>
              <input
                type="email"
                className="w-full border px-4 py-2 mb-4 rounded"
              />
              <label>Mobile:</label>
              <input
                type="text"
                className="w-full border px-4 py-2 mb-4 rounded"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
