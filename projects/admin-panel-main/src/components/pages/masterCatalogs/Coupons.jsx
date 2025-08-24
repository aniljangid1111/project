import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEdit, FaFile, FaPlus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import { VscArrowSwap } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Coupons() {
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState();
  const [isEditMode, setIsEditMode] = useState();
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const coupons = [
    {
      name: "FREE40",
      code: "FREE40",
      discount: "40%",
      priceRange: "Rs. 2,000 To Rs. 90,000",
      valid: "01-12-2022 To 31-01-2023",
      order: "0",
      status: "Active",
      startPrice: "2000.00",
      endPrice: "90000.00",
    },
    {
      name: "FREE25",
      code: "FREE25",
      discount: "25%",
      priceRange: "Rs. 500 To Rs. 3,000",
      valid: "01-12-2022 To 31-01-2023",
      order: "0",
      status: "Active",
      startPrice: "500.00",
      endPrice: "3000.00",
    },
    {
      name: "FREE35",
      code: "FREE35",
      discount: "35%",
      priceRange: "Rs. 500 To Rs. 2,000",
      valid: "01-12-2022 To 31-01-2023",
      order: "0",
      status: "Active",
      startPrice: "500.00",
      endPrice: "2000.00",
    },
    {
      name: "FREE50",
      code: "FREE50",
      discount: "50%",
      priceRange: "Rs. 500 To Rs. 1,000",
      valid: "01-12-2022 To 31-01-2023",
      order: "0",
      status: "Active",
      startPrice: "500.00",
      endPrice: "1000.00",
    },
  ];

  const closeCouponEdit = () => setSelectedCoupon(false);
  const closeAddCountiresModal = () => {
    setIsModalOpen(false);
    setShowPopup(false);
  };
  const openinputModal = () => setShowEditModal(!showEditModal);
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
    setShowPopup(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-[#76838F]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Coupons Listing</h2>
          <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> / Coupons</span>
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

      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <div className="mb-3 flex justify-between">
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

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Coupon List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Coupon Code</th>
                  <th className="p-2">Discount</th>
                  <th className="p-2">Price Range</th>
                  <th className="p-2">Valid Between</th>
                  <th className="p-2">Order</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.code}</td>
                    <td className="p-2">{c.discount}</td>
                    <td className="p-2">{c.priceRange}</td>
                    <td className="p-2">{c.valid}</td>
                    <td className="p-2">{c.order}</td>
                    <td className="p-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded cursor-pointer">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => setSelectedCoupon(c)}
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

          {selectedCoupon && (
            <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-start pt-20 z-50">
              <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg animate-slideDown relative">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold mb-4">Edit Coupon</h3>
                  <span className="cursor-pointer" onClick={closeCouponEdit}>
                    <RxCross1 />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={selectedCoupon.name}
                    readOnly
                  />
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={selectedCoupon.code}
                    readOnly
                  />
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value="01-12-2022"
                    readOnly
                  />
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value="31-01-2023"
                    readOnly
                  />
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={selectedCoupon.startPrice}
                    readOnly
                  />
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={selectedCoupon.endPrice}
                    readOnly
                  />
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={selectedCoupon.discount.replace("%", "")}
                    readOnly
                  />
                  <input
                    className="w-full border px-3 py-2 rounded mt-1"
                    value={selectedCoupon.order}
                    readOnly
                  />
                </div>
                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={() => setSelectedCoupon(null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
                    Update Coupon
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-transparent bg-opacity-30 flex justify-center items-start pt-20 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white w-full max-w-4xl mx-auto p-6 rounded-lg shadow-2xl relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Create Coupon</h3>
              <span
                onClick={closeAddCountiresModal}
                className="text-gray-600 hover:text-red-500 cursor-pointer"
              >
                <RxCross1 size={20} />
              </span>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Name"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
              <input
                placeholder="Code"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
              <input
                type="date"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
              <input
                type="date"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
              <input
                placeholder="Start Price"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
              <input
                placeholder="End Price"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
              <input
                placeholder="Discount in (%)"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
              <input
                placeholder="Order"
                className="w-full border px-4 py-2 rounded cursor-pointer"
              />
            </form>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeAddCountiresModal}
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                Add Coupon
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
