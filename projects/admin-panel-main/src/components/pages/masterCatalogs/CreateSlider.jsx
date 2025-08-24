import React from "react";
import { Link } from "react-router-dom";

const CreateSlider = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-[#76838F]">
      <div className="text-sm text-gray-500 mb-4">
         <h2 className="text-2xl font-bold">Create Slider</h2>
        <Link to={ "/dashboard/dashboardhome"} ><span className="text-blue-600 cursor-pointer">Dashboard</span> /{" "}</Link>
        <Link to={ "/dashboard/slider"} ><span className="text-blue-600 cursor-pointer">Sliders</span> /{" "}</Link>
        <span className="text-gray-700">Create Slider</span>
      </div>

      <div className="bg-white p-6 rounded shadow-md max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">Create Slider</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Input */}
          <div className="flex flex-col">
            <label className="block mb-2 font-medium text-gray-700 ">
              Choose Image
            </label>
            <input
              type="file"
              className="  block w-full text-sm text-gray-500 p-5 border-[#76838F] border-2
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
          </div>

          {/* Title and Order Inputs */}
          <div className="flex flex-col gap-4">
            <div className="">
              <div> Title :</div>
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
                <div>Order :</div>
              <input
                type="text"
                placeholder="Order"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer ">
            📁 Create Slider
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSlider;
