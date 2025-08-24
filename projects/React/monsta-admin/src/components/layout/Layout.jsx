import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SideNav from '../common/SideNav';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-[2fr_8fr] min-h-screen">
        {/* Sidebar */}
        <div className="bg-gray-100">
          <SideNav />
        </div>

        {/* Main Content */}
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 bg-white shadow">
            <Header />
          </div>

          {/* Scrollable Main Area */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 z-20 bg-white shadow">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
