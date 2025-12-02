import React, { useState } from "react";
import { FaEdit, FaFile } from "react-icons/fa";
import { motion } from "framer-motion";
import { VscArrowSwap } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function PaymentGateway() {
  return (
    <div className="p-6 bg-[#F1F4F5] min-h-screen min-w-[82%] fixed text-[#76838F]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Payment Gateway Listing</h2>
          <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> / Payment Gateway Listing</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-4">
            <div>
              <span>Show </span>
              <select className="border px-2 py-1 rounded">
                <option>20</option>
                <option>50</option>
              </select>
              <span className="ml-2">entries</span>
            </div>
            <div>
              <span>Search: </span>
              <input type="text" className="border px-2 py-1 rounded ml-2" />
            </div>
          </div>
          <ul className="flex gap-4 items-center">
            <li>
              <button>
                <VscArrowSwap />
              </button>
            </li>
            <li>
              <button>
                <MdDeleteForever />
              </button>
            </li>
            <li>
              <button>
                <AiFillFileText />
              </button>
            </li>
            <li>
              <button>
                <FaFile />
              </button>
            </li>
          </ul>
        </div>

        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Details</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2">Rozorpay</td>
              <td className="px-4 py-2">
                <p className="text-sm">KEY_ID: 123456</p>
                <p className="text-sm">KEY_SECRET: 1234567890</p>
              </td>
              <td className="px-4 py-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Active
                </span>
              </td>
              <td className="px-4 py-2">
                <Link to={"/dashboard/edit-payment-gateways"}>
                  <button className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600">
                    <FaEdit />
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="p-4 text-sm text-gray-600">
          Showing 1 to 1 of 1 entries
        </div>
        <div className="flex justify-between items-center px-4 pb-4">
          <span className="text-sm text-gray-600">Previous</span>
          <button className="bg-blue-500 text-white px-2 py-1 rounded">
            1
          </button>
          <span className="text-sm text-gray-600">Next</span>
        </div>
      </div>
    </div>
  );
}
