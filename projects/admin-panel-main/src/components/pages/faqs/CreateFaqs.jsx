import React from "react";
import { FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CreateFaqs  ()  {
  return (
    <div className="min-h-screen bg-[#f1f4f5] p-6 text-[#76838F]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Create Faq</h1>
         <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard / <Link to={'/dashboard/faqs'} > <span>  Faqs</span></Link> </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> /  Create Faq </span>
          </div>
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 rounded-md shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <input
            type="text"
            placeholder="Question"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer
          </label>
          <textarea
            rows="6"
            placeholder="Answer"
            className="w-full border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <input
            type="number"
            placeholder="Order"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          <FaFile /> Create Faq
        </button>
      </div>
    </div>
  );
};

