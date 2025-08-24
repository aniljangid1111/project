import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SizeDetails() {
  const params = useParams();

  let [seleteSize, setSelectSize] = useState("");
  let [sizeDetail, setSizeDetail] = useState("");

  const formahandler = (event) => {
    event.preventDefault();

    if (event.target._id.value == "") {
      axios
        .post("http://localhost:8400/api/admin/size/add", event.target)
        .then((success) => {
          if (success.data.status == true) {
            event.target.reset();
            setSelectSize("");
            toast.success(success.data.message);
          }
        })
        .catch((err) => {
          toast.error(success.data.message);
        });
    } else {
      axios
        .put(
          `http://localhost:8400/api/admin/size/update/${event.target._id.value}`,
          event.target
        )
        .then((success) => {
          if (success.data.status == true) {
            event.target.reset();
            setSelectSize("");
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
        .post(`http://localhost:8400/api/admin/size/details/${params.id}`)
        .then((result) => {
          if (result.data.status == true) {
            setSizeDetail(result.data.data);
          }
        })
        .catch((err) => {
          toast.error("Something Went worng ");
        });
    }
  }, []);

  return (
    <>
      <Breadcrumb path={"Size"} path2={"Size Details"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Size
          </h3>
          <form className="border border-t-0 p-3 rounded-b-md border-slate-400" onSubmit={formahandler}>
          <input type="hidden" name="_id" value={sizeDetail._id} id="" />
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Size Name
              </label>
              <input
                type="text"
                name="name"
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Side Name"
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
                name="order"
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Order"
              />
            </div>
            {/* <div className="pe-5 ps-1">
              <span className="flex items-center gap-3">
                Status :
                <input
                  id="link-radio"
                  name="sizeStatus"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Active
                <input
                  id="link-radio"
                  name="sizeStatus"
                  type="radio"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Deactive
              </span>
            </div> */}
            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Add Size
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
