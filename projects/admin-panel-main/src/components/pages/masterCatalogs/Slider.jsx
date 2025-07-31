import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEdit, FaFile, FaPlus } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Slider() {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
  ];

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState();
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

  const openinputModal = () => {
    setShowEditModal(!showEditModal);
  };

  const closeSliderModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed text-[#76838F]">
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Slider Listing</h2>
            <div className="flex">
              <Link to={"/dashboard/dashboardhome"}>
                <p className="text-sm text-blue-500 mt-1 cursor-pointer">
                  Dashboard
                </p>
              </Link>
              <span>/ Slider</span>
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
            <Link to={"/dashboard/create-slider"} className="cursor-pointer">
              <button className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
                <FaPlus />
              </button>
            </Link>
          </div>
        </div>

        {/* filters */}
        <div
          className={
            showEditModal
              ? "bg-white shadow rounded-lg p-4 mb-6"
              : "bg-white shadow rounded-lg p-4 mb-6 hidden"
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
            {/* show input */}
            <div className="flex ms-2 mt-2">
              <div>
                <span>show</span>{" "}
                <input
                  type="number"
                  className="w-[50px] border-2 rounded-[8px] p-1"
                />
                <span className="ms-2">entires</span>
              </div>
              <div className="ms-2">
                <span>search:</span>
                <input
                  type="text"
                  placeholder="search"
                  name="name"
                  className="ms-2 border-2 rounded-[8px] p-1"
                />
              </div>
            </div>
            {/* actions */}
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

          {/* table data */}
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
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full cursor-pointer text-sm">
                          Active
                        </span>
                      </td>
                      <td className="p-3">
                        <Link
                          to={"/dashboard/edit-slider"}
                          className="cursor-pointer"
                        >
                          <button className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition m-1 cursor-pointer">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => openModal(country)}
                          className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition cursor-pointer"
                        >
                          <GrGallery />
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
                <div className="w-[60%] bg-white p-5">
                  <div className="flex place-content-between">
                    <p className="mx-3 my-4">view image</p>
                    <span
                      className="mx-3 my-4 cursor-pointer"
                      onClick={closeSliderModal}
                    >
                      <RxCross2 />
                    </span>
                  </div>
                  <div>
                    <img
                      src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/slider/add8f1ce-ae5a-4d6b-b573-8c208b6745d5-1671388062.jpg"
                      alt=""
                    />
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
