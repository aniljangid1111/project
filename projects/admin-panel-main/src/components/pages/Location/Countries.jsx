import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaFile, FaPlus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { VscArrowSwap } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
];

export default function Countries() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "",
    order: 0,
  });

  const openModal = (country) => {
    setSelectedCountry({ name: country, order: 0 });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openinputModal = () => {
    setShowEditModal(!showEditModal);
  };

  const closeAddCountiresModal = () => {
    setIsModalOpen();
  };

  return (
    <>
      <div className="p-6 bg-[#F1F4F5] min-h-screen  min-w-[82%] fixed text-[#76838F]">
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Countries  Listing</h2>
            <div className="flex">
              <Link to={"/dashboard/dashboardhome"}>
                <p className="text-sm text-blue-500 mt-1 cursor-pointer">Dashboard </p>
              </Link>
              <span> / Countries</span>
            </div>
          </div>
          <div className="space-x-3 flex ">
            <button
              onClick={openinputModal}
              className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer "
            >
              {showEditModal === true ? (
                <MdOutlineAirplanemodeInactive />
              ) : (
                <IoMdAirplane />
              )}
            </button>
            <button
              onClick={openAddModal}
              className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer "
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* filters */}
        <div
          className={
            showEditModal
              ? "bg-white shadow rounded-lg p-4 mb-6 "
              : "bg-white shadow rounded-lg p-4 mb-6 hidden "
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="border p-2 rounded" placeholder="Name" />
            <input className="border p-2 rounded" placeholder="Email Address" />
            <input className="border p-2 rounded" placeholder="Mobile Number" />
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

        {/* table */}
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <div className="mb-3 flex justify-between">
            <div className="flex ms-2 mt-2 ">
              <div>
                <span>show</span>
                <input
                  type="number"
                  className="w-[50px] border-2 rounded-[8px] p-1 "
                />
                <span className="ms-2">entires</span>
              </div>
              <div className="ms-2  ">
                <span>search:</span>
                <input
                  type="text"
                  placeholder="serarch"
                  name="name"
                  className="ms-2 border-2 rounded-[8px] p-1"
                />
              </div>
            </div>
            <div>
              <ul className="flex gap-6 bg-[#F1F4F5] me-2 mt-2 items-center content-center ">
                <li className="px-2 py-1">
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
          </div>
          <div className="p-6">
            <div className="overflow-x-auto shadow rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-3 text-left">
                      <input type="checkbox" className="cursor-pointer" />
                    </th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Order</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {countries.map((country, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3">
                        <input type="checkbox" className="cursor-pointer" />
                      </td>
                      <td className="p-3">{country}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border rounded"
                          value={0}
                          readOnly
                        />
                      </td>
                      <td className="p-3">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                          Active
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => openModal(country)}
                          className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition cursor-pointer"
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Popup Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-transparent flex items-start justify-center z-50 pt-10">
                <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md animate-slide-down">
                  <h2 className="text-lg font-bold mb-4">Edit Country</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        value={selectedCountry.name}
                        className="w-full px-3 py-2 border rounded mt-1"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Order</label>
                      <input
                        type="number"
                        value={selectedCountry.order}
                        className="w-full px-3 py-2 border rounded mt-1"
                        readOnly
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={closeModal}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* top added countries  modal  */}
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
              <h3 className="text-xl font-bold mb-4 flex place-content-between">
                {isEditMode ? "Edit Admin" : "Add New Admin"}
                <span onClick={closeAddCountiresModal} className="cursor-pointer">
                  <RxCross1 />
                </span>
              </h3>
              <div className="">
                <div className="">
                  <span>Name:</span>
                  <input
                    type="email"
                    placeholder="Enter admin email"
                    className="w-full border px-4 py-2 mb-4 rounded"
                  />
                </div>
                <div className="">
                  <span>Email:</span>
                  <input
                    type="email"
                    placeholder="Enter admin email"
                    className="w-full border px-4 py-2 mb-4 rounded"
                  />
                </div>
                <div className="">
                  <span>Email:</span>
                  <input
                    type="number"
                    placeholder="Enter admin email"
                    className="w-full border px-4 py-2 mb-4 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}
