import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function ViewCategory() {

  let [activeFilter, setactiveFilter] = useState(true);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [searchName, setSearchname] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);
  const [imageUrl, setImageUrl] = useState('')
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [parentCategory, setParentCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [category, setCategory] = useState([]);
  const [subItem, setSubItem] = useState([]);

  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_CATEGORY_VIEW, {
        limit: 100,
        // status:1,
      })
      .then((response) => {
        if (response.data._status === true) {
          setCategory(response.data._data);
        } else {
          setCategory([]);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_VIEW, {
        limit: 100,
        // status:1,
      })
      .then((response) => {
        if (response.data._status === true) {
          setSubItem(response.data._data);
        } else {
          setSubItem([])
          // toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_VIEW, {
        name: searchName,
        page: currentPage,
        parent_category_id: parentCategory,
        sub_category_id: subCategory,
      })
      .then((response) => {
        if (response.data._status === true) {
          setSubSubCategory(response.data._data);
          setTotalPages(response.data._paggination.total_page)
          setImageUrl(response.data._image_path)
        } else {
          setSubSubCategory([]);
          // toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [searchName, apiStatus, currentPage, parentCategory, subCategory]);

  const searching = (event) => setSearchname(event.target.value);

  const filterParentCategory = (event) => {
    setParentCategory(event.target.value);

  }
  // const filterParentCategory = (event) => {
  //   const { name, value } = event.target;
  //   if (name === "parentCatSelectBox") {
  //     setParentCategory(value);
  //   } else if (name === "subCatSelectBox") {
  //     setSubCategory(value);
  //   }
  // }
  const filtersubCategory = (event) => {
    setSubCategory(event.target.value);
  }

  const getValue = (id) => {
    if (checkedValues.includes(id)) {
      setCheckedValues(checkedValues.filter((v) => v !== id));
    } else {
      setCheckedValues([...checkedValues, id]);
    }
  };
  const getAllValues = () => {
    if (checkedValues.length === subSubCategory.length) {
      setCheckedValues([]);
    } else {
      setCheckedValues(subSubCategory.map((v) => v._id));
    }
  };
  const changeStatus = () => {
    if (checkedValues.length > 0) {
      axios
        .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_STATUS, {
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
          .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_DELETE, {
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

      <Breadcrumb path={"Sub Sub Category"} link={'/category/sub-sub-category/view'} path2={"View"} slash={"/"} />

      <div className={`rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>
        <form className="grid grid-cols-[20%__20%_35%_5%] gap-[1%] items-center ">
          <div className="">
            <select onChange={filterParentCategory}
              name="parentCatSelectBox"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
            >
              <option value="">Select Parent Category</option>
              {
                category.map((v, i) => {
                  return (
                    <option key={i} value={v._id}>{v.name}</option>
                  )
                })
              }
            </select>
          </div>

          <div className="">
            <select onChange={filtersubCategory}
              name="subCatSelectBox"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
            >
              <option value="">Select Sub Category</option>
              {
                subItem.map((v, i) => {
                  return (
                    <option key={i} value={v._id}>{v.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="">
            <input
              type="text"
              id="simple-search"
              onKeyUp={searching}
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
              placeholder="Search  name..."
              required
            />
          </div>
          <div className=''>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
      </div>


      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View Sub Category
            </h3>
            <div className='flex justify-between '>
              <button
                onClick={() => setactiveFilter(!activeFilter)} className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"  >
                {activeFilter ? <FaFilter /> : <MdFilterAltOff />}
              </button>

              <button
                onClick={changeStatus} className="px-4 mx-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition" >
                Change Status
              </button>
              <button onClick={deleteRecords} className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition">
                Delete
              </button>
            </div>
          </div>
          <div className="border border-t-0 rounded-b-md border-slate-400">

            {/* border-2 border-[red] */}
            <div className="relative overflow-x-auto">


              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            onChange={getAllValues}
                            checked={checkedValues.length === subSubCategory.length}
                            id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500    focus:ring-2" />
                          <label htmlFor="checkbox-all-search" className="sr-only ">checkbox</label>
                        </div>
                      </th>

                      <th scope="col" className="px-0 py-3">
                        Parent Category
                      </th>
                      <th scope="col" className="px-0 py-3">
                        Sub Category
                      </th>
                      <th scope="col" className="px-0 py-3">
                        Category Name
                      </th>
                      <th scope="col" className=" w-[12%] ">
                        Image
                      </th>
                      <th scope="col" className=" w-[10%] ">
                        Order
                      </th>
                      <th scope="col" className="w-[10%]  ">
                        Status
                      </th>
                      <th scope="col" className="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      subSubCategory.length > 0
                        ?
                        subSubCategory.map((value, index) => {
                          return (

                            < tr key={index} className="bg-white border-gray-200 hover:bg-gray-50 ">
                              <td className="w-4 p-4">
                                <div className="flex items-center">
                                  <input
                                    onClick={() => getValue(value._id)}
                                    checked={checkedValues.includes(value._id)}
                                    id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                              </td>
                              <td scope="row" className=" px-6 py-4 text-gray-900 ">
                                <div className="py-4  ">
                                  {value.parent_category_id?.name}
                                </div>
                              </td>

                              <td className=" py-4">
                                {value.sub_category_id?.name}
                              </td>
                              <td className=" py-4">
                                {value.name}
                              </td>

                              <td className=" py-4">
                                <img
                                  onClick={() => {
                                    setPreviewImage(imageUrl + value.image);
                                    setShowModal(true);
                                  }}
                                  className="w-20 h-12 rounded object-cover cursor-pointer hover:scale-105 transition"
                                  src={imageUrl + value.image} alt="Jese image" />
                              </td>
                              <td className=" py-4">
                                {value.order}
                              </td>
                              <td className=" py-4">
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
                              <td className=" py-4">

                                <Link to={`/category/sub-sub-category/update/${value._id}`} >
                                  <div className="rounded-[50%] text-white w-[40px] h-[40px] flex items-center justify-center bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <MdModeEdit className='text-[18px]' />
                                  </div>
                                </Link>
                              </td>
                            </tr>

                          )
                        })

                        :
                        <tr>
                          <td colSpan="6" className="text-center py-6 text-gray-500 font-medium">
                            No records found.
                          </td>
                        </tr>
                    }
                  </tbody>
                </table>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-[90%] max-h-[90%]">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
            <div className="text-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}



    </section >
  )
}
