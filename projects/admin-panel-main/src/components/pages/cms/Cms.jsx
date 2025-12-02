import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const CmsPagesListing = () => {
  const pages = [
    { id: 1, title: "Home Page" },
    { id: 2, title: "About Us" },
    { id: 3, title: "Contact Us" },
    { id: 4, title: "Privacy Policy" },
    { id: 5, title: "Term of Use" },
  ];

  return (
    <div className="min-h-screen bg-[#f1f4f5] p-6 text-[#76838F]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">CMS Pages Listing</h1>
        <div className="flex">
          <Link to={"/dashboard/dashboardhome"}>
            {" "}
            <p className="text-sm text-blue-500 mt-1">
              Dashboard {" "}
            </p>{" "}
          </Link>{" "}
          <span className="ms-1 "> / CMS Pages </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 w-20">S. No.</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3 w-28">Action</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, index) => (
              <tr
                key={page.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-3">{page.id}</td>
                <td className="px-4 py-3">{page.title}</td>
                <td className="px-4 py-3">
                  <Link to={"/dashboard/edit-cms"}>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-2">
                      <FaEdit size={14} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CmsPagesListing;
