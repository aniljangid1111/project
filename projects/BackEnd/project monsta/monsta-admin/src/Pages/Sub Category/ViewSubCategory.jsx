import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { MdModeEditOutline } from "react-icons/md";

export default function ViewCategory() {
  let [activeFilter, setactiveFilter] = useState(true);
  const [subCategory, setSubCategory] = useState([]);
  const [searchName, setSearchname] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);
  const [imageUrl, setImageUrl] = useState('')
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [parentCategory, setParentCategory] = useState('');
  const [category, setCategory] = useState([]);

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
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_VIEW, {
        name: searchName,
        page: currentPage,
        parent_category_id: parentCategory
      })
      .then((response) => {
        if (response.data._status === true) {
          setSubCategory(response.data._data);
          setTotalPages(response.data._paggination.total_page)
          setImageUrl(response.data._image_path)
        } else {
          setCategory([]);
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [searchName, apiStatus, currentPage, parentCategory]);

  const searching = (event) => setSearchname(event.target.value);
  const filterParentCategory = (event) => setParentCategory(event.target.value);

  const getValue = (id) => {
    if (checkedValues.includes(id)) {
      setCheckedValues(checkedValues.filter((v) => v !== id));
    } else {
      setCheckedValues([...checkedValues, id]);
    }
  };
  const getAllValues = () => {
    if (checkedValues.length === category.length) {
      setCheckedValues([]);
    } else {
      setCheckedValues(category.map((v) => v._id));
    }
  };
  const changeStatus = () => {
    if (checkedValues.length > 0) {
      axios
        .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_STATUS, {
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
          .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_DELETE, {
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

      <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"View"} slash={"/"} />

      <div className={`rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

        <form className="grid grid-cols-[40%_35%_5%] gap-[1%] items-center ">
          <div className="">

            <select onChange={filterParentCategory}
              name="parentCatSelectBox"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
            >
              <option value="">Select Parent Category</option>
              {
                category.map((v, i) => {
                  return (
                    <option value={v._id}>{v.name}</option>
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


              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            onClick={getAllValues}
                            checked={checkedValues.length === subCategory.length}
                            id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Parent Category Name
                      </th>
                      <th scope="col" class="px-0 py-3">
                        Sub Category Name
                      </th>

                      <th scope="col" class=" w-[12%] ">
                        Image
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[10%]  ">
                        Status
                      </th>
                      <th scope="col" class="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      subCategory.length > 0
                        ?
                        subCategory.map((value, index) => {
                          return (


                            < tr key={index} class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td class="w-4 p-4">
                                <div class="flex items-center">
                                  <input
                                    onClick={() => getValue(value._id)}
                                    checked={checkedValues.includes(value._id)}
                                    id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                              </td>
                              <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                <div class="py-4">
                                  {value.parent_category_id}

                                </div>
                              </td>
                              <td class=" py-4">
                                {value.name}

                              </td>

                              <td class=" py-4">
                                <img class="w-10 h-10 rounded-full"
                                  onClick={() => {
                                    setPreviewImage(imageUrl + value.image);
                                    setShowModal(true);
                                  }}
                                  src={imageUrl + value.image} alt="Jese image" />
                              </td>
                              <td class=" py-4">
                                {value.order}
                              </td>
                              <td class=" py-4">
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
                              <td class=" py-4">
                                <Link to={`/category/sub-category/update/${value._id}`} >
                                  <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
      </div>



    </section >
  )
}
