import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEdit, FaFile, FaPlus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Color() {
  const colors = [
    { name: "Burnt Amber", code: "N/A", order: "1", status: "Active" },
    { name: "Golden Teak", code: "N/A", order: "2", status: "Active" },
    { name: "Carbon Black", code: "N/A", order: "3", status: "Active" },
    { name: "Faded Oak", code: "N/A", order: "4", status: "Active" },
    { name: "Weathered French Grey", code: "N/A", order: "5", status: "Active" },
    { name: "Faded Ochre", code: "N/A", order: "6", status: "Active" },
    { name: "Weathered Walnut", code: "N/A", order: "7", status: "Active" },
    { name: "Mango Green", code: "N/A", order: "8", status: "Active" },
    { name: "Cobalt Blue", code: "N/A", order: "9", status: "Active" },
    { name: "Black Finish", code: "N/A", order: "10", status: "Active" },
  ];

  const [showEditModal, setShowEditModal] = useState(false);
  const [openAddColor, setOpenAddColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const toggleFilterModal = () => setShowEditModal(!showEditModal);
  const addColor = () => setOpenAddColor(true);
  const closeColorModal = () => setOpenAddColor(false);

  return (
    <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed text-[#76838F]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Color Listing</h2>
           <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> / Admins</span>
          </div>
        </div>
        <div className="space-x-3 flex">
          <button
            onClick={toggleFilterModal}
            className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
          >
            {showEditModal ? (
              <MdOutlineAirplanemodeInactive />
            ) : (
              <IoMdAirplane />
            )}
          </button>
          <button
            onClick={addColor}
            className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showEditModal && (
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="border p-2 rounded cursor-pointer" placeholder="Name" />
            <input className="border p-2 rounded cursor-pointer" placeholder="Email Address" />
            <input className="border p-2 rounded cursor-pointer" placeholder="Mobile Number" />
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Filter Admins
              </button>
              <button className="bg-blue-100 text-blue-500 px-4 py-2 rounded cursor-pointer">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <div className="mb-3 flex justify-between">
          <div className="flex ms-2 mt-2">
            <div>
              <span>Show</span>
              <input
                type="number"
                className="w-[50px] border-2 rounded-[8px] p-1 ms-2 cursor-pointer"
              />
              <span className="ms-2">entries</span>
            </div>
            <div className="ms-4">
              <span>Search:</span>
              <input
                type="text"
                placeholder="Search"
                className="ms-2 border-2 rounded-[8px] p-1 cursor-pointer"
              />
            </div>
          </div>
          <div>
            <ul className="flex gap-6 bg-[#F1F4F5] me-2 mt-2 items-center">
              <li className="px-2 py-1">
                <button className="cursor-pointer"><VscArrowSwap /></button>
              </li>
              <li><button className="cursor-pointer"><MdDeleteForever /></button></li>
              <li><button className="cursor-pointer"><AiFillFileText /></button></li>
              <li><button className="cursor-pointer"><FaFile /></button></li>
            </ul>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Color List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Order</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {colors.map((color, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{color.name}</td>
                    <td className="p-2">{color.code}</td>
                    <td className="p-2">
                      <input
                        className="w-16 border px-2 py-1 text-sm rounded cursor-pointer"
                        value={color.order}
                        readOnly
                      />
                    </td>
                    <td className="p-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded cursor-pointer">
                        {color.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => setSelectedColor(color)}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {selectedColor && (
            <div className="fixed inset-0 bg-transparent bg-opacity-30 flex justify-center items-start pt-20 z-50">
              <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
                <h3 className="text-lg font-semibold mb-4">Update Color</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block">Name</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                      value={selectedColor.name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block">Code</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                      value={selectedColor.code}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block">Order</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                      value={selectedColor.order}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={() => setSelectedColor(null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
                    Update Color
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Modal */}
          {openAddColor && (
            <div className="fixed inset-0 bg-transparent bg-opacity-30 flex justify-center items-start pt-20 z-50">
              <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
                <h3 className="text-lg font-semibold mb-4">Add New Color</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block">Name</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block">Code</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block">Order</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={closeColorModal}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
                    Add Color
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
