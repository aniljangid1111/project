import React from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import Breadcrumb from "../common/Breadcrumb";
import Footer from "../common/Footer";
import { motion } from "framer-motion";

export default function Dashboard() {
  const cards = [
    {
      title: "Users",
      value: "26K",
      change: "(-12.4% ↓)",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Product",
      value: "$6,200",
      change: "(40.9% ↑)",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Category",
      value: "2.49%",
      change: "(84.7% ↑)",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Orders",
      value: "44K",
      change: "(-23.6% ↓)",
      color: "from-red-400 to-red-600",
    },
  ];

  return (
    <>
      <Breadcrumb path={"Dashboard"} />
      <div className="w-full min-h-[610px] bg-gray-100">
        <div className="max-w-[1220px] mx-auto py-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <DashboardCard key={i} {...card} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function DashboardCard({ title, value, change, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl p-6 text-white bg-gradient-to-br ${color} shadow-xl relative overflow-hidden hover:scale-[1.03] transition-all duration-300`}
    >
      {/* Glow decoration */}
      <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full blur-2xl z-0"></div>

      {/* Icon */}
      <div className="absolute top-3 right-3 text-white/20 z-10">
        <svg
          fill="currentColor"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 512"
        >
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-3xl font-extrabold">{value}</h3>
        <p className="text-sm text-white/80 mb-2">{change}</p>
        <p className="text-lg font-semibold tracking-wide">{title}</p>
      </div>
    </motion.div>
  );
}
