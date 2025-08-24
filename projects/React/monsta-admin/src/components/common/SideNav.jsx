// import { initFlowbite } from 'flowbite';
import { FaChartPie, FaUserFriends } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa6';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoDocumentTextOutline, IoLogoWechat } from 'react-icons/io5';
import { MdWaterDrop } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from '../../../public/monstalogo.png';

export default function SideNav() {
  return (
    <>
      <div className=''>

        <aside id="sidebar-multi-level-sidebar" class="w-[100%] h-[100vh]  z-40  transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">

          <div class="h-full   bg-gray-50 dark:bg-gray-800">
            <div className='bg-[#3E8EF7] h-[65px] py-2 w-full m-0 p-0  '>
              <figure className=' w-[130px] ms-6 relative'>
                <img src={logo} alt="" className='w-[100%]' />
              </figure>
              <span className='text-white absolute left-[35%] text-[18px] top-[2]'>
                Furniture
              </span>
            </div>
            <ul class="space-y-2 px-3 py-4  text-[14px]">
              <li className='active text-white  hover:text-white group  transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'>
                <Link to="/" class="flex  items-center p-2 ">
                  <FaChartPie />
                  <span class="ms-3">Dashboard</span>
                </Link>
              </li>
              <li >
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <FaUserFriends />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">User Management</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="dropdown-example" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/admin-listing" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Admin</Link>
                  </li>
                  <li>
                    <Link to="/user-details" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">User</Link>
                  </li>
                </ul>
              </li>
              <li >
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="colors-drop" data-collapse-toggle="colors-drop">
                  <MdWaterDrop />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Colors</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="colors-drop" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/view-color" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Color</Link>
                  </li>
                  <li>
                    <Link to="/add-color" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Color</Link>
                  </li>
                </ul>
              </li>
              <li >
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="materials-drop" data-collapse-toggle="materials-drop">
                  <MdWaterDrop />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Materials</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="materials-drop" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/view-material" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Material</Link>
                  </li>
                  <li>
                    <Link to="/add-material" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Material</Link>
                  </li>
                </ul>
              </li>
              {/* Parent category */}
              <li >
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="parentCategory-drop" data-collapse-toggle="parentCategory-drop">
                  <MdWaterDrop />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Parent Categorys</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="parentCategory-drop" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/view-category" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Category</Link>
                  </li>
                  <li>
                    <Link to="/add-category" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Category</Link>
                  </li>
                </ul>
              </li>
              {/* Sub Categories */}
              <li >
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="subCategory-drop" data-collapse-toggle="subCategory-drop">
                  <MdWaterDrop />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Sub Categorys</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="subCategory-drop" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/view-subCategory" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Category</Link>
                  </li>
                  <li>
                    <Link to="/add-subCategory" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Category</Link>
                  </li>
                </ul>
              </li>
              {/* Sub Sub category */}
              <li >
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="subSubCategory-drop" data-collapse-toggle="subSubCategory-drop">
                  <MdWaterDrop />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Sub Sub Categorys</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="subSubCategory-drop" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/view-Sub-subCategory" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Category</Link>
                  </li>
                  <li>
                    <Link to="/add-Sub-subCategory" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Category</Link>
                  </li>
                </ul>
              </li>
              {/* Product  */}
              <li >
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="product-drop" data-collapse-toggle="product-drop">
                  <MdWaterDrop />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Products</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="product-drop" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/view-product" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Product</Link>
                  </li>
                  <li>
                    <Link to="/add-product" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Product</Link>
                  </li>
                </ul>
              </li>


              {/* country */}
              <li>
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-location" data-collapse-toggle="dropdown-location">
                  <FaLocationArrow />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Countries</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="dropdown-location" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/add-country" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Countrie</Link>
                  </li>
                  <li>
                    <Link to="/view-country" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Countrie</Link>
                  </li>
                </ul>
              </li>

              {/* Enquirys */}
              <li>
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="Enquirys" data-collapse-toggle="Enquirys">
                  <HiOutlineAdjustmentsHorizontal />

                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Enquirys</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="Enquirys" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="contact-enquirys" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Contact Enquirys</Link>
                  </li>
                  <li>
                    <Link to="newssletters" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Newssletters</Link>
                  </li>
                </ul>
              </li>

              <li>
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="Configuration" data-collapse-toggle="Configuration">
                  <HiOutlineAdjustmentsHorizontal />

                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Configuration</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="Configuration" class="hidden py-2 space-y-2">
                  <li>
                    <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Payment Gateways</a>
                  </li>
                  <li>
                    <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Configuration</a>
                  </li>
                </ul>
              </li>

              {/* Faqs */}
              <li>
                <button type="button" class="flex items-center w-full p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-Faqs" data-collapse-toggle="dropdown-Faqs">
                  <IoLogoWechat />
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Faqs</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <ul id="dropdown-Faqs" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/add-faqs" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Faqs</Link>
                  </li>
                  <li>
                    <Link to="/view-faqs" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View Faqs</Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IoDocumentTextOutline />

                  <span class="ms-3">CMS Pages</span>
                </a>
              </li>

            </ul>
          </div>
        </aside>


      </div>

    </>
  )
}
