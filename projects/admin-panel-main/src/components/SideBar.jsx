import React, { useContext, useState } from "react";
import { Nav_Context } from "../context/Context";
import { Link } from "react-router-dom";
import { GiCharacter } from "react-icons/gi";
import { FaLocationArrow, FaSlidersH, FaWeixin } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineWeb,
} from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import { RiArrowDownDoubleFill } from "react-icons/ri";

export default function SideBar() {
  const { Nav_State, setNav_State } = useContext(Nav_Context);

  let Sidebar_width;
  if (Nav_State == true) {
    Sidebar_width = "0px";
  } else {
    Sidebar_width = "20%";
  }

  const [openMenu, setOpenMenu] = useState(null);
  const [openLocation, setOpenLocation] = useState(null);
  const [openMasterCatalogs, setOpenMasterCatalogs] = useState(null);
  const [openProductCatalogs, setOpenProductCatalogs] = useState(null);
  const [openEnquiry, setOpenEnquiry] = useState(null);
  const [openConfig, setOpenConfig] = useState(null);

  const toggleMenu = (menu) => {
  setOpenMenu(openMenu === menu ? null : menu);
};

const locationOpen = (menu) => {
  setOpenLocation(openLocation === menu ? null : menu);
};

const masterCatalogs = (menu) => {
  setOpenMasterCatalogs(openMasterCatalogs === menu ? null : menu);
};

const productCatalogs = (menu) => {
  setOpenProductCatalogs(openProductCatalogs === menu ? null : menu);
};

const enquiry = (menu) => {
  setOpenEnquiry(openEnquiry === menu ? null : menu);
};

const configuration = (menu) => {
  setOpenConfig(openConfig === menu ? null : menu);
};

  return (
    <>
      <div className="w-[22%] h-screen overflow-y-hidden bg-gray-800 text-[#76838F] p-4 space-y-2   ">
        {/* Logo */}
        <div className="bg-[#3E8EF7] flex px-3 py-2 w-[100%]  ">
          <span className="">
            {" "}
            <img
              src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
              alt=""
              className="w-[100%]"
            />
          </span>
          <span className="text-white">furniture</span>
        </div>
        {/* end logo  */}
        <Link
          to="/dashboard/dashboardhome"
          className="block py-2 px-3 hover:bg-gray-700 rounded"
        >
          Dashboard
        </Link>

        {/* Users Management */}
        <button
          onClick={() => toggleMenu("users")}
          className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded cursor-pointer"
        >
          <div className="flex ">
            <span className="pe-4">
              <GiCharacter />
            </span>{" "}
            Users Management
          </div>
          <span>
            {openMenu === "users" ? (
              <RiArrowDownDoubleFill />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight />
            )}
          </span>
        </button>
        {openMenu === "users" && (
          <div className="ml-4 space-y-1">
            <Link
              to="/dashboard/admins"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Admins
            </Link>
            <Link
              to="/dashboard/user"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              User
            </Link>
          </div>
        )}

        {/* location  */}
        <button
          onClick={() => locationOpen("users")}
          className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded cursor-pointer"
        >
          <div className="flex">
            <span className="pe-4">
              <FaLocationArrow />
            </span>{" "}
            Location
          </div>
          <span>
            {openLocation === "users" ? (
              <RiArrowDownDoubleFill />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight />
            )}
          </span>
        </button>
        {openLocation === "users" && (
          <div className="ml-4 space-y-1">
            <Link
              to="/dashboard/countries"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Countries
            </Link>
          </div>
        )}

        {/* Master catalogs */}
        <button
          onClick={() => masterCatalogs("users")}
          className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded cursor-pointer"
        >
          <div className="flex">
            <span className="pe-4">
              <MdOutlineWeb />
            </span>{" "}
            Master catalogs
          </div>
          <span>
            {masterCatalogs === "users" ? (
              <RiArrowDownDoubleFill />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight />
            )}
          </span>
        </button>
        {openMasterCatalogs === "users" && (
          <div className="ml-4 space-y-1">
            <Link
              to="/dashboard/slider"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Sliders
            </Link>
            <Link
              to="/dashboard/testimonials"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Testimonials
            </Link>
            <Link
              to="/dashboard/why-choose-us"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Why Chose Us
            </Link>
            <Link
              to="/dashboard/coupons"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Coupons
            </Link>
          </div>
        )}

        {/* product catalogs */}
        <button
          onClick={() => productCatalogs("users")}
          className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 cursor-pointer rounded"
        >
          <div className="flex">
            <span className="pe-4">
              <MdOutlineWeb />
            </span>{" "}
            Product catalogs
          </div>
          <span>
            {openProductCatalogs === "users" ? (
              <RiArrowDownDoubleFill />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight />
            )}
          </span>
        </button>
        {openProductCatalogs === "users" && (
          <div className="ml-4 space-y-1">
            <Link
              to="/dashboard/categories"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Categories
            </Link>
            <Link
              to="/dashboard/materials"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Materials
            </Link>
            <Link
              to="/dashboard/color"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Color
            </Link>
            <Link
              to="/dashboard/product"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Product
            </Link>
          </div>
        )}

        {/* enquiries */}
        <button
          onClick={() => enquiry("users")}
          className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded cursor-pointer"
        >
          <div className="flex">
            <span className="pe-4">
              <FaSlidersH />
            </span>{" "}
            Enquirys
          </div>
          <span>
            {openEnquiry === "users" ? (
              <RiArrowDownDoubleFill />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight />
            )}
          </span>
        </button>
        {openEnquiry === "users" && (
          <div className="ml-4 space-y-1">
            <Link
              to="/dashboard/contact-enquiry"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Contact Enquirys
            </Link>
            <Link
              to="/dashboard/news-letter"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Newsletters
            </Link>
          </div>
        )}

        {/* configuration */}
        <button
          onClick={() => configuration("users")}
          className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded cursor-pointer"
        >
          <div className="flex">
            <span className="pe-4">
              <FaSlidersH />
            </span>{" "}
            configuration
          </div>
          <span>
            {openConfig === "users" ? (
              <RiArrowDownDoubleFill />
            ) : (
              <MdOutlineKeyboardDoubleArrowRight />
            )}
          </span>
        </button>
        {openConfig === "users" && (
          <div className="ml-4 space-y-1">
            <Link
              to="/dashboard/payment-gateway"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Payment Gateways
            </Link>
            <Link
              to="/dashboard/configuration"
              className="block py-1 px-2 hover:bg-gray-700 rounded"
            >
              Configuration
            </Link>
          </div>
        )}

        {/* faq */}
        <Link to={"/dashboard/faqs"}>
          <button className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">
            <div className="flex">
              <span className="pe-4">
                <FaWeixin />
              </span>{" "}
              faqs
            </div>
          </button>
        </Link>

        {/* CMS Pages  */}
        <Link to={"/dashboard/cms"}>
          <button className="w-full flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">
            <div className="flex">
              <span className="pe-4">
                <AiFillFileText />
              </span>{" "}
              CMS Pages
            </div>
          </button>
        </Link>
      </div>
    </>
  );
}
