import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
export default function Newsletters() {
    let [activeFilter, setactiveFilter] = useState(true);

    const [newsLetter, setNewsLetter] = useState([])
    const [checkedValues, setCheckedValues] = useState([])
    const [apiStatus, setApiStatus] = useState(true);
    const [search, setSearch] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');


    useEffect(() => {
        axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_NEWSLETTER_VIEW,
            {
                email: search,
                page: currentPage,
                limit: 10
            }
        )
            .then((response) => {
                if (response.data._status == true) {
                    setNewsLetter(response.data._data)
                    setTotalPages(response.data._paggination.total_page)

                } else {
                    setNewsLetter([])
                    toast.error(response.data._message)
                }
            })
            .catch(() => {
                toast.error('Somthing Went Wrong!!')
            })
    }, [apiStatus, search, currentPage])

    const getallvalue = () => {
        if (checkedValues.length === newsLetter.length) {
            setCheckedValues([]);
        } else {
            setCheckedValues(newsLetter.map((v) => v._id))
        }
    }
    const getvalue = (id) => {
        if (checkedValues.includes(id)) {
            setCheckedValues(checkedValues.filter((v) => v !== id));
        } else {
            setCheckedValues([...checkedValues, id])
        }
    }
    const searching = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value)

    }

    const changeStatus = () => {
        if (checkedValues.length > 0) {
            axios.put(import.meta.env.VITE_API_URL + import.meta.env.VITE_NEWSLETTER_STATUS, {
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

                axios.put(import.meta.env.VITE_API_URL + import.meta.env.VITE_NEWSLETTER_DELETE, {
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
                            <Link to={""} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">News Letter</Link>
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

                <form onSubmit={searching} className="flex max-w-sm">
                    <div className="relative w-full">
                        <input
                            type="text"
                            name='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            id="simple-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Name"
                            required
                        />
                    </div>
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
                </form>


            </div>
            <div className="w-full min-h-[610px]">
                <div className="max-w-[1220px] mx-auto py-5">
                    <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
                        <h3 className="text-[26px] font-semibold" >
                            Newsletters Management
                        </h3>
                        <div className='flex justify-between '>
                            <div onClick={() => setactiveFilter(!activeFilter)} className="cursor-pointer text-[white] mx-3 rounded-[50%] w-[40px] h-[40px]  mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center  text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {activeFilter ? <FaFilter className='text-[18px]' /> : <MdFilterAltOff className='text-[18px]' />}
                            </div>
                            <div className='flex gap-2 justify-between '>
                                <button
                                    onClick={changeStatus} className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition" >
                                    Change Status
                                </button>
                                <button onClick={deleteRecords} className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition">
                                    Delete
                                </button>
                            </div>
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
                                                        onClick={getallvalue}
                                                        checked={checkedValues.length === newsLetter.length}
                                                        id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col" class="  ">
                                                Email Id
                                            </th>
                                            <th scope="col" class="w-[11%]">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            newsLetter.length > 0
                                                ?
                                                newsLetter.map((v, i) => {
                                                    return (
                                                        <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td class="w-4 p-4">
                                                                <div class="flex items-center">
                                                                    <input
                                                                        onClick={() => getvalue(v._id)}
                                                                        checked={checkedValues.includes(v._id)}
                                                                        id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                                </div>
                                                            </td>
                                                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                                                <div class="py-4">
                                                                    <div class="text-base font-semibold">{v.email}</div>

                                                                </div>
                                                            </th>
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

                                                                }                                                            </td>
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

        </section>
    )
}

