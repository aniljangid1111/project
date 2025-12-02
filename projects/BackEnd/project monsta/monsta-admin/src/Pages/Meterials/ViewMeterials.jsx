import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import { Link } from "react-router-dom";
import { MdFilterAltOff, MdModeEdit } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function ViewMeterials() {
  let [activeFilter, setactiveFilter] = useState(true);
  const [viewMeterial, setViewMaterial] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .post("http://localhost:8001/api/admin/material/view", {
        name: searchName,
        page: currentPage,
      })
      .then((response) => {
        if (response.data._status == true) {
          setViewMaterial(response.data._data);
          setTotalPages(response.data._paggination.total_page)
        } else {
          setViewMaterial([]);
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Somthing went wrong!!");
      });
  }, [searchName, apiStatus, currentPage]);

  const searching = (event) => {
    setSearchName(event.target.value);
  };

  const getValueId = (id) => {
    if (checkedValues.includes(id)) {
      var data = checkedValues.filter((v) => {
        if (v != id) {
          return v;
        }
      });
      setCheckedValues([...data]);
    } else {
      var data = [...checkedValues, id];
      setCheckedValues(data);
    }
  };
  const getallvalueid = () => {
    var data = [];
    if (checkedValues.length == viewMeterial.length) {
      setCheckedValues([]);
    } else {
      viewMeterial.forEach((v) => {
        data.push(v._id);
      });
      setCheckedValues([...data]);
    }
  };
  const deleteRecord = () => {
    if (confirm("Are you sure to delete record?")) {
      if (checkedValues.length > 0) {
        axios.put("http://localhost:8001/api/admin/material/delete", {
          id: checkedValues
        })
          .then((response) => {
            if (response.data._status == true) {
              setApiStatus(!apiStatus);
              setCheckedValues([]);
              toast.success(response.data._message);
            } else {
              toast.error(response.data._message);
            }

          })
          .catch(() => {
            toast.error('Somthing went wrong!');
          })
      }
    }

  };
  const changeStatus = () => {
    if (checkedValues.length > 0) {
      axios.put("http://localhost:8001/api/admin/material/change-status", {
        id: checkedValues
      })
        .then((response) => {
          if (response.data._status == true) {
            setApiStatus(!apiStatus);
            setCheckedValues([]);
            toast.success(response.data._message);
          } else {
            toast.error(response.data._message);
          }

        })
        .catch(() => {
          toast.error('Somthing went wrong!');
        })
    }
  };

  return (
    <>
      <Breadcrumb
        path={"Material"}
        Link={"/materials/view"}
        path2={"View"}
        slash={"/"}
      />
      <div className="w-full h-[610px]">
        <div className="max-w-[1220px] mx-auto py-2">
          <div
            className={`rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"
              }`}
          >

            <div className="relative max-w-sm">
              <input
                type="text"
                id="simple-search"
                onKeyUp={searching}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Name"
              />
            </div>

          </div>

          <div className="w-full min-h-[610px]">
            <div className="max-w-[1220px] mx-auto py-5">
              <div className="flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                <h3 className="text-[26px] font-semibold">View Material</h3>
                <div className="flex justify-between ">
                  <div
                    onClick={() => setactiveFilter(!activeFilter)}
                    className="cursor-pointer mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {activeFilter ? (
                      <FaFilter className="text-[18px]" />
                    ) : (
                      <MdFilterAltOff className="text-[18px]" />
                    )}
                  </div>

                  <button
                    onClick={changeStatus}
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Change Status
                  </button>
                  <button
                    onClick={deleteRecord}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="border border-t-0 rounded-b-md border-slate-400">
                <div className="relative overflow-x-auto">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-center text-gray-700">
                      <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                onClick={getallvalueid}
                                checked={
                                  checkedValues.length == viewMeterial.length
                                }
                                id="checkbox-all-search"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="checkbox-all-search"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3"> Material Name </th>
                          <th scope="col" className="w-[12%]">Order </th>
                          <th scope="col" className="w-[11%]">Status</th>
                          <th scope="col" className="w-[6%]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewMeterial.length > 0 ? (
                          viewMeterial.map((value, index) => {
                            return (
                              <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-50 transition text-gray-700"
                              >
                                <td className="w-4 p-4">
                                  <div className="flex items-center">
                                    <input
                                      onChange={() => getValueId(value._id)}
                                      checked={checkedValues.includes(
                                        value._id
                                      )}
                                      id="checkbox-table-search-1"
                                      type="checkbox"
                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                      htmlFor="checkbox-table-search-1"
                                      className="sr-only"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </td>
                                <th
                                  scope="row"
                                  className="flex items-center px-6 py-4 whitespace-nowrap "
                                >
                                  <div className="py-4">
                                    <div className="text-base font-semibold">
                                      {value.name}
                                    </div>
                                  </div>
                                </th>
                                <td className="px-6 py-4">1</td>
                                <td className="py-4">
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
                                <td className="py-4">
                                  <Link to={`/material/update/${value._id}`}>
                                    <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                      <MdModeEdit className="text-[18px]" />
                                    </div>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className=" py-4 text-center" colSpan={6}>
                              <b>No Record Found !!</b>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
