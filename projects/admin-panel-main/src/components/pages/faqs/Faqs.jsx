import React, { useState } from "react";
import { FaEdit, FaPlus, FaFile } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { VscArrowSwap } from "react-icons/vsc";
import { AiFillFileText } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Faqs() {
  const faqs = [
    {
      question:
        "Mauris congue euismod purus at semper. Morbi et vulputate massa?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo...",
      order: 1,
      status: "Active",
    },
    {
      question: "Donec mattis finibus elit ut tristique?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo...",
      order: 2,
      status: "Active",
    },
    {
      question: "Aenean elit orci, efficitur quis nisl at, accumsan?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo...",
      order: 3,
      status: "Active",
    },
    {
      question: "Pellentesque habitant morbi tristique senectus et netus?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo...",
      order: 4,
      status: "Active",
    },
    {
      question: "Nam pellentesque aliquam metus?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo...",
      order: 5,
      status: "Active",
    },
    {
      question: "Aenean elit orci, efficitur quis nisl at?",
      answer:
        "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo...",
      order: 6,
      status: "Active",
    },
  ];

  return (
    <div className="p-6 bg-[#f1f4f5] min-h-screen w-full text-[#76838F]">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Faqs Listing</h2>
         <div className="flex">
                    <Link to={"/dashboard/dashboardhome"}>
                      {" "}
                      <p className="text-sm text-blue-500 mt-1">Dashboard /  </p>{" "}
                    </Link>{" "}
                    <span className="ms-1 ">   Faqs Listing</span>
                  </div>
      </div>

      {/* Table Actions */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-sm">
          <label>Show</label>
          <select className="border rounded px-2 py-1">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <label>entries</label>
          <div className="ml-4">
            <label className="mr-1">Search:</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-100 p-2 rounded">
            <VscArrowSwap />
          </button>
          <button className="bg-gray-100 p-2 rounded">
            <MdDeleteForever />
          </button>
          <button className="bg-gray-100 p-2 rounded">
            <AiFillFileText />
          </button>
          <button className="bg-gray-100 p-2 rounded">
            <FaFile />
          </button>
        </div>
      </div>

      {/* FAQs Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-2">Question</th>
              <th className="px-4 py-2">Answer</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">{faq.question}</td>
                <td className="px-4 py-2">{faq.answer}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={faq.order}
                    className="border px-2 py-1 rounded w-16"
                    readOnly
                  />
                </td>
                <td className="px-4 py-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {faq.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link to={"/dashboard/edit-faqs"}>
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 text-sm text-gray-600">
          Showing 1 to {faqs.length} of {faqs.length} entries
        </div>
      </div>

      {/* Floating + Button */}
      <Link to={"/dashboard/create-faqs"}>
        <button className="fixed top-23 right-6 bg-blue-500 text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center text-xl hover:bg-blue-600">
          <FaPlus />
        </button>
      </Link>
    </div>
  );
}
