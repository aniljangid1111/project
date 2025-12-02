
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Addmaterials() {
  const params = useParams()
  const updateId = params.id;
  const navigate = useNavigate();
  const [materialDetails, setMaterialDetails] = useState('');

  useEffect(() => {
    if (updateId) {
      axios.post(`http://localhost:8001/api/admin/material/details/${updateId}`)
        .then((response) => {
          if (response.data._status == true) {
            const data = response.data._data;
            setMaterialDetails(data);
          } else {
            toast.error(response.data._message);
            for (var value of response.data._data) {
              toast.info(value);
            }
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  }, [updateId]);

  const formHandler = (event) => {
    event.preventDefault();
    console.log(event.target.name.value)
    const data = {
      name: event.target.name.value,
      order: event.target.order.value,
    }
    console.log(data)

    if (!updateId) {
      // Create material
      axios.post('http://localhost:8001/api/admin/material/create', data)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            event.target.reset();

            // navigate('/material/view');
          } else {
            toast.error(result.data._message);

            for (var value of result.data._data) {
              toast.error(value);
            }

          }
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
    } else {
      //Update Color
      axios.put('http://localhost:8001/api/admin/material/update/' + updateId, data)
        .then((result) => {
          if (result.data._status == true) {
            toast.success(result.data._message);
            navigate('/material/view');
          } else {
            toast.error(result.data._message);

            for (var value of result.data._data) {
              toast.error(value);
            }

          }
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
    }
  }




  // update work
  const [updateIdState, setUpdateIdState] = useState(false)
  useEffect(() => {
    if (updateId == undefined) {
      setUpdateIdState(false)
    }
    else {
      setUpdateIdState(true)
    }
  }, [updateId])



  return (
    <section className="w-full">
      <Breadcrumb path={"Material"} path2={updateIdState ? "Update" : "Add"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateIdState ? "Update Material" : "Add Material"}
          </h3>
          <form onSubmit={formHandler} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">

            <div className="">
              <div className="mb-5">
                <label
                  htmlFor="Name"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="Name" defaultValue={materialDetails.name}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Material Name"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="order"
                  className="block  text-md font-medium text-gray-900"
                >
                  Order
                </label>
                <input
                  type="number" defaultValue={materialDetails.order}
                  id="order"
                  name="order"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder="Order"
                />
              </div>
            </div>

            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateId ? "Update Material" : "Add Material"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
