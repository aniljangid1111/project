import React, { useState } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function EditProduct() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  return (
    <>
      <div className="p-6 bg-[#F1F4F5] min-h-screen  min-w-[82%]   overflow-y-scroll text-[#76838F]">
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Products Listing</h2>
            <div className="flex">
              <Link to={"/dashboard/dashboardhome"}>
                {" "}
                <p className="text-sm text-blue-500 mt-1">Dashboard <Link to={'/dashboard/product'}> <span> / Products </span> </Link> </p>{" "} 
              </Link>{" "}
              <span className="ms-1 "> / Update Product</span>
            </div>
          </div>
        </div>
        {/* basic info  */}
        <div className="p-6 bg-white rounded-xl shadow-xl max-w-7xl m-5">
          <h2 className="text-2xl font-semibold mb-6">Basic Info</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Image
                </label>
                <div className="w-full h-48 border rounded-lg flex items-center justify-center overflow-hidden">
                  {frontImage ? (
                    <img
                      src={frontImage}
                      alt="Front Preview"
                      className="h-full"
                    />
                  ) : (
                    <span className="text-gray-400">Preview</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFrontImage(URL.createObjectURL(e.target.files[0]))
                  }
                  className="mt-3 w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Back Image
                </label>
                <div className="w-full h-48 border rounded-lg flex items-center justify-center overflow-hidden">
                  {backImage ? (
                    <img
                      src={backImage}
                      alt="Back Preview"
                      className="h-full"
                    />
                  ) : (
                    <span className="text-gray-400">Preview</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setBackImage(URL.createObjectURL(e.target.files[0]))
                  }
                  className="mt-3 w-full"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Category
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>Select Category</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="Hrithvik Stool"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Materials
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>JackFruit</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Product Type
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>New Arrivals</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Is Top Rated
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Is Trending Collection
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Dimension Length
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="72L"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Total In Stocks
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Sub Category
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>Nothing selected</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Code
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="jod3333"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Colors
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>Black Finish</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Is Best Selling
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Is Upsell
                </label>
                <select className="w-full border rounded-lg p-2">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Estimate Delivery Days
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="30-35 Days"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Dimension Height
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="32H"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Dimension Width
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="30W"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Actual Price
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  placeholder="7000"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Sale Price
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  placeholder="6000"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write product description…"
            />
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
              Update
            </button>
          </div>
        </div>
        {/*  choose images */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Images</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="border rounded-lg p-4 relative transition-all duration-300 shadow hover:shadow-lg"
              >
                {/* Delete Icon (no functionality) */}
                <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <FiTrash2 size={20} />
                </button>

                {/* Image Section */}
                <label className="block text-sm font-medium text-gray-700 mb-2 r ">
                  Choose Image
                </label>

                <div className="w-full h-40 border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Preview"
                    className="h-full object-contain"
                  />
                </div>

                <input type="file" className="mt-3 w-full" />

                {/* Order Input */}
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    className="w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Image Button (non-functional) */}
          <div className="mt-6 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <FiPlus />
              Add Images
            </button>
          </div>
        </div>
        {/*  seo content  */}
        <div className="bg-gray-100 p-6 rounded-md max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">SEO Content</h2>

          <div className="bg-white p-6 rounded-md shadow-sm space-y-5">
            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value="Hrithvik Stool"
                className="w-full border rounded-md px-3 py-2"
                readOnly
              />
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Keywords
              </label>
              <textarea
                rows={3}
                className="w-full border rounded-md px-3 py-2"
                defaultValue="Hrithvik Stool"
                readOnly
              ></textarea>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                className="w-full border rounded-md px-3 py-2"
                defaultValue="Hrithvik Stool"
                readOnly
              ></textarea>
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-6">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
              <FiSave />
              Update Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
