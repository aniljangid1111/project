import React, { useState, useEffect } from "react";
import Breadcrumb from "../common/Breadcrumb";
import { motion } from "framer-motion";
import axios from "axios";

export default function Dashboard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_DASHBOARD_VIEW) // apni backend API
      .then((res) => {
        if (res.data._status) {
          setCards(res.data._data); // backend se aa gaya [{title, value}, ...]
        } else {
          console.error("No data found");
          setCards([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setCards([]);
      });
  }, []);

  if (!cards.length) {
    return (
      <div className="w-full min-h-[610px] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb path={"Dashboard"} />
      <div className="w-full min-h-[610px] bg-gray-100">
        <div className="max-w-[1220px] mx-auto py-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <DashboardCard
                key={i}
                title={card.title}
                value={card.value}
                color={
                  card.title === "Users"
                    ? "from-indigo-500 to-indigo-700"
                    : card.title === "Products"
                    ? "from-blue-400 to-blue-600"
                    : card.title === "Categories"
                    ? "from-yellow-400 to-yellow-600"
                    : "from-red-400 to-red-600"
                }
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardCard({ title, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl p-6 text-white bg-gradient-to-br ${color} shadow-xl relative overflow-hidden hover:scale-[1.03] transition-all duration-300`}
    >
      <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/10 rounded-full blur-2xl z-0"></div>

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

      <div className="relative z-10">
        <h3 className="text-3xl font-extrabold">{value}</h3>
        <p className="text-lg font-semibold tracking-wide">{title}</p>
      </div>
    </motion.div>
  );
}
