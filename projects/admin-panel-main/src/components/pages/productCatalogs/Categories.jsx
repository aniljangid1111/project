import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEdit, FaFile, FaPlus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function ProductCategories() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditMode, setIsEditMode] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState();
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();

  const categories = [
    {
      category: "Living",
      mainCategory: "Root Level",
      subCategory: "N/A",
      order: "0",
      status: "Active",
    },
    {
      category: "Living > Mirrors",
      mainCategory: "Living",
      subCategory: "N/A",
      order: "0",
      status: "Active",
    },
    {
      category: "Living > Living Storage",
      mainCategory: "Living",
      subCategory: "N/A",
      order: "0",
      status: "Active",
    },
    {
      category: "Living > Tables",
      mainCategory: "Living",
      subCategory: "N/A",
      order: "0",
      status: "Active",
    },
    {
      category: "Living > Mirrors > Wooden Mirrors",
      mainCategory: "Living",
      subCategory: "Mirrors",
      order: "0",
      status: "Active",
    },
    {
      category: "Living > Living Storage > Tv Units",
      mainCategory: "Living",
      subCategory: "Living Storage",
      order: "0",
      status: "Active",
    },
    {
      category: "Living > Living Storage > Bookshelves",
      mainCategory: "Living",
      subCategory: "Living Storage",
      order: "0",
      status: "Active",
    },
  ];

  const closeCouponEdit = () => {
    setSelectedCoupon(false);
  };

  const openinputModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMember(null);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
    setSelectedCategory(true);
  };

  return (
    <>
      <div className="p-6 min-h-screen bg-gray-100 text-[#76838F]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Categories Listing</h2>
            <div className="flex">
              <Link to={"/dashboard/dashboardhome"}>
                {" "}
                <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
              </Link>{" "}
              <span className="ms-1 "> / Categories</span>
            </div>
          </div>
          <div className="space-x-3 flex">
            <button
              onClick={openinputModal}
              className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
            >
              {showEditModal === true ? (
                <MdOutlineAirplanemodeInactive />
              ) : (
                <IoMdAirplane />
              )}
            </button>
            <button
              onClick={openAddModal}
              className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Filter */}
        <div
          className={
            showEditModal
              ? "bg-white shadow rounded-lg p-4 mb-6"
              : "bg-white shadow rounded-lg p-4 mb-6 hidden"
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="border p-2 rounded cursor-pointer"
              placeholder="Name"
            />
            <input
              className="border p-2 rounded cursor-pointer"
              placeholder="Email Address"
            />
            <input
              className="border p-2 rounded cursor-pointer"
              placeholder="Mobile Number"
            />
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

        {/* Table */}
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <div className="mb-3 flex justify-between">
            <div className="flex ms-2 mt-2">
              <div>
                <span>show</span>
                <input
                  type="number"
                  className="w-[50px] border-2 rounded-[8px] p-1 cursor-pointer"
                />
                <span className="ms-2">entires</span>
              </div>
              <div className="ms-2">
                <span>search:</span>
                <input
                  type="text"
                  placeholder="search"
                  name="name"
                  id=""
                  className="ms-2 border-2 rounded-[8px] p-1 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <ul className="flex gap-6 bg-[#F1F4F5] me-2 mt-2 items-center content-center">
                <li className="px-2 py-1 cursor-pointer">
                  <button>
                    <VscArrowSwap />
                  </button>
                </li>
                <li className="cursor-pointer">
                  <button>
                    <MdDeleteForever />
                  </button>
                </li>
                <li className="cursor-pointer">
                  <button>
                    <AiFillFileText />
                  </button>
                </li>
                <li className="cursor-pointer">
                  <button>
                    <FaFile />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Category Table */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Category List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow text-sm">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-2">Category</th>
                    <th className="p-2">Main Category</th>
                    <th className="p-2">Sub Category</th>
                    <th className="p-2">Order</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">{c.category}</td>
                      <td className="p-2">{c.mainCategory}</td>
                      <td className="p-2">{c.subCategory}</td>
                      <td className="p-2">{c.order}</td>
                      <td className="p-2">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                          {c.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => setSelectedCategory(c)}
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

            {selectedCategory && (
              <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-start pt-20 z-50">
                <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg animate-slideDown relative">
                  <h3 className="text-lg font-semibold mb-4">
                    Update Category
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block">Select Category</label>
                      <select
                        className="w-full border px-3 py-2 rounded mt-1 bg-gray-100 cursor-pointer"
                        disabled
                      >
                        <option>{selectedCategory.mainCategory}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block">Select Sub Category</label>
                      <select
                        className="w-full border px-3 py-2 rounded mt-1 bg-gray-100 cursor-pointer"
                        disabled
                      >
                        <option>{selectedCategory.subCategory}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block">Name</label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                        value={selectedCategory.mainCategory}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block">Order</label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                        value={selectedCategory.order}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
                      Update Category
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
