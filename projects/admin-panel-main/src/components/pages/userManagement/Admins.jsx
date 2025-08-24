import React, { useState } from "react";
import { FaPlus, FaEdit, FaFile } from "react-icons/fa";
import { motion } from "framer-motion";
import { VscArrowSwap } from "react-icons/vsc";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import { IoMdAirplane } from "react-icons/io";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

export default function Admins() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState();
  const [showmodal, setShowModal] = useState();

  const [admins, setAdmins] = useState([
    {
      name: "Abc",
      email: "tyc@gmail.com",
      mobile: "89563214785",
      status: "Active",
    },
    {
      name: "Hello",
      email: "abc@gmail.com",
      mobile: "3698752698",
      status: "Active",
    },
    {
      name: "Hello",
      email: "Hello@gmail.com",
      mobile: "9789645357",
      status: "Active",
    },
  ]);

  const openAddModal = () => {
    setIsEditMode();
    setNewEmail("");
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    setIsEditMode(true);
    setNewEmail(admins[index].email);
    setIsModalOpen(true);
  };

  const openinputModal = () => {
    setShowModal(!showmodal);
  };
  const closeAddCountiresModal = () =>{
    setIsModalOpen()
  };

  return (
    <div className="p-6 bg-[#F1F4F5] min-h-screen  min-w-[82%] fixed text-[#76838F]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Admins Listing</h2>
          <div className="flex">
          <Link to={'/dashboard/dashboardhome'} >  <p className="text-sm text-blue-500 mt-1">Dashboard </p> </Link>  <span className="ms-1 text-[#76838F] " > / Admins</span>
          </div>
          
        </div>
        <div className="space-x-3 flex ">
          <button
            onClick={openinputModal}
            className="w-10 h-10 cursor-pointer bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
          >
            {showmodal == true ? (
              <MdOutlineAirplanemodeInactive />
            ) : (
              <IoMdAirplane />
            )}
          </button>
          <button
            onClick={openAddModal}
            className="w-10 h-10 bg-blue-500 text-white cursor-pointer rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div
        className={
          showmodal
            ? "bg-white shadow rounded-lg p-4 mb-6 "
            : "bg-white shadow rounded-lg p-4 mb-6 hidden "
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border p-2 rounded cursor-pointer "
            placeholder="Name"
          />
          <input
            className="border p-2 rounded cursor-pointer "
            placeholder="Email Address"
          />
          <input
            className="border p-2 rounded cursor-pointer "
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
      <div className="overflow-x-auto shadow rounded-lg bg-white text-[#76838F]">
        <div className="mb-3 flex justify-between">
          {/* show input */}
          <div className="flex ms-2 mt-2  ">
            {" "}
            <div>
              <span>show</span>{" "}
              <input
                type="number"
                className="w-[50px] border-2 rounded-[8px] p-1 "
              />
              <span className="ms-2 ">entires</span>
            </div>
            <div className="ms-2  ">
              <span>search:</span>
              <input
                type="text"
                placeholder="serarch"
                name="name"
                id=""
                className="ms-2 border-2 rounded-[8px] p-1"
              />
            </div>
          </div>
          {/* changes button */}
          <div>
            <ul className="flex gap-6 bg-[#F1F4F5] me-2 mt-2 items-center content-center  ">
              <li className="px-2 py-1  ">
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
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 ">
                <input type="checkbox" className="cursor-pointer" />
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
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-4 py-2 ">{admin.name}</td>
                <td className="px-4 py-2 ">{admin.email}</td>
                <td className="px-4 py-2 ">{admin.mobile}</td>
                <td className="px-4 py-2 ">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs cursor-pointer">
                    {admin.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openEditModal(index)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-sm text-[#76838F]">
          Showing 1 to {admins.length} of {admins.length} entries
        </div>
      </div>

      {/* Top Modal */}
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
            <h3 className="text-xl font-bold mb-4 flex place-content-between ">
              {isEditMode ? "Edit Admin" : "Add New Admin"}
              <span onClick={() => closeAddCountiresModal()} className="cursor-pointer"> <RxCross1/></span> 
            </h3>
            {/*  edit modal inputs */}
            <div className="">
              {/* name edit input */}
              <div className="">
                <span>Name:</span>
                <input
                  type="email"
                  placeholder="Enter admin email"
                  className="w-full border px-4 py-2 mb-4 rounded"
                />
              </div>
              {/* email edit name */}
              <div className="">
                <span>Email:</span>
                <input
                  type="email"
                  placeholder="Enter admin email"
                  className="w-full border px-4 py-2 mb-4 rounded"
                />
              </div>
              {/* mobile number */}
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
  );
}
