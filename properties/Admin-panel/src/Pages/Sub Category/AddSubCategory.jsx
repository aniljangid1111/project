import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import {   useNavigate, useParams } from "react-router-dom";
import imagetry from "../../../src/assets/image/basetry.jpg";

export default function AddSubCategory() {

 const navigate=useNavigate();

  const params = useParams();
  let [categories, setCategories] = useState([]);
  let [subCategoryDetails, setSubCategoryDetails] = useState("");
  let [ImageUrl, setImageUrl] = useState("");
  let [previewImage, setPreviewImage] = useState(""); 

  

  useEffect(() => {
    axios
      .post("http://localhost:8400/api/admin/category", {
        limit: 200,
        status: true,
      })
      .then((success) => {
        if (success.data.status == true) {
          setCategories(success.data.data);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong !!");
      });
  }, []);

  useEffect(() => {

    if (params.id != null) {
      axios
        .post(
          `http://localhost:8400/api/admin/sub-Category/details/${params.id}`
        )
        .then((result) => {

          if (result.data.status == true) {
            
            setSubCategoryDetails(result.data.data);
            setImageUrl(result.data.Base_Url);
            setPreviewImage(result.data.Base_Url + result.data.data.image); 
          }
        })
        .catch((error) => {
          toast.error("Something went wrong !!");
        });
    }
  }, []);
  const formHandler = (event) => {
    event.preventDefault();

    if (event.target._id.value == "") {
      axios
        .post("http://localhost:8400/api/admin/sub-Category/add", event.target)
        .then((success) => {
          if (success.data.status == true) {
            event.target.reset();
            setPreviewImage("");
            toast.success(success.data.message);
            navigate("/sub-category/view-sub-category");
          } else {
            toast.error(success.data.message);
          }
        })
        .catch((error) => {
          toast.error("Something went wrong !!");
        });
    } else {
      axios
        .put(
          `http://localhost:8400/api/admin/sub-Category/update/${event.target._id.value}`,
          event.target
        )
        .then((success) => {
          if (success.data.status == true) {
            event.target.reset();
            setPreviewImage("");
            toast.success(success.data.message);
            navigate("/sub-category/view-sub-category");
            setSubCategoryDetails("");
          } else {
            toast.error(success.data.message);
          }
        })
        .catch((error) => {
          toast.error("Something went wrong !!");
        });
    }
  };

 

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file)); // Set preview image
    }
  };



  return (
    <section className="w-full">
      <Breadcrumb
        path={"Sub Category"}
        path2={params.id != null ? "Update sub-Category" : "Add sub-Category"}
        slash={"/"}
      />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {params.id != null ? "Update sub-Category" : "Add sub-Category"}
          </h3>

          <form
            className="border border-t-0 p-3 rounded-b-md border-slate-400"
            onSubmit={formHandler}
            enctype="multipart/form-data"
          >
            <input type="hidden" value={subCategoryDetails._id} name="_id" />
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                selete category
              </label>

              <select
                id="default"
                name="parent_id"
                className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              >
                <option value="" selected>
                  --Select Category--
                </option>
                {categories.map((v, i) => {
                  return (
                    <option
                      value={v._id}
                      selected={subCategoryDetails.root_id == v._id ? "selected" : ""}> 
                     {v.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Category Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={subCategoryDetails.name}
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Category Name"
              />
            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Feauter_category
              </label>

              <select
                id="default"
                name="feature_category"
                className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              >
                <option value="" selected>
                  --Select Category--
                </option>
                <option
                  value="Yes"
                  selected={
                    subCategoryDetails.feature_category == "Yes"
                      ? "selected"
                      : ""
                  }
                >
                  Yes
                </option>
                <option
                  value="No"
                  selected={
                    subCategoryDetails.feature_category == "No"
                      ? "selected"
                      : ""
                  }
                >
                  No
                </option>
              </select>
            </div>

            <div className="mb-5 ">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Image
              </label>
              <div className="max-w-full flex gap-[130px]">
                <div className="w-[70%]">
                  <label for="file-input" className="sr-only">
                    Choose file
                  </label>
                  <input
                    type="file"
                    defaultValue={subCategoryDetails.image}
                    name="image"
                    onChange={handleImageChange}
                    id="file-input"
                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none   file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 "
                    
                  />
                </div>
                <div className="w-[200px]   h-[150px] border-2">
                {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full "
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                </div>
              </div>
              <div className=""></div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block   text-md font-medium text-gray-900"
              >
                Order
              </label>
              <input
                type="number"
                min={1}
                name="order"
                defaultValue={subCategoryDetails.order}
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Order"
              />
            </div>

            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}




 
                                                  
              