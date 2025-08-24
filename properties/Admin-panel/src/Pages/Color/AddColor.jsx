import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import { ChromePicker } from "react-color";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function AddColor() {
  const params = useParams();

  let [SelectColor, setSelectColor] = useState("");
  let [colorDetail, setColorDetail] = useState("");

  const formahandler = (event) => {
    event.preventDefault();

    if (event.target._id.value == "") {
      axios
        .post("http://localhost:8400/api/admin/color/add", event.target)
        .then((success) => {
          if (success.data.status == true) {
            event.target.reset();
            setSelectColor("");
            toast.success(success.data.message);
          }
        })
        .catch((err) => {
          toast.error(success.data.message);
        });
    } else {
      axios
        .put(
          `http://localhost:8400/api/admin/color/update/${event.target._id.value}`,
          event.target
        )
        .then((success) => {
          if (success.data.status == true) {
            event.target.reset();
            setSelectColor("");

            toast.success(success.data.message);
          }
        })
        .catch((err) => {
          toast.error(success.data.message);
        });
    }
  };

  useEffect(() => {
    if (params.id != null) {
      axios
        .post(`http://localhost:8400/api/admin/color/details/${params.id}`)
        .then((result) => {
          if (result.data.status == true) {
            setColorDetail(result.data.data);
          }
        })
        .catch((err) => {
          toast.error("Something Went worng ");
        });
    }
  }, []);

  const colorchange = (event) => {
    setSelectColor(event.target.value);
  };

  return (
    <>
      <Breadcrumb
        path={"Colors"}
        path2={params.id != null ? "update-color" : "Add Color"}
        slash={"/"}
      />
      <div className="w-full">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
            {params.id != null ? "update-color" : "Add Color"}
          </h3>
          <form
            className="p-3 border border-t-0 rounded-b-md border-slate-400"
            onSubmit={formahandler}
          >
            <input type="hidden" name="_id" value={colorDetail._id} id="" />
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                {params.id != null ? "update-color" : "Add Color"}
              </label>
              <input
                type="text"
                name="name"
                defaultValue={colorDetail.name}
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Color Name"
              />
            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Order
              </label>
              <input
                type="text"
                name="oder"
                defaultValue={colorDetail.order}
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Color Name"
              />
            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-8 text-md font-medium text-gray-900"
              >
                Color Picker
              </label>

              <div className="flex gap-5 ">
                <div className="">
                  <input
                    type="color"
                    defaultValue={colorDetail.code}
                    onChange={colorchange}
                  />
                </div>
                <div className=" ">
                  <input
                    type="text"
                    name="code"
                    value={SelectColor != "" ? SelectColor : colorDetail.code}
                    id=""
                    className="w-[100px] h-[25px] border-black border-2"
                  />
                </div>
              </div>
              <br />
            </div>

            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Select Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
