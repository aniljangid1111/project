import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import { Link } from "react-router-dom";
import { MdFilterAltOff, MdModeEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function ViewCategory() {
  const [activeFilter, setactiveFilter] = useState(true);
  const [colors, setColors] = useState([]);
  const [searchName, setSearchname] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .post("http://localhost:8001/api/admin/color/view", {
        name: searchName,
        page: currentPage,
      })  
      .then((response) => {
        if (response.data._status === true) {
          setColors(response.data._data);
          setTotalPages(response.data._paggination.total_page)
        } else {
          setColors([]);
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [searchName, apiStatus, currentPage]);

  const searching = (event) => setSearchname(event.target.value);

  const getValue = (id) => {
    if (checkedValues.includes(id)) {
      setCheckedValues(checkedValues.filter((v) => v !== id));
    } else {
      setCheckedValues([...checkedValues, id]);
    }
  };

  const getAllValues = () => {
    if (checkedValues.length === colors.length) {
      setCheckedValues([]);
    } else {
      setCheckedValues(colors.map((v) => v._id));
    }
  };

  const changeStatus = () => {
    if (checkedValues.length > 0) {
      axios
        .put("http://localhost:8001/api/admin/color/change-status", {
          id: checkedValues,
        })
        .then((response) => {
          if (response.data._status === true) {
            setApiStatus(!apiStatus);
            setCheckedValues([]);
            toast.success(response.data._message);
          } else {
            toast.error(response.data._message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong !");
        });
    } else {
      toast.error("Please select at least one record.");
    }
  };

  const deleteRecords = () => {
    if (checkedValues.length > 0) {
      if (window.confirm("Are you sure you want to delete?")) {
        axios
          .put("http://localhost:8001/api/admin/color/delete", {
            id: checkedValues,
          })
          .then((response) => {
            if (response.data._status === true) {
              setApiStatus(!apiStatus);
              setCheckedValues([]);
              toast.success(response.data._message);
            } else {
              toast.error(response.data._message);
            }
          })
          .catch(() => {
            toast.error("Something went wrong !");
          });
      }
    } else {
      toast.error("Please select at least one record to delete.");
    }
  };

  return (
    <section className="w-full">
      <Breadcrumb path={"Color"} link={"/colors/view-color"} path2={"View"} slash={"/"} />

      {/* Filter box */}
      <div
        className={`bg-white border shadow-md rounded-md px-4 py-4 max-w-[1220px] mx-auto mt-8 transition-all duration-500 ${activeFilter ? "hidden" : "block"
          }`}
      >
        <form className="flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            onKeyUp={searching}
            placeholder="Search color name..."
            className="w-full flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </form>
      </div>

      {/* Table section */}
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-6">
          {/* Header actions */}
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md border">
            <h3 className="text-xl font-bold">View Colors</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setactiveFilter(!activeFilter)} className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"  >
                {activeFilter ? <FaFilter /> : <MdFilterAltOff />}
              </button>
              <button
                onClick={changeStatus} className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition" >
                Change Status
              </button>
              <button onClick={deleteRecords} className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition">
                Delete
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 border rounded-md overflow-hidden shadow-sm">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-4">
                      <input
                        onClick={getAllValues}
                        checked={checkedValues.length === colors.length}
                        type="checkbox"
                        className="accent-blue-600 rounded"
                      />
                    </th>
                    <th className="px-6 py-3">Color Name</th>
                    <th className="px-6 py-3">Code</th>
                    <th className="px-6 py-3">Order</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {colors.length > 0 ? (
                    colors.map((value, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-4">
                          <input
                            onClick={() => getValue(value._id)}
                            checked={checkedValues.includes(value._id)}
                            type="checkbox"
                            className="accent-blue-600 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium">{value.name}</td>
                        <td className="px-6 py-4">{value.code}</td>
                        <td className="px-6 py-4">{value.order}</td>
                        <td className="px-6 py-4 ">
                          {value.status == 1 ? (
                            <span className="inline-block px-5 py-1 text-center text-sm rounded-full bg-green-200 text-green-700">
                              Active
                            </span>
                          ) : (
                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                              Deactive
                            </span>
                          )}

                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/color/update/${value._id}`}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <MdModeEdit className="text-lg" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-500 font-medium">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
