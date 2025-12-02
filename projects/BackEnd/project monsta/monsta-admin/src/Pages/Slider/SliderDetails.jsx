import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";

export default function SliderDetails() {



  const params = useParams();
  const updateId = params.id;
  const navigate = useNavigate();
  const [sliderDetails, setSliderDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);


  useEffect(() => {
    if (updateId) {
      axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SLIDER_DETAILS + updateId)
        .then((response) => {
          if (response.data._status == true) {
            const data = response.data._data;
            setSliderDetails(data);
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
      axios.post(import.meta.env.VITE_API_URL + import.meta.env.VITE_SLIDER_CREATE, event.target)
        .then((response) => {
          if (response.data._status == true) {
            toast.success(response.data._message);
            navigate('/slider/view');
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
      axios.put(import.meta.env.VITE_API_URL + import.meta.env.VITE_SLIDER_UPDATE + updateId, event.target)
        .then((response) => {
          if (response.data._status == true) {
            toast.success(response.data._message);
            navigate('/slider/view');
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

  // Dropzone setup
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const uploaded = acceptedFiles[0];
      setFile(uploaded);
      setPreview(URL.createObjectURL(uploaded));
    },
  });






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
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateId ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateId ? "Update Silder" : "Add Slider"}
          </h3>
          <form onSubmit={formHandler} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <div
                  {...getRootProps({
                    className:
                      "border-2 flex justify-center item-center my-2 w-full h-60 border-dashed rounded-lg  text-center cursor-pointer",
                  })}
                >
                  <input {...getInputProps({name:'image'})} />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      name='image'
                      className="mx-auto max-h-60 object-contain"
                    />
                  ) : imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Existing"
                      name='image' 
                      className="mx-auto my-0 max-h-60 object-contain"
                    />
                  ) : (
                    <p>Drag & drop image here, or click to select</p>
                  )}
                </div>


              </div>
              <div className="w-2/3">
                <div className="mb-5">
                  <label
                    htmlFor="Title"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="Title"
                    name="title"
                    defaultValue={sliderDetails.title}
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    defaultValue={sliderDetails.order}
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateId ? "Update Slider" : "Add Slider"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
