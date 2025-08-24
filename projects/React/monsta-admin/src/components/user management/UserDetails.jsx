import React, { useState } from 'react'
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { FaEye } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoIosDocument } from 'react-icons/io';
import { IoDocumentText } from 'react-icons/io5';
import { MdDelete, MdFilterAlt, MdFilterAltOff } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function UserDetails() {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => setShowFilters(!showFilters);

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Title */}
                <div className='flex justify-between items-center px-4'>
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold">Admins Listing</h1>
                        <p className="text-blue-600 text-sm"><Link to='/'>Dashboard</Link> / User</p>
                    </div>

                    {/* Filter Toggle Button */}
                    <div className="mb-2 flex gap-3 items-center justify-center text-center">
                        <button
                            onClick={toggleFilters}
                            className=" text-white flex justify-center  text-[20px]  rounded-[50%] w-10 h-10 bg-blue-600  items-center  hover:bg-blue-700 transition-all   "
                        >
                            {showFilters ? <MdFilterAltOff /> : < MdFilterAlt />
                            }
                        </button>
                    </div>

                </div>
                {/* Filters Panel */}
                <div
                    className={`transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-[500px] mb-4' : 'max-h-0'
                        }`}
                >
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="font-semibold mb-3">FILTERS</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input type="text" placeholder="Name" className="p-2 border rounded w-full md:w-1/3" />
                            <input type="text" placeholder="Email Address" className="p-2 border rounded w-full md:w-1/3" />
                            <input type="text" placeholder="Mobile Number" className="p-2 border rounded w-full md:w-1/3" />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply</button>
                            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">Clear</button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white p-4 rounded shadow">
                    <div className="overflow-auto">
                        <div className='flex justify-between  gap-5 mb-2'>
                            <div className='flex  gap-5 mb-2'>
                                <div>
                                    <div>
                                        <label htmlFor="show">Show Entries</label>
                                        <select name="show" id="show" className='w-[50px] border mx-2'>
                                            <option value="0"></option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="40">40</option>
                                            <option value="all">All</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="Search">Search</label>
                                        <input type="text" name='Search' className='border mx-2' />
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center gap-1 text-[22px]'>
                                <div className='bg-gray-200 border rounded-sm'><CgArrowsExchangeAlt /></div>
                                <div className='bg-gray-200 border rounded-sm text-red-600'><MdDelete /></div>
                                <div className='bg-gray-200 border rounded-sm '><IoDocumentText /></div>
                                <div className='bg-gray-200 border rounded-sm '><IoIosDocument /></div>
                            </div>
                        </div>
                        <table className="min-w-full table-auto text-sm text-left">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-3"><input type="checkbox" /></th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email ID</th>
                                    <th className="p-3">Mobile Number</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {[
                                    { name: "Abc", email: "tyc@gmail.com", mobile: "89563214785" },
                                    { name: "Hello", email: "abc@gmail.com", mobile: "3698752698" },
                                    { name: "Hello", email: "Hello@gmail.com", mobile: "9789645357" },
                                ].map((admin, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-3"><input type="checkbox" /></td>
                                        <td className="p-3">{admin.name}</td>
                                        <td className="p-3">{admin.email}</td>
                                        <td className="p-3">{admin.mobile}</td>
                                        <td className="p-3">
                                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Active</span>
                                        </td>
                                        <td className="p-3 ">
                                            <button className="flex justify-center items-center text-center text-blue-600 rounded-[50%] w-[30px] h-[30px] bg-gray-200 hover:text-blue-800">
                                                <FaEye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                        <p>Showing 1 to 3 of 3 entries</p>
                        <div className="flex gap-2">
                            <button className="px-2 py-1 bg-gray-200 rounded" disabled>Previous</button>
                            <button className="px-2 py-1 bg-blue-600 text-white rounded">1</button>
                            <button className="px-2 py-1 bg-gray-200 rounded" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
