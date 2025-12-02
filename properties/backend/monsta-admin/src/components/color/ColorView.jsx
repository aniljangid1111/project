import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { MdOutlineAirplanemodeInactive } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ColorView() {
  var [colors, setColors] = useState([]);

  const [searchName, setSearchName] = useState('')
  const [showEditModal, setShowEditModal] = useState(false);
  const [toalRecords, SetTotalRecords] = useState('')
  const [checkedValue, setCheckedValue] = useState([])
  const [changeApiStatus, setChangeApiStatus] = useState(true)

  const toggleFilterModal = () => setShowEditModal(!showEditModal);

  useEffect(() => {
    axios.post('http://localhost:8001/api/admin/color/view', {
      name: searchName
    })
      .then((response) => {
        if (response.data._status == true) {
          setColors(response.data._data);
          SetTotalRecords(response.data._paggination.total_records)
        } else {
          setColors([])
          toast.error(response.data._message)
        }

      })
      .catch(() => {
        toast.error("Somthing Went Wrong!!")
      })
  }, [searchName, changeApiStatus])

  const searchfiltername = (event) => {
    setSearchName(event.target.value);
  }

  const getCheckedId = (id) => {

    if (checkedValue.includes(id)) {
      var data = checkedValue.filter((v, i) => {
        if (v != id) {
          return v;
        }
      })
      console.log(data);
      setCheckedValue([...data])


    } else {
      var data = [...checkedValue, id];
      console.log(data)
      setCheckedValue(data);
    }
  }
  const getAllCheckedId = () => {
    var dataids = []
    if (checkedValue.length == colors.length) {
      setCheckedValue([])
    } else {

      colors.map((v) => {
        dataids.push(v._id)
      })
      setCheckedValue([...dataids]);

    }
    console.log(dataids)
  }

  const changestatuse = () => {
    if (checkedValue.length > 0) {
      axios.put('http://localhost:8001/api/admin/color/change-status', {
        id: checkedValue
      })
        .then((response) => {
          if (response.data._status == true) {

            setChangeApiStatus(!changeApiStatus)
            setCheckedValue([])
            toast.success(response.data._message)

          } else {
            toast.error(response.data._message)
          }

        })
        .catch(() => {
          toast.error('Somthing Went Wrong!!')
        })
    }
    else {
      toast.error('Select one Record to change status')
    }
  }

  const deleteRecords = () => {
    if (confirm('Are you sure to delete record?')) {
      if (checkedValue.length > 0) {
        axios.put('http://localhost:8001/api/admin/color/delete', {
          id: checkedValue
        })
          .then((response) => {
            if (response.data._status == true) {

              setChangeApiStatus(!changeApiStatus)
              setCheckedValue([])
              toast.success(response.data._message)

            } else {
              toast.error(response.data._message)
            }

          })
          .catch(() => {
            toast.error('Somthing Went Wrong!!')
          })
      }
      else {
        toast.error('Select one Record to Delete ')
      }
    }

  }






  return (
    <div className="p-6 bg-[#F1F4F5]  text-[#76838F]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Color Listing</h2>
          <div className="flex">
            <Link to={"/dashboard/dashboardhome"}>
              {" "}
              <p className="text-sm text-blue-500 mt-1">Dashboard </p>{" "}
            </Link>{" "}
            <span className="ms-1 "> / Admins</span>
          </div>
        </div>

      </div>

      {/* Filters */}
      {showEditModal && (
        <div className="flex ms-2 mt-2">
          <div className="ms-2 mb-1">
            <span>Search:</span>
            <input onKeyUp={searchfiltername}
              type="text"
              placeholder="Search"
              className="ms-2 border-2 rounded-[8px] p-1 cursor-pointer"
            />
          </div>
        </div>

      )
      }

      {/* Table Section */}
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        {/* Table */}
        <div className="p-6">
          <div className="flex justify-between my-2 ">
            <div><h2 className="text-xl font-bold mb-4">Color List</h2></div>
            {/* <div><h4 className="text-xl font-bold mb-4">total Record-</h4> {toalRecords}<span></span></div> */}
            <div className="space-x-3 flex">
              <button
                onClick={toggleFilterModal}
                className="w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
              >
                {showEditModal ? (
                  <MdOutlineAirplanemodeInactive />
                ) : (
                  <IoMdAirplane />
                )}
              </button>
              <button
                onClick={changestatuse}
                className=" bg-green-500 px-4 text-white rounded shadow-lg flex items-center justify-center hover:bg-green-600 transition cursor-pointer"
              >
                Change Status
              </button>
              <button
                onClick={deleteRecords}
                className=" bg-red-500 px-5 text-white rounded shadow-lg flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="">
                    <input onChange={getAllCheckedId}
                      checked={checkedValue.length === colors.length}
                      type="checkbox" />
                  </th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Order</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  colors.length > 0
                    ?
                    colors.map((color, index) => (
                      <tr key={index} className="border-b text-center hover:bg-gray-50">
                        <td className="p-2">
                          <input
                            onChange={() => getCheckedId(color._id)}
                            checked={checkedValue.includes(color._id)}
                            type="checkbox" />
                        </td>
                        <td className="p-2">{color.name}</td>
                        <td className="p-2">{color.code}</td>
                        <td className="p-2">{color.order}</td>
                        <td className="p-2">
                          {
                            color.status == 1
                              ?
                              <button className="bg-green-500 text-white text-xs px-4 py-1 rounded cursor-pointer">
                                Active
                              </button>
                              :
                              <button className="bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer">
                                Deactive
                              </button>
                          }


                        </td>
                        <td className="p-2">
                          <button className="text-blue-500 hover:text-blue-700 cursor-pointer" >
                            <Link to={`/add-color/${color._id}`}>
                              <FaEdit />
                            </Link>
                          </button>
                        </td>
                      </tr>
                    ))
                    :
                    <tr className="border-b text-center hover:bg-gray-50">
                      <td className="p-2">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2 text-center" colSpan={6}>No Record Found...</td>


                    </tr>

                }

              </tbody>
            </table>

          </div>



        </div>
      </div>
    </div >
  );
}
