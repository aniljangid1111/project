import React, { useEffect, useState } from 'react'
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ProductDetails() {

  const params = useParams();
  const updateId = params.id;
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [meterial, setMeterial] = useState([]);

  // image
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

  useEffect(() => {
    const dropifyElement = $("#photos");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="photos" id="photos"
            class="dropify" data-height="250" data-default-file="${imageUrl}"  multiple = "multiple"/>`
    );

    // **Reinitialize Dropify**
    $("#photos").dropify();

  }, []);


  // metrial view
  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_METERIALS_VIEW, {
        limit: 100,
        status: 1,
      })
      .then((response) => {
        if (response.data._status === true) {
          setMeterial(response.data._data);
        } else {
          setMeterial([]);
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);
  // Color view
  useEffect(() => {
    axios
      .post(import.meta.env.VITE_API_URL + import.meta.env.VITE_COLORS_VIEW, {
        limit: 100,
        status: 1,
      })
      .then((response) => {
        if (response.data._status === true) {
          setColors(response.data._data);
        } else {
          setColors([]);
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, []);

  // Category view
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
      axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCTS_DETAILS + updateId)
        .then((response) => {
          if (response.data._status == true) {
            const data = response.data._data;
            setProductDetails(data);
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
      axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCTS_CREATE, event.target)
        .then((response) => {
          if (response.data._status == true) {
            toast.success(response.data._message);
            navigate('/product/view');
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
      axios.put(import.meta.env.VITE_API_URL + import.meta.env.VITE_PRODUCTS_UPDATE + updateId, event.target)
        .then((response) => {
          if (response.data._status == true) {
            toast.success(response.data._message);
            navigate('/product/view');
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
  const getSubCategories = (event) => {
    const categoryId = event.target.value;

    axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_VIEW, {
      limit: 100,
      parent_category_id: categoryId,
      status: 1,
    })
      .then((response) => {
        if (response.data._status === true) {
          setSubCategory(response.data._data);
        } else {
          setSubCategory([]);
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };


  const getSubSUbCategories = (event) => {
    const categoryId = event.target.value;
    axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_VIEW, {
      limit: 100,
      sub_category_ids: categoryId,
      status: 1,
    })
      .then((response) => {
        if (response.data._status === true) {
          setSubSubCategory(response.data._data);
        } else {
          setSubSubCategory([]);
          toast.error(response.data._message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (productDetails.long_description) {
      setValue(productDetails.long_description);
    }
  }, [productDetails]);

  // product details load hone ke baad sub aur subsub bhi fetch karo
  useEffect(() => {
    if (productDetails && productDetails.parent_category_ids) {
      // Sub category fetch
      axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_CATEGORY_VIEW, {
        limit: 100,
        parent_category_id: productDetails.parent_category_ids,
        status: 1,
      })
        .then((res) => {
          if (res.data._status) {
            setSubCategory(res.data._data);

            // Agar product me pehle se sub_category_ids h to subSub bhi laa lo
            if (productDetails.sub_category_ids && productDetails.sub_category_ids.length > 0) {
              axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SUB_SUB_CATEGORY_VIEW, {
                limit: 100,
                sub_category_ids: productDetails.sub_category_ids,
                status: 1,
              })
                .then((subsubRes) => {
                  if (subsubRes.data._status) {
                    setSubSubCategory(subsubRes.data._data);
                  }
                });
            }
          }
        });
    }
  }, [productDetails]);




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
              <Link to={"/product/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateId ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>



      <div className='w-full px-6 py-6  '>

        <form onSubmit={formHandler}>
          <div className='grid grid-cols-2 gap-6 items-start'>
            {/* First Column */}
            <div className="w-full">
              {/* Product Image */}
              <div className="">
                <label htmlFor="ProductImage" className="block text-md font-medium text-[#76838f]">
                  Product Image
                </label>
                <input
                  name="image"
                  type="file"
                  id="image"
                  className="dropify"
                  data-height="160"
                  data-default-file={imageUrl}
                />
                {/* Hidden input to keep old image when not replaced */}
                <input type="hidden" name="old_image" value={productDetails.image} />
              </div>

              {/* Gallery Images */}
              <div className="">
                <label htmlFor="GalleryImage" className="block text-md font-medium text-[#76838f]">
                  Gallery Image
                </label>
                <input
                  type="file"
                  name="photos[]"
                  id="photos"
                  multiple
                  className="dropify"
                  data-height="160"
                  data-default-file={productDetails.photos ? productDetails.photos.map(p => imageUrl + p).join(',') : ""}
                />
                {/* Hidden input to keep old gallery when not replaced */}
                <input type="hidden" name="old_photos" value={JSON.stringify(productDetails.photos)} />
              </div>

            </div>

            {/* Second Column */}
            <div className="w-full">
              <div className='for-inputs'>
                <div className='grid grid-cols-2 gap-2'>
                  {/* name */}
                  <div className="">
                    <label
                      htmlFor="Prodct_Name"
                      className="text-md font-medium text-[#76838f]"
                    >
                      Prodct Name
                    </label>
                    <input
                      type="text"
                      defaultValue={productDetails.name}
                      name='name'
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder='Prodct Name'
                    />
                  </div>
                  {/* product_code */}
                  <div className="">
                    <label
                      html-for="Prodct_code"
                      className="text-md font-medium text-[#76838f]"
                    >
                      Prodct Code
                    </label>
                    <input
                      type="text" defaultValue={productDetails.product_code} name='product_code'
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder='Prodct Code'
                    />
                  </div>
                  {/* parent category */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Select Parent Category
                    </label>
                    <select name='parent_category_ids' onChange={getSubCategories}
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      {
                        category.map((v, i) => {
                          return (
                            <option key={i} value={v._id}
                              selected={productDetails.parent_category_ids && productDetails.parent_category_ids.includes(v._id) ? "selected" : ""}

                            >{v.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  {/* sub category */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Select Sub Category
                    </label>
                    <select onChange={getSubSUbCategories} name='sub_category_ids[]' multiple="multiple"
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Select Category</option>

                      {
                        subCategory.map((v, i) => {
                          return (
                            <option key={i} value={v._id}
                              selected={productDetails.sub_category_ids && productDetails.sub_category_ids.includes(v._id) ? "selected" : ""}

                            >{v.name}</option>
                          )

                        })
                      }
                    </select>
                  </div>
                  {/* sub sub category */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Select Sub Sub Category
                    </label>
                    <select name='sub_sub_category_ids[]' multiple="multiple"
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      {
                        subSubCategory.map((v, i) => {
                          return (
                            <option key={i} value={v._id}
                              selected={productDetails.sub_sub_category_ids && productDetails.sub_sub_category_ids.includes(v._id) ? "selected" : ""}

                            >{v.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>

                  {/* colors */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Select Color
                    </label>
                    <select name='colors_ids'
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      {
                        colors.map((v, i) => {
                          return (

                            <option key={i} value={v._id}
                              selected={productDetails.colors_ids && productDetails.colors_ids.includes(v._id) ? 'selected' : ''}
                            > {v.name}</option>
                          )
                        })
                      }

                    </select>
                  </div>

                  {/* METERIALS */}

                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Select Meterial
                    </label>
                    <select name='material_ids'
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>

                      {
                        meterial.map((v, i) => {
                          return (
                            <option key={i} value={v._id}
                              selected={productDetails.material_ids && productDetails.material_ids.includes(v._id) ? 'selected' : ''}

                            >{v.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  {/* is feature */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Is Feature
                    </label>
                    <select
                      name='is_feature'
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      <option value="1" selected={
                        productDetails.is_feature === 1 ? "selected" : ""
                      } >Yes</option>
                      <option value="2" selected={
                        productDetails.is_feature === 2 ? "selected" : ""
                      }>No</option>
                    </select>
                  </div>

                  {/*  Is New Arrivals */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Is New Arrivals
                    </label>
                    <select
                      name='is_new_arrivals'
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      <option value="1" selected={
                        productDetails.is_new_arrivals === 1 ? "selected" : ""
                      } >Yes</option>
                      <option value="2" selected={
                        productDetails.is_new_arrivals === 2 ? "selected" : ""
                      }>No</option>
                    </select>
                  </div>

                  {/* on sell */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Is Onsell
                    </label>
                    <select
                      name='is_onsale'
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      <option value="1" selected={
                        productDetails.is_onsale === 1 ? "selected" : ""
                      } >Yes</option>
                      <option value="2" selected={
                        productDetails.is_onsale === 2 ? "selected" : ""
                      }>No</option>
                    </select>
                  </div>

                  {/* is best selling */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Is Best Selling
                    </label>
                    <select
                      name='is_best_selling'
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      <option value="1" selected={
                        productDetails.is_best_selling === 1 ? "selected" : ""
                      } >Yes</option>
                      <option value="2" selected={
                        productDetails.is_best_selling === 2 ? "selected" : ""
                      }>No</option>
                    </select>
                  </div>

                  {/* is_upsell */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Is Upsell                    </label>
                    <select
                      name='is_upsell'
                      className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300  text-sm rounded-lg block w-full py-2.5 px-3">
                      <option value="">Nothing Selected</option>
                      <option value="1" selected={
                        productDetails.is_upsell === 1 ? "selected" : ""
                      } >Yes</option>
                      <option value="2" selected={
                        productDetails.is_upsell === 2 ? "selected" : ""
                      }>No</option>
                    </select>
                  </div>

                  {/*   Product Dimension */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-[#76838f]"
                    >
                      Product Dimension
                    </label>
                    <input
                      type="text"
                      name='product_dimension'
                      defaultValue={productDetails.product_dimension}
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder='Product Dimension'
                    />
                  </div>

                  {/*  Estimate Delivery Days  */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Estimate Delivery Days
                    </label>
                    <input
                      type="text"
                      name='estimate_delivery_days'
                      defaultValue={productDetails.estimate_delivery_days}
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder='Estimate Delivery Days'
                    />
                  </div>

                  {/* actual Price */}

                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-[#76838f]"
                    >
                      Actual Price
                    </label>
                    <input
                      type="text"
                      name='actual_price'
                      defaultValue={productDetails.actual_price}
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder='Product Dimension'
                    />
                  </div>

                  {/* sale price */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium text-[#76838f]"
                    >
                      Sale Price
                    </label>
                    <input
                      type="text"
                      name='sale_price'
                      defaultValue={productDetails.sale_price}
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder='Product Dimension'
                    />
                  </div>


                  {/* order */}
                  <div className="">
                    <label
                      htmlFor="categoryName"
                      className="block  text-md font-medium  text-[#76838f]"
                    >
                      Order
                    </label>
                    <input
                      type="text"
                      name='order'
                      defaultValue={productDetails.order}
                      className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                      placeholder='Order'
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>


          <div className='grid grid-cols-2'>
            <div>
              <div className='py-[40px]'>
                <label
                  htmlFor="categoryImage"
                  className="block  text-md font-medium  text-[#76838f]"
                >
                  Short Description
                </label>
                <textarea
                  name='short_description'
                  defaultValue={productDetails.short_description}
                  className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Enter Short Description"
                ></textarea>
              </div>
            </div>

            <div className='py-[40px]'>
              <label
                htmlFor="categoryImage"
                className="block  text-md font-medium  text-[#76838f]"
              >
                Description
              </label>
              <ReactQuill theme="snow" value={value} onChange={setValue} className='h-[200px]' />

            </div>
            <input type="hidden" name='long_description' value={value} />

          </div>



          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
            {updateId ? "Update Product " : "Add Product"}
          </button>

        </form>

      </div >
    </section >
  )
}

