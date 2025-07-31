import React from "react";
import { Link } from "react-router-dom";

export default function EditCms() {
  return (
    <div className="p-6 space-y-8 text-[#76838F]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Faq</h1>
        <div className="flex">
          <Link to={"/dashboard/dashboardhome"}>
            {" "}
            <p className="text-sm text-blue-500 mt-1">
              Dashboard /{" "}
              <Link to={"/dashboard/cms"}>
                {" "}
                <span> CMS Pages</span>
              </Link>{" "}
            </p>{" "}
          </Link>{" "}
          <span className="ms-1 "> / Edit Home </span>
        </div>
      </div>

      {/* Design Creative, Bestselling Products, Onsale Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Design Creative Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Design Creative</h2>
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="Design Creative Title"
              className="input w-full border-2 rounded-[8px] px-2 py-1 "
            />
          </div>
          <div>
            <label className="block mb-1">Tagline</label>
            <input
              type="text"
              placeholder="Design Creative Tagline"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Image</label>
            <div className="w-full h-60 border-2 rounded-[8px] px-2 py-1 border-dashed flex items-center justify-center cursor-pointer relative">
              <input
                type="file"
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center pointer-events-none">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-gray-500">Upload Image</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bestselling Products Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Bestselling Products</h2>
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="Bestselling Products Title"
              className="input w-full border-2 rounded-[8px] px-2 py-1 "
            />
          </div>
          <div>
            <label className="block mb-1">Tagline</label>
            <input
              type="text"
              placeholder="Bestselling Products Tagline"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Image</label>
            <div className="w-full h-60 border-2 rounded-[8px] px-2 py-1 border-dashed flex items-center justify-center cursor-pointer relative">
              <input
                type="file"
                className="absolute w-full h-full opacity-0 cursor-pointer border-2 rounded-[8px] px-2 py-1 "
              />
              <div className="flex flex-col items-center pointer-events-none">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-gray-500">Upload Image</span>
              </div>
            </div>
          </div>
        </div>

        {/* Onsale Products Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Onsale Products</h2>
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="Onsale Products Title"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Tagline</label>
            <input
              type="text"
              placeholder="Onsale Products Tagline"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Image</label>
            <div className="w-full h-60 border-2 rounded-[8px] px-2 py-1 border-dashed flex items-center justify-center cursor-pointer relative">
              <input
                type="file"
                className="absolute w-full h-full opacity-0 cursor-pointer border-2 rounded-[8px] px-2 py-1"
              />
              <div className="flex flex-col items-center pointer-events-none">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-gray-500">Upload Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Collection */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Trending Collection</h2>
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            placeholder="Trending Collection Title"
            className="input w-full border-2 rounded-[8px] px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Tagline</label>
          <input
            type="text"
            placeholder="Trending Collection Tagline"
            className="input w-full border-2 rounded-[8px] px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Image</label>
          <div className="w-full h-60 border-2 rounded-[8px] px-2 py-1 border-dashed flex items-center justify-center cursor-pointer relative">
            <input
              type="file"
              className="absolute w-full h-full opacity-0 cursor-pointer border-2 rounded-[8px] px-2 py-1"
            />
            <div className="flex flex-col items-center pointer-events-none">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-gray-500">Upload Image</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Free Shipping Title</label>
            <input
              type="text"
              placeholder="Free Shipping Title"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Free Shipping Tagline</label>
            <input
              type="text"
              placeholder="Free Shipping Tagline"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Money Return Title</label>
            <input
              type="text"
              placeholder="Money Return Title"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Money Return Tagline</label>
            <input
              type="text"
              placeholder="Money Return Tagline"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Online Support Title</label>
            <input
              type="text"
              placeholder="Online Support Title"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
          <div>
            <label className="block mb-1">Online Support Tagline</label>
            <input
              type="text"
              placeholder="Online Support Tagline"
              className="input w-full border-2 rounded-[8px] px-2 py-1"
            />
          </div>
        </div>
      </div>

      {/* Testimonial and Newsletter */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Testimonial Title</label>
          <input
            type="text"
            placeholder="Testimonial Title"
            className="input w-full border-2 rounded-[8px] px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Newsletter Title</label>
          <input
            type="text"
            placeholder="Newsletter Title"
            className="input w-full border-2 rounded-[8px] px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Newsletter Tagline</label>
          <input
            type="text"
            placeholder="Newsletter Tagline"
            className="input w-full border-2 rounded-[8px] px-2 py-1"
          />
        </div>
      </div>

      {/* Meta Section */}
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Meta Title</label>
          <input
            type="text"
            placeholder="Meta Title"
            className="input w-full border-2 rounded-[8px] px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">Meta Keywords</label>
          <textarea
            placeholder="Meta Keywords"
            className="textarea w-full border-1 rounded-[8px] px-2  py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Meta Description</label>
          <textarea
            placeholder="Meta Description"
            className="textarea w-full border-1 rounded-[8px] px-2  py-2"
          />
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded">
        Update
      </button>
    </div>
  );
}
