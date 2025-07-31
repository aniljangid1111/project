import React from "react";
import { Link } from "react-router-dom";

export default function Configuration() {
  return (
    <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed text-[#76838F]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Configuration</h2>
        <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> / Configuration</span>
          </div>
      </div>

      {/* Card */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Social Links Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Facebook Link</label>
            <input
              type="text"
              defaultValue="https://facebook.com"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Instagram Link</label>
            <input
              type="text"
              defaultValue="https://instagram.com"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Twitter Link</label>
            <input
              type="text"
              defaultValue="https://twitter.com"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Linkedin Link</label>
            <input
              type="text"
              defaultValue="https://linkedin.com"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">YouTube Link</label>
            <input
              type="text"
              defaultValue="https://youtube.com"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Telegram Link</label>
            <input
              type="text"
              defaultValue="https://telegram.com"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
        Update Configuration
      </button>
    </div>
  );
}
