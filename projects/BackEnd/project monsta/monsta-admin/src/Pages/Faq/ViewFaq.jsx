

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ViewFaq() {

  let [faq, setfaq] = useState([])
  const [checkedValues, setCheckedValues] = useState([]);
  const [apiStatus, setApiStatus] = useState(true);


  useEffect(() => {
    axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_FAQ_VIEW)
      .then((response) => {
        if (response.data._status == true) {
          setfaq(response.data._data)
        } else {
          setfaq([])
          toast.error(response.data._message)
        }
      })
      .catch(() => {
        toast.error('Somthing Went Wrong!!')
      })

  }, [apiStatus])

  const getvalue = (id) => {
    if (checkedValues.includes(id)) {
      setCheckedValues(checkedValues.filter((v) => v !== id));
    } else {
      setCheckedValues([...checkedValues, id])
    }
  };

  const getallvalue = () => {
    if (checkedValues.length === faq.length) {
      setCheckedValues([]);
    } else {
      setCheckedValues(faq.map((v) => v._id))
    }
  }

  const changeStatus = () => {
    if (checkedValues.length > 0) {
      axios.put(import.meta.env.VITE_API_URL + import.meta.env.VITE_FAQ_STATUS, {
        id: checkedValues,
      })
        .then((response) => {
          if (response.data._status === true) {
            setApiStatus(!apiStatus);
            setCheckedValues([]);
            toast.success(response.data._message)
          } else {
            toast.error(response.data._message)
          }

        })
        .catch(() => {
          toast.error("Something went wrong !");
        })
    } else {
      toast.error("Please select At lest one record!!")
    }
  }
  const deleteRecords = () => {
    if (checkedValues.length > 0) {
      if (window.confirm("Are you sure you want to delete?")) {

        axios.put(import.meta.env.VITE_API_URL + import.meta.env.VITE_FAQ_DELETE, {
          id: checkedValues,
        })
          .then((response) => {
            if (response.data._status === true) {
              setApiStatus(!apiStatus);
              setCheckedValues([]);
              toast.success(response.data._message)
            } else {
              toast.error(response.data._message)
            }

          })
          .catch(() => {
            toast.error("Something went wrong !");
          })
      }
    }
    else {
      toast.error("Please select At lest one record!!")
    }
  }

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
              <Link to={"/faq/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Faq</Link>
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


      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View Country
            </h3>
            <div className='flex justify-between '>
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

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input id="checkbox-all-search"
                            onClick={getallvalue}
                            checked={checkedValues.length === faq.length}
                            type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Question
                      </th>

                      <th scope="col" class=" w-[40%] ">
                        Answer
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
                      faq.length > 0
                        ?
                        faq.map((v, i) => {
                          return (
                            <tr key={i} class="bg-white    border-gray-200 hover:bg-gray-50 ">
                              <td class="w-4 p-4">
                                <div class="flex items-center">
                                  <input
                                    onClick={() => getvalue(v._id)}
                                    checked={checkedValues.includes(v._id)}
                                    id="checkbox-table-search-1" type="checkbox" className="accent-blue-600 rounded" />
                                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                              </td>
                              <th scope="row" class="flex items-center px-6 py-4 text-gray-900  ">
                                <div class="py-4">
                                  <div class="text-base font-semibold">{v.question}</div>

                                </div>
                              </th>

                              <td class=" py-4 mr-10">
                                {v.answer}
                              </td>
                              <td class=" py-4">
                                {v.order}
                              </td>
                              <td class=" py-4">
                                {
                                  v.status == 1
                                    ?
                                    (
                                      <span className="inline-block px-5 py-1 text-center text-sm rounded-full bg-green-200 text-green-700">
                                        Active
                                      </span>
                                    )
                                    :
                                    (
                                      <span className="inline-block px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                                        Deactive
                                      </span>
                                    )

                                }

                              </td>
                              <td class=" py-4">

                                <Link to={`/faq/update/${v._id}`} >
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



    </section>
  )
}
