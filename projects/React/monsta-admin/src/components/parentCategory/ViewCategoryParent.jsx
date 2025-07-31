import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAirplane } from "react-icons/io";
import { MdOutlineAirplanemodeInactive } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function ViewCategoryParent() {
    // const [categories, setCategories] = useState([])
    const [showFilter, setShowFilter] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const toggleFilter = () => setShowFilter(!showFilter);
    const closeModal = () => {
        setOpenAddModal(false);
        setSelectedCategory(null);
        setPreviewImage(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleImageRemove = () => {
        setPreviewImage(null);
    };

    return (
        <div className="p-6 bg-[#F1F4F5] text-[#76838F]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Category Listing</h2>
                    <div className="flex">
                        <Link to="/">
                            <p className="text-sm text-blue-500 mt-1">Dashboard</p>
                        </Link>
                        <span className="ms-1">/ Categories</span>
                    </div>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
                    <Link to={'/add-category'}>
                        + Add Category
                    </Link>
                </button>
            </div>

            {/* Filter */}
            {showFilter && (
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
            )}

            {/* Table */}
            <div className="overflow-x-auto  shadow rounded-lg bg-white mt-4">
                <div className="p-6">
                    <div className="flex justify-between my-2">
                        <h2 className="text-xl font-bold mb-4">Category List</h2>
                        <div className="space-x-3 flex">
                            <button
                                onClick={toggleFilter}
                                className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
                            >
                                {showFilter ? <MdOutlineAirplanemodeInactive /> : <IoMdAirplane />}
                            </button>
                            <button className="bg-yellow-500 px-4 text-white rounded hover:bg-yellow-600">
                                Change Status
                            </button>
                            <button className="bg-red-500 px-5 text-white rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>

                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="p-2">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Image</th>
                                <th className="p-2">Order</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr  className="text-center place-items-center border-b hover:bg-gray-50">
                                <td className="p-2">
                                    <input type="checkbox" />
                                </td>
                                <td className="p-2">table</td>
                                <td className="p-2 text-center">

                                    <img src='/' alt="Category" className="w-10 h-10 object-cover rounded " />

                                    {/* <div className="text-gray-400">N/A</div> */}

                                </td>


                                <td className="p-2">1</td>
                                <td className="p-2">
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        Active
                                    </span>
                                </td>
                                <td className="p-2">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {(openAddModal || selectedCategory) && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
                    <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
                        <h3 className="text-lg font-semibold mb-4">
                            {selectedCategory ? "Edit Category" : "Add New Category"}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block">Name</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded mt-1"
                                    defaultValue={selectedCategory?.name}
                                />
                            </div>
                            \
                            <div>
                                <label className="block">Order</label>
                                <input
                                    type="text"
                                    className="w-full border px-3 py-2 rounded mt-1"
                                    defaultValue={selectedCategory?.order}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Category Image</label>
                                <input type="file" onChange={handleImageChange} />
                                {previewImage && (
                                    <div className="mt-2 relative w-24">
                                        <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover rounded" />
                                        <button
                                            onClick={handleImageRemove}
                                            className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                                        >
                                            X
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 gap-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
                                {selectedCategory ? "Update Category" : "Add Category"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
