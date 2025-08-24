import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdOutlineAirplanemodeInactive } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ViewCountry() {
  const countrys = [
    { name: "Burnt Amber",  order: "1", status: "Active" },
    { name: "Golden Teak",  order: "2", status: "Active" },
  ];

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedcountry, setSelectedcountry] = useState(null);

  const toggleFilterModal = () => setShowEditModal(!showEditModal);

  return (
    <div className="p-6 bg-[#F1F4F5]  text-[#76838F]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Country Listing</h2>
          <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
            </Link>{" "}

          </div>
        </div>

      </div>

      {/* Filters */}
      {showEditModal && (
        <div className="flex ms-2 mt-2">
          <div className="ms-2 mb-1">
            <span>Search:</span>
            <input
              type="text"
              placeholder="Search"
              className="ms-2 border-2 rounded-[8px] p-1 cursor-pointer"
            />
          </div>
        </div>

      )
      }

      {/* Table Section */}
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        {/* Table */}
        <div className="p-6">
          <div className="flex justify-between my-2 ">
            <div><h2 className="text-xl font-bold mb-4">Country List</h2></div>
            <div className="space-x-3 flex">
              <button
                onClick={toggleFilterModal}
                className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
              >
                {showEditModal ? (
                  <MdOutlineAirplanemodeInactive />
                ) : (
                  <IoMdAirplane />
                )}
              </button>
              <button
                className=" bg-green-500 px-4 text-white rounded shadow-lg flex items-center justify-center hover:bg-green-600 transition cursor-pointer"
              >
                Change Status
              </button>
              <button
                className=" bg-red-500 px-5 text-white rounded shadow-lg flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="">
                    <input type="checkbox" />
                  </th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Order</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {countrys.map((country, index) => (
                  <tr key={index} className="border-b text-center hover:bg-gray-50">
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2">{country.name}</td>
                    <td className="p-2">
                      <input
                        className="w-16 border px-2 py-1 text-sm rounded cursor-pointer"
                        value={country.order}
                        readOnly
                      />
                    </td>
                    <td className="p-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded cursor-pointer">
                        {country.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => setSelectedcountry(country)}
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

          {/* Edit Modal */}
          {selectedcountry && (
            <div className="fixed inset-0 bg-transparent bg-opacity-30 flex justify-center items-start pt-20 z-50">
              <div className="bg-white w-full max-w-xl p-6 rounded shadow-lg relative">
                <h3 className="text-lg font-semibold mb-4">Update Country</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block">Name</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                      value={selectedcountry.name}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block">Code</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                      value={selectedcountry.code}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block">Order</label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1 cursor-pointer"
                      value={selectedcountry.order}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={() => setSelectedcountry(null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">
                    Update Country
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div >
  );
}
