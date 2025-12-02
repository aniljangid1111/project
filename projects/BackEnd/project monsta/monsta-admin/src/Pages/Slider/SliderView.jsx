import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { MdFilterAltOff, MdModeEdit } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SliderView() {
  let [activeFilter, setactiveFilter] = useState(true);

  const [slider, Setslider] = useState([]);
  const [slidetImage, setSliderImage] = useState('')
  const [checkedValues, setCheckedValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);
  const [searchName, setSearchname] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  useEffect(() => {
    axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SLIDER_VIEW, {
      title: searchName,
      page: currentPage,
    })
      .then((response) => {
        if (response.data._status == true) {
          Setslider(response.data._data)
          setSliderImage(response.data._image_path);
          setTotalPages(response.data._paggination.total_page)

        } else {
          Setslider([])
          toast.error(response.data._message)
        }
      })
      .catch(() => {
        toast.error("Something Went Wrong!")
      })
  }, [apiStatus, currentPage, searchName])

  const getValue = (id) => {
    if (checkedValues.includes(id)) {
      setCheckedValues(checkedValues.filter((v) => v !== id));
    } else {
      setCheckedValues([...checkedValues, id])
    }

  }
  const getAllValue = () => {
    if (checkedValues.length === slider.length) {
      setCheckedValues([]);
    } else {
      setCheckedValues(slider.map((v) => v._id))
    }

  }
  const changeStatus = () => {
    if (checkedValues.length > 0) {
      axios
        .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SLIDER_STATUS, {
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
          .put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SLIDER_DELETE, {
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

  const searching = (event) => setSearchname(event.target.value);


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
              <Link to={"/slider/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Slider</Link>
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
              View Slider
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

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            onClick={getAllValue}
                            checked={checkedValues.length === slider.length}
                            id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Image
                      </th>
                      <th scope="col" class=" w-[8%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[11%]">
                        Status
                      </th>
                      <th scope="col" class="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      slider.length > 0
                        ?
                        slider.map((v, i) => {
                          return (
                            <tr key={i} class="bg-white   border-gray-200 hover:bg-gray-50 ">
                              <td class="w-4 p-4">
                                <div class="flex items-center">
                                  <input
                                    onClick={() => getValue(v._id)}
                                    checked={checkedValues.includes(v._id)}
                                    id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                              </td>
                              <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">

                                <div class="py-4">
                                  <div class="text-base font-semibold"> {v.title}</div>

                                </div>
                              </th>
                              <td class=" py-4">
                                <img
                                  onClick={() => {
                                    setPreviewImage(slidetImage + v.image);
                                    setShowModal(true);
                                  }}
                                  class="w-10 h-10 rounded-full" src={slidetImage + v.image} alt="Jese image" />
                              </td>
                              <td class=" py-4">
                                {v.order}
                              </td>
                              <td class=" py-4">
                                {v.status == 1 ? (
                                  <span className="inline-block px-5 py-1 text-center text-sm rounded-full bg-green-200 text-green-700">
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                                    Deactive
                                  </span>
                                )}                              </td>
                              <td class=" py-4">

                                <Link to={`/slider/update/${v._id}`} >
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
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />


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
