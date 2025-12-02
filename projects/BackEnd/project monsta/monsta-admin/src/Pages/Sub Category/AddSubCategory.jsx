  import React, { useEffect, useState } from "react";
  import $ from "jquery";
  import "dropify/dist/css/dropify.min.css";
  import "dropify/dist/js/dropify.min.js";
  import Breadcrumb from "../../common/Breadcrumb";
  import { useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import { toast } from "react-toastify";

  export default function AddSubCategory() {

    const params = useParams();
    const updateId = params.id;
    const navigate = useNavigate();
    const [categoryDetails, setCategoryDetails] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    const [parentCategory, setParentCategory] = useState('');
    const [category, setCategory] = useState([]);

    useEffect(() => {
      const dropifyElement = $("#image"); // Select by id

      if (dropifyElement.data("dropify")) {
        dropifyElement.data("dropify").destroy();
        dropifyElement.removeData("dropify");
      }

      // Replace with new element
      dropifyElement.replaceWith(
        `<input type="file" accept="image/*" name="image" id="image" class="dropify" data-height="250" data-default-file="${imageUrl}" />`
      );

      // Re-initialize dropify
      $("#image").dropify();
    }, [imageUrl]);


    const filterParentCategory = (event) => setParentCategory(event.target.value);


    useEffect(() => {
      axios
        .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_CATEGORY_VIEW, {
          limit: 100,
          status: 1,
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
      if (updateId) {
        axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_DETAILS + updateId)
          .then((response) => {
            if (response.data._status == true) {
              const data = response.data._data;
              setCategoryDetails(data);
              setImageUrl(response.data._image_path + response.data._data.image)

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

      if (!updateId) {
        // Create category
        axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_CREATE, event.target)
          .then((response) => {
            if (response.data._status == true) {
              toast.success(response.data._message);
              navigate('/category/sub-category/view');
            } else {
              toast.error(response.data._message);

              for (var value of response.data._data) {
                toast.error(value);
              }

            }
          })
          .catch(() => {
            toast.error('Something went wrong');
          })
      } else {
        //Update category
        axios.put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_UPDATE + updateId, event.target)
          .then((response) => {
            if (response.data._status == true) {
              toast.success(response.data._message);
              navigate('/category/sub-category/view');
            } else {
              toast.error(response.data._message);

              for (var value of response.data._data) {
                toast.error(value);
              }
            }
          })
          .catch(() => {
            toast.error('Something went wrong');
          })
      }

    }



    return (
      <section className="w-full">
        <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"Add"} slash={"/"} />
        <div className="w-full min-h-[610px]">
          <div className="max-w-[1220px] mx-auto py-5">
            <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
              {updateId ? "Update Sub Category" : "Add Sub Category"}
            </h3>
            <form onSubmit={formHandler} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
              <div className="flex gap-5">
                <div className="w-1/3">
                  <label
                    htmlFor="categoryImage"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    data-default-file={imageUrl + categoryDetails.image}
                    id="image"
                    className="dropify"
                    data-height="250"
                  />
                </div>

                <div className="w-2/3">
                  {/* Parent Category Dropdown */}
                  <div className="mb-5">
                    <label className="block  text-md font-medium text-gray-900">
                      Parent Category Name
                    </label>
                    <select
                      onChange={filterParentCategory}
                      value={parentCategory || categoryDetails.parent_category_id || ""}  // <- this is key
                      name="parent_category_id"
                      className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    >

                      <option value="">Select Category</option>
                      {
                        category.map((v, i) => (
                          <option key={v._id} value={v._id}>{v.name}</option>
                        ))
                      }

                    </select>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="categoryName"
                      name="name"
                      defaultValue={categoryDetails.name}
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder="Category Name"
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-gray-900"
                    >
                      Order
                    </label>
                    <input
                      type="text"
                      name="order"
                      id="categoryName"
                      defaultValue={categoryDetails.order}
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder="Category Order"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {updateId ? "Update Sub Category" : "Add Sub Category"}
              </button>
            </form>


          </div>
        </div>
      </section>
    );
  }
