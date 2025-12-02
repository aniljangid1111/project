import React, { useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaEdit, FaFile, FaPlus } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdDeleteForever, MdOutlineAirplanemodeInactive } from "react-icons/md";
import { VscArrowSwap } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Product() {
  const initialProducts = [
    {
      name: "Hrithvik Stool",
      code: "jod3333",
      type: "New Arrivals",
      bestSelling: "Yes",
      topRated: "Yes",
      trending: "Yes",
      order: 0,
      status: "Active",
    },
    {
      name: "Caroline Study Tables",
      code: "jodST0011",
      type: "Featured",
      bestSelling: "Yes",
      topRated: "Yes",
      trending: "Yes",
      order: 0,
      status: "Active",
    },
    {
      name: "Rex Console Table",
      code: "jod00136",
      type: "Onsale",
      bestSelling: "Yes",
      topRated: "Yes",
      trending: "Yes",
      order: 0,
      status: "Active",
    },
  ];

  const [showEditModal, setShowEditModal] = useState(false);
  const [openAddColor, setOpenAddColor] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", code: "" });

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setEditData({ name: "", code: "" });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = [...products];
    updated[editIndex] = { ...updated[editIndex], ...editData };
    setProducts(updated);
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const openinputModal = () => {
    setShowEditModal(!showEditModal);
  };

  const addColor = () => {
    setOpenAddColor(true);
  };

  const closeColorModal = () => {
    setOpenAddColor(false);
  };

  return (
    <>
      <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed text-[#76838F]">
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Products Listing</h2>
            <div className="flex">
              <Link to={"/dashboard/dashboardhome"}>
                {" "}
                <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
              </Link>{" "}
              <span className="ms-1 "> / Products</span>
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
            <Link to="/dashboard/add-products">
              <button className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
                <FaPlus />
              </button>
            </Link>
          </div>
        </div>

        {/* filters */}
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

        {/* table */}
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <div className="mb-3 flex justify-between">
            {/* show input */}
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

          {/* data table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-3">
                      <input type="checkbox" className="cursor-pointer" />
                    </th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Code</th>
                    <th className="p-3 text-left">Product Type</th>
                    <th className="p-3 text-center">Best Selling</th>
                    <th className="p-3 text-center">Top Rated</th>
                    <th className="p-3 text-center">Trending</th>
                    <th className="p-3 text-center">Order</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {products.map((product, index) => (
                    <tr className="border-t hover:bg-gray-50" key={index}>
                      <td className="p-3">
                        <input type="checkbox" className="cursor-pointer" />
                      </td>
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">{product.code}</td>
                      <td className="p-3">{product.type}</td>
                      <td className="p-3 text-center">{product.bestSelling}</td>
                      <td className="p-3 text-center">{product.topRated}</td>
                      <td className="p-3 text-center">{product.trending}</td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={product.order}
                          onChange={(e) => {
                            const updated = [...products];
                            updated[index].order = e.target.value;
                            setProducts(updated);
                          }}
                          className="w-16 text-center border rounded cursor-pointer"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <span className="bg-green-500 text-white px-2 py-1 rounded">
                          {product.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <Link to="/dashboard/editproduct">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                            <FaEdit />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                  <form onSubmit={handleSave}>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded cursor-pointer"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Code</label>
                      <input
                        type="text"
                        name="code"
                        value={editData.code}
                        onChange={handleInputChange}
                        className="w-full border px-3 py-2 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
