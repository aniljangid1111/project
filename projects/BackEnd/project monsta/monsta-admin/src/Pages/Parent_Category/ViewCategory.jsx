import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';


export default function ViewCategory() {
  let [activeFilter, setactiveFilter] = useState(true);
  const [category, setCategory] = useState([]);
  const [searchName, setSearchname] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);
  const [imageUrl, setImageUrl] = useState('')
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_CATEGORY_VIEW, {
        name: searchName,
        page: currentPage,
      })
      .then((response) => {
        if (response.data._status === true) {
          setCategory(response.data._data);
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
    if (checkedValues.length === category.length) {
      setCheckedValues([]);
    } else {
      setCheckedValues(category.map((v) => v._id));
    }
  };
  const changeStatus = () => {
    if (checkedValues.length > 0) {
      axios
        .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_CATEGORY_STATUS, {
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
          .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_CATEGORY_DELETE, {
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
      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={""} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Category</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">View</span>
            </div>
          </li>
        </ol>
      </nav>



      <div className={` rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

        <form className="flex max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              onKeyUp={searching}
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Name"
              required
            />
          </div>
        </form>


      </div>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View Category
            </h3>
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
          <div className="border border-t-0 rounded-b-md border-slate-400">

            {/* border-2 border-[red] */}
            <div className="relative overflow-x-auto">


              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input onClick={getAllValues}
                            checked={checkedValues.length === category.length}

                            id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-left">
                        Name
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Image
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[10%]">
                        Status
                      </th>
                      <th scope="col" class="w-[10%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      category.length > 0
                        ?
                        category.map((value, index) => {
                          return (
                            <tr key={index} class="bg-white    border-gray-200 hover:bg-gray-50 ">
                              <td class="w-4 p-4">
                                <div class="flex items-center">
                                  <input
                                    onClick={() => getValue(value._id)}
                                    checked={checkedValues.includes(value._id)}
                                    id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                              </td>
                              <td scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">

                                <div class="py-4">
                                  <div class="text-base font-semibold">{value.name}</div>

                                </div>
                              </td>
                              <td className="py-4">
                                <div className="flex justify-center items-center">
                                  <img
                                    onClick={() => {
                                      setPreviewImage(imageUrl + value.image);
                                      setShowModal(true);
                                    }}
                                    className="w-20 h-12 rounded object-cover cursor-pointer hover:scale-105 transition"
                                    src={imageUrl + value.image}
                                    alt="Category"
                                  />
                                </div>
                              </td>


                              <td class="  py-4">
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
                              <td className="py-4">
                                <div className="flex justify-center items-center">
                                  <Link to={`/category/update/${value._id}`}>
                                    <div className="rounded-full w-10 h-10 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800">
                                      <MdModeEdit className="text-[18px]" />
                                    </div>
                                  </Link>
                                </div>
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

      {/* image view */}
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



    </section>
  )
}
