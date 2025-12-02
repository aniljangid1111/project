import React from "react";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EditPaymentGateway() {
  return (
    <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Edit Payment Gateway </h2>
        <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard / <Link to={'/dashboard/payment-gateway'} > <span>  Payment Gateway</span></Link> </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> /  Edit Payment Gateway</span>
          </div>
      </div>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          defaultValue="Rozorpay"
          className="w-full border border-green-500 px-4 py-2 rounded"
        />
      </div>

      {/* Note */}
      <div className="bg-blue-100 border border-blue-300 text-blue-700 rounded px-4 py-3 mb-6">
        <strong>Note:</strong> Please use the underscore sign in place of spaces in key like: MERCHANT_ID, MERCHANT_KEY etc.
      </div>

      {/* Plus Icon */}
      <div className="flex justify-end mb-4">
        <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600">
          <FaPlus />
        </button>
      </div>

      {/* Key-Value Block */}
      <div className="bg-white shadow rounded-lg border mb-4 p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-5">
            <label className="block text-sm mb-1">Key</label>
            <input
              type="text"
              defaultValue="KEY_SECRET"
              className="w-full border px-4 py-2 rounded bg-gray-50"
            />
          </div>
          <div className="col-span-5">
            <label className="block text-sm mb-1">Value</label>
            <input
              type="text"
              defaultValue="1234567890"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div className="col-span-2 text-right">
            <button className="text-red-500 hover:text-red-700 text-xl">
              <MdDelete />
            </button>
          </div>
        </div>
      </div>

      {/* Error Block */}
      <div className="bg-white shadow rounded-lg border mb-6 p-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-5">
            <label className="block text-sm mb-1">Key</label>
            <input
              type="text"
              placeholder="Key like: MERCHANT_ID"
              className="w-full border border-red-500 px-4 py-2 rounded"
            />
            <p className="text-red-500 text-xs mt-1">Please enter key.</p>
          </div>
          <div className="col-span-5">
            <label className="block text-sm mb-1">Value</label>
            <input
              type="text"
              placeholder="Value"
              className="w-full border border-red-500 px-4 py-2 rounded"
            />
            <p className="text-red-500 text-xs mt-1">Please enter value.</p>
          </div>
          <div className="col-span-2 text-right">
            <button className="text-red-500 hover:text-red-700 text-xl">
              <MdDelete />
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Update Payment Gateway
      </button>
    </div>
  );
}