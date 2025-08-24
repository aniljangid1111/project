import React from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function DashboardHome() {

  
  return (
    <>
 
      <div className="bg-[#F1F4F5] min-h-screen min-w-[82%] fixed">
      {/* Navbar */}


      {/* Welcome Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-20"
      >
        <h2 className="text-4xl font-semibold text-gray-800">Welcome 👋</h2>
        <p className="text-gray-500 mt-2 text-lg">
          Here's what's happening in your admin panel today.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4  gap-6 p-6 mt-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#3E8EF7] rounded-xl p-6 shadow hover:shadow-lg transition text-white cursor-pointer "
        >
          <h3 className="text-xl font-bold  ">Users</h3>
          <p className=" mt-2">1,234 registered users</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#17B3A3] rounded-xl p-6 shadow hover:shadow-lg transition text-white  cursor-pointer"
        >
          <h3 className="text-xl font-bold">Orders</h3>
          <p className=" mt-2">567 new orders</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#0BB2D4] rounded-xl p-6 shadow hover:shadow-lg transition text-white cursor-pointer"
        >
          <h3 className="text-xl font-bold ">Revenue</h3>
          <p className=" mt-2">$12,345 earned</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-[#9463F7] rounded-xl p-6 shadow hover:shadow-lg transition text-white cursor-pointer"
        > 
          <h3 className="text-xl font-bold ">Revenue</h3>
          <p className=" mt-2">$12,345 earned</p>
        </motion.div>
      </div>
    </div>
    </>
  );
}
