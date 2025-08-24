import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEdit, FaFile, FaPlus } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Materials() {
  const matarial = [
    "wood almond",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
  ];

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState();
  const [materialAdded, setMaterialAdded] = useState();
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
    setMaterialAdded(true);
  };

  const openinputModal = () => {
    setShowEditModal(!showEditModal);
  };

  const closeEditPop = () => {
    setShowModal(false);
  };

  const closeMaterialPop = () => {
    setMaterialAdded(false);
  };

  return (
    <>
      <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed text-[#76838F]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Materials Listing</h2>
              <div className="flex">
                        <Link to={"/dashboard/dashboardhome"}>
                          {" "}
                          <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
                        </Link>{" "}
                        <span className="ms-1 "> / Materials</span>
                      </div>
          </div>
          <div className="space-x-3 flex">
            <button
              onClick={openinputModal}
              className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
            >
              {showEditModal ? (
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

        {/* Filters */}
        <div
          className={`bg-white shadow rounded-lg p-4 mb-6 ${
            showEditModal ? "" : "hidden"
          }`}
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
            {/* Show entries and search */}
            <div className="flex ms-2 mt-2">
              <div>
                <span>show</span>{" "}
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
                  className="ms-2 border-2 rounded-[8px] p-1 cursor-pointer"
                />
              </div>
            </div>

            {/* Icons */}
            <div>
              <ul className="flex gap-6 bg-[#F1F4F5] me-2 mt-2 items-center content-center">
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

          {/* Table Data */}
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
                  {matarial.map((country, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3">
                        <input type="checkbox" className="cursor-pointer" />
                      </td>
                      <td className="p-3">{country}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border rounded cursor-pointer"
                          value={0}
                          readOnly
                        />
                      </td>
                      <td className="p-3">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full cursor-pointer text-sm">
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

            {/* Edit Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-transparent flex items-start justify-center z-50 pt-10">
                <div className="w-[40%] bg-white p-5">
                  <div className="flex place-content-between">
                    <h2 className="text-lg font-bold mb-4 mt-3">
                      Edit Country
                    </h2>
                    <span
                      onClick={closeEditPop}
                      className="text-lg font-bold mb-4 mt-3 cursor-pointer"
                    >
                      <RxCross2 />
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        value={selectedCountry.name}
                        className="w-full px-3 py-2 border rounded mt-1 cursor-pointer"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Order</label>
                      <input
                        type="number"
                        value={selectedCountry.order}
                        className="w-full px-3 py-2 border rounded mt-1 cursor-pointer"
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

            {/* Material Add Modal */}
            {materialAdded && (
              <div className="fixed inset-0 bg-transparent flex items-start justify-center z-50 pt-10">
                <div className="w-[40%] bg-white p-5">
                  <div className="flex place-content-between">
                    <h2 className="text-lg font-bold mb-4 mt-3">
                      Edit Country
                    </h2>
                    <span
                      onClick={closeMaterialPop}
                      className="text-lg font-bold mb-4 mt-3 cursor-pointer"
                    >
                      <RxCross2 />
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        value={selectedCountry.name}
                        className="w-full px-3 py-2 border rounded mt-1 cursor-pointer"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Order</label>
                      <input
                        type="number"
                        value={selectedCountry.order}
                        className="w-full px-3 py-2 border rounded mt-1 cursor-pointer"
                        readOnly
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={closeMaterialPop}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                      >
                        Close
                      </button>
                      <button className="bg-[#2B7FFF] text-white px-4 py-2 rounded hover:bg-[#155DFC] transition cursor-pointer">
                        Add
                      </button>
                    </div>
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
