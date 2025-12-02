import React from "react";
import { PiFileTextFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function EditSlider() {
  return (
    <>
      {/* header */}
      <div className="p-6 bg-[#F1F4F5] min-h-screen  min-w-[82%] fixed text-[#76838F]">
        <div className="flex  justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Edit Slider</h2>
            <div className="flex">
              <Link to={"/dashboard/dashboardhome"}>
                {" "}
                <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
              </Link>{" "}
              <span>/ Slider</span>
            </div>
          </div>
        </div>
        <div className=" shadow-lg mx-5 rounded-[8px] p-5 ">
          <div className="  flex   ">
            <div className="w-[30%]">
              <input
                type="file"
                name=""
                id=""
                className="px-3 py-20 border-black border-2  "
              />
            </div>
            <div className="w-[65%] ms-10">
              <div>
                <div>Title</div>
                <input
                  type="text"
                  className="w-full border-black border-1 rounded-[8px] "
                />
              </div>
              <div>
                <div>Order</div>
                <input
                  type="text"
                  className="w-full border-black border-1 rounded-[8px] "
                />
              </div>
            </div>
          </div>
          <div className="mx-5  ">
            <div className="flex ">
              <span className="bg-blue-500 pt-3 mt-3 text-white ">
                <PiFileTextFill />
              </span>
              <button className="bg-blue-500 text-white px-4 py-2 mt-3 cursor-pointer">
                {" "}
                Update Slider{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
