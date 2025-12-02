import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEdit, FaFile, FaPlus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscArrowSwap } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function WhyChooseUs() {
  const [showPopup, setShowPopup] = useState();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState();
  const [isEditMode, setIsEditMode] = useState();
  const [newEmail, setNewEmail] = useState("");
  const [showEditModal, setShowEditModal] = useState();

  const data = [
    {
      id: 1,
      name: "Kathy Young",
      designation: "CEO Of SunPark",
      rating: 5,
      order: 1,
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Kathy Young",
      designation: "CEO Of SunPark",
      rating: 3,
      order: 2,
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 3,
      name: "Kathy Young",
      designation: "CEO Of SunPark",
      rating: 4,
      order: 3,
      status: "Active",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
  ];

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedMember(null);
  };

  const openinputModal = () => {
    setShowEditModal(!showEditModal);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setNewEmail("");
    setIsModalOpen(true);
    setShowPopup(true);
  };

  return (
    <>
      <div className="p-6 min-h-screen bg-gray-100 text-[#76838F]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Why Choose Us Listing</h2>
            <div className="flex">
              <Link to={"/dashboard/dashboardhome"}>
                {" "}
                <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
              </Link>{" "}
              <span className="ms-1 "> / Why Choose Us</span>
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

        {/* filter */}
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
            {/* table input and search */}
            <div className="flex ms-2 mt-2">
              <div>
                <span>show</span>{" "}
                <input
                  type="number"
                  className="w-[50px] border-2 rounded-[8px] p-1 cursor-pointer"
                />
                <span className="ms-2">entries</span>
              </div>
              <div className="ms-2">
                <span>search:</span>
                <input
                  type="text"
                  placeholder="search"
                  name="name"
                  className="ms-2 border-2 rounded-[8px] p-1 cursor-pointer"
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

          <table className="min-w-full text-left text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3">
                  <input type="checkbox" className="cursor-pointer" />
                </th>
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Order</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((member) => (
                <tr key={member.id}>
                  <td className="p-3">
                    <input type="checkbox" className="cursor-pointer" />
                  </td>
                  <td className="p-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover cursor-pointer"
                    />
                  </td>
                  <td className="p-3">{member.name}</td>
                  <td className="p-3">{member.rating}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={member.order}
                      className="w-16 p-1 border rounded cursor-pointer"
                      readOnly
                    />
                  </td>
                  <td className="p-3">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs cursor-pointer">
                      {member.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 cursor-pointer"
                      onClick={() => handleEdit(member)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-start pt-20 z-50">
              <div className="bg-white w-[95%] md:w-[80%] lg:w-[60%] rounded-xl shadow-2xl p-6 md:p-10 relative animate-slideDown">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition cursor-pointer"
                  onClick={closePopup}
                >
                  <RxCross2 size={24} />
                </button>

                <h2 className="text-2xl font-bold text-blue-700 mb-6">
                  Update Testimonial
                </h2>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600">
                        Title
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedMember?.name}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600">
                        Choose Image
                      </label>
                      <input
                        type="file"
                        className="w-full px-3 py-2 border rounded-lg cursor-pointer"
                      />
                      {selectedMember?.image && (
                        <img
                          src={selectedMember.image}
                          alt="preview"
                          className="mt-3 h-24 w-24 object-cover rounded-full border shadow cursor-pointer"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600">
                        Order
                      </label>
                      <input
                        type="number"
                        defaultValue={selectedMember?.order}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        defaultValue={selectedMember?.message}
                        className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </form>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={closePopup}
                    className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition cursor-pointer">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
