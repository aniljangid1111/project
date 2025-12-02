import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios, { toFormData } from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "flowbite-react";

export default function ViewSubCategory() {
  const params = useParams();
  const [first, setfirst] = useState(1);
  const [ImageUrl, setImageurl] = useState("");
  const [subCategories, setsubCategories] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    axios
      .post("http://localhost:8400/api/admin/sub-Category", {
        page: currentPage,
        limit: 200,
      })
      .then((success) => {
        if (success.data.status == true) {
          setsubCategories(success.data.data);
          setImageurl(success.data.Base_Url);
        } else {
          setsubCategories([]);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong !!");
      });
  }, [currentPage, first]);

  const selecthandler = (id) => {
    if (checkBox.includes(id)) {
      const data = checkBox.filter((v, i) => {
        if (v != id) {
          return v;
        }
      });
      setCheckBox(data);
    } else {
      setCheckBox([...checkBox, id]);
    }
  };

  let allSelecteBox = () => {
    if (checkBox.length != subCategories.length) {
      let data = [];
      subCategories.forEach((v) => {
        data.push(v._id);
      });
      setCheckBox([...data]);
    } else {
      setCheckBox([]);
    }
  };

  let deleteSelect = () => {
    if (checkBox.length > 0) {
      if (confirm("Are you want to delete ")) {
        axios
          .post(
            "http://localhost:8400/api/admin/sub-Category/delete",
            toFormData({ id: checkBox })
          )
          .then((success) => {
            if (success.data.status == true) {
              setCurrentPage(1);
              setfirst(!first);
              setCheckBox([]);
              toast.success(success.data.message);
            } else {
              toast.error(success.data.message);
            }
          })
          .catch((error) => {
            toast.error("Something went worng");
          });
      }
    } else {
      toast.error("Please selete product");
    }
  };

  let changestatus = () => {
    if (checkBox.length > 0) {
      axios
        .post(
          "http://localhost:8400/api/admin/category/change-status",
          toFormData({ id: checkBox })
        )
        .then((success) => {
          if (success.data.status == true) {
            setCurrentPage(1);
            setfirst(!first);
            setCheckBox([]);
            toast.success(success.data.message);
          } else {
            toast.error(success.data.message);
          }
        })
        .catch((error) => {
          toast.error("Something went worng");
        });
    } else {
      toast.error("please selete check box ");
    }
  };

  return (
    <section className="w-full">
      <Breadcrumb
        path={"Sub Category"}
        path2={"View Sub Category"}
        slash={"/"}
      />

      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className="  ms-2 flex gap-7">
            <div className="">
              {" "}
              <button
                type="submit"
                className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 
                
                dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={deleteSelect}
              >
                delete
              </button>
            </div>
            <div className="">
              {" "}
              <button
                type="submit"
                className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={changestatus}
              >
                change status
              </button>
            </div>
          </div>
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            View Sub Category
          </h3>
          <div className="border border-t-0 rounded-b-md border-slate-400">
            <div className="relative overflow-x-auto">
              <table className="w-full  text-left rtl:text-right text-gray-500 ">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6  flex  gap-3 items-center py-3"
                      width=" w-[50px] "
                    >
                      <input
                        name=" "
                        id="purple-checkbox"
                        type="checkbox"
                        value=""
                        checked={
                          checkBox.length == subCategories.length ? true : ""
                        }
                        className="w-4  h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 "
                        onChange={allSelecteBox}
                      />
                      Select All
                    </th>

                    <th scope="col" className="px-6 py-3  w-[100px] ">
                      S. No.
                    </th>
                    <th scope="col" className="px-1 py-3 ">
                      parent category name
                    </th>
                    <th scope="col" className="px-6 py-3   ">
                      name
                    </th>
                    <th scope="col" className="px-6 py-3   ">
                      Feauter_category
                    </th>
                    <th scope="col" className="px-6 py-3   ">
                      image
                    </th>
                    <th scope="col" className="px-6 py-3   ">
                      order
                    </th>

                    <th scope="col" className="px-6 py-3   ">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3   ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories.length > 0 ? (
                    subCategories.map((v, i) => {
                      return (
                        <tr className="bg-white border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap "
                          >
                            <input
                              name="deleteCheck"
                              id="purple-checkbox"
                              type="checkbox"
                              value=""
                              checked={checkBox.includes(v._id) ? true : ""}
                              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 "
                              onClick={() => selecthandler(v._id)}
                            />
                          </th>
                          <td className="px-6 py-4">{i + 1}</td>
                          <td className="px-6 py-4">{v.root_id.name}</td>
                          <td className="px-6 py-4">{v.name}</td>
                          <td className="px-6 py-4">{v.feature_category}</td>

                          <td className="px-6 py-4">
                            <img
                              className="w-16 h-16 rounded-md object-cover"
                              src={ImageUrl + v.image}
                              alt=""
                            />
                          </td>
                          <td className="px-6 py-4">{v.order}</td>
                          <td className="px-6 py-4">
                            {v.status ? "active" : "inactive"}
                          </td>
                          <td className="px-6 py-4 flex gap-3 mt-6">
                            <Link
                              to={`/sub-category/update-sub-category/${v._id}`}
                            >
                              <svg
                                fill="gold"
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="bg-white border-b">
                      <td
                        className="px-6  text-center text-red-600 font-bold py-4"
                        colSpan={9}
                      >
                        NO Record found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center  mt-3 ">
            <div className="flex overflow-x-auto sm:justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={100}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
