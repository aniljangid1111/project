import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";

export default function ProductDetails() {
  let [categories, setCategories] = useState([]);
  let [subCategories, setSubCategories] = useState([]);
  let [idCheckvalue, setidCheckvalue] = useState(null);
  let [flag, setFlag] = useState("");
  let [color, setColor] = useState([]);
  let [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [productId, setProductId] = useState("");
  // productID hidden value ke leyy


const formHandlerr = (event) => {
    event.preventDefault();
    const form = event.target;

    // Prepare FormData
    const formData = new FormData(form);

    // Set the size_ids correctly
    const sizeIds = selectedSizes.map((size) => size.value);
    formData.set("size_ids", JSON.stringify(sizeIds)); // Ensure this is separate

    // Log formData for debugging
    console.log([...formData]); // Check what is being sent

    // Check if productId is set correctly
    // const productId = form._id.value; // This should be a single value
    const productId = form._id?.value;
    if (productId) {
        // Update logic
        axios.put(`http://localhost:8400/api/admin/product/update/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((success) => {
            // Handle success
             toast.success(success.data.message);
        })
        .catch((error) => {
            // Handle error
             toast.error('error')
        });
    } else {
        // Create logic
        axios.post("http://localhost:8400/api/admin/product/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((success) => {
            // Handle success
             toast.success(success.data.message);
        })
        .catch((error) => {
            // Handle error
            toast.error('error')
        });
    }
};


  useEffect(() => {
    axios
      .post("http://localhost:8400/api/admin/size", {
        limit: 5,
      })
      .then((success) => {
        if (success.data.status === true) {
          const newArray = success.data.data.map((size) => ({
            ...size,
            value: size._id,
            label: size.name,
          }));

          setSizes(newArray);
        } else {
          setSizes([]);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong !!");
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8400/api/admin/category", {
        limit: 200,
        status: true,
      })
      .then((success) => {
        if (success.data.status === true) {
          setCategories(success.data.data);
        } else {
          setCategories([]);
        }
      })
      .catch(() => {
        toast.error("Something went wrong !!");
      });
  }, []);

  useEffect(() => {
    if (idCheckvalue != undefined) {
      axios
        .post("http://localhost:8400/api/admin/sub-Category", {
          root_id: idCheckvalue,
        })
        .then((success) => {
          if (success.data.status === true) {
            setSubCategories(success.data.data);
          } else {
            setSubCategories([]);
          }
        })
        .catch(() => {
          toast.error("Something went wrong !!");
        });
    }
  }, [flag]);

  useEffect(() => {
    axios
      .post("http://localhost:8400/api/admin/color")
      .then((success) => {
        if (success.data.status === true) {
          setColor(success.data.data);
        } else {
          setColor([]);
        }
      })
      .catch(() => {
        toast.error("Something went wrong !!");
      });
  }, []);

  const Idget = (event) => {
    setFlag(!flag);
    setidCheckvalue(event.target.value);
  };

  return (
    <section className="w-full">
      <Breadcrumb path={"Product"} path2={"Product Details"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Product Details
          </h3>
          <form
          // in case a image not upload in formpage to do use this line encType="multipart/from-data use "
            onSubmit={formHandlerr}
            className="border border-t-0 p-3 rounded-b-md border-slate-400"
          >
            {/* Hidden input for product ID */}
            {productId && <input type="hidden" name="_id" value={productId} />}

            {/* ... rest of your form inputs ... */}
            {/* Add hidden input for id */}
            {/* <input type="hidden" name="_id" value="" /> */}
            <div className="flex gap-2 w-[100%]">
              <div className="mb-5 w-[50%]">
                <label
                  htmlFor="default"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                  Select Parent Category
                </label>

                <select
                  id="default"
                  name="categroy_id"
                  className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  onChange={Idget}
                  defaultValue=""
                >
                  <option value="" disabled>
                    --Select Parent Category--
                  </option>
                  {categories.map((v) => {
                    return (
                      <option key={v._id} value={v._id}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-5 w-[50%]">
                <label
                  htmlFor="default"
                  className="block mb-5 text-md font-medium text-gray-900"
                >
                  Select Sub Category
                </label>

                <select
                  id="default"
                  name="sub_categroy_id"
                  className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  defaultValue=""
                >
                  <option value="" disabled>
                    --Select Sub Category--
                  </option>
                  {subCategories.map((v) => {
                    return (
                      <option key={v._id} value={v._id}>
                        {v.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mb-5">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Size
                  </label>

                  <Select
                    value={selectedSizes}
                    onChange={setSelectedSizes}
                    options={sizes}
                    isMulti
                    name="size_ids"
                    closeMenuOnSelect={false}
                  />
                </div>
                <div>
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Color
                  </label>
                  <select
                    id="default"
                    name="color_id"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      --Select Color--
                    </option>
                    {color.map((v) => {
                      return (
                        <option key={v._id} value={v._id}>
                          {v.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Product Name"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Product Description
              </label>
              <textarea
                name="description"
                id="message"
                rows="3"
                className="resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Add Product Description....."
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Short Description
              </label>
              <textarea
                name="short_description"
                id="message"
                rows="3"
                className="resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Add Product Short Description....."
              ></textarea>
            </div>
            <div className="mb-5">
              <label
                htmlFor="file-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Product Image
              </label>
              <div className="max-w-full">
                <label htmlFor="file-input" className="sr-only">
                  Choose file
                </label>
                <input
                  type="file"
                  name="image"
                  id="file-input"
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none   file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                  accept="image/*"
                />
              </div>
              <div className="max-w-full">
                <label htmlFor="file-input" className="sr-only">
                  Choose file
                </label>
                <input
                  type="file"
                  name="images"
                  id="file-input"
                  className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none   file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                  multiple
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Price
                  </label>
                  <input
                    type="text"
                    name="sale_price"
                    id="base-input"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                    placeholder="Product Price"
                  />
                </div>
                <div>
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    MRP
                  </label>
                  <input
                    type="text"
                    name="actual_price"
                    id="base-input"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                    placeholder="Product MRP"
                  />
                </div>
              </div>
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
