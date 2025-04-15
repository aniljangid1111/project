import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import navIcon from '../../public/download.svg'
import category from '../../public/category.svg'
import { LuRockingChair } from 'react-icons/lu'
import { GoLightBulb } from 'react-icons/go'
import { FiPhone } from 'react-icons/fi'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import headerCrown from './../../public/header-crown.svg';

const SideNavbar = ({ issidenav, setissidenav }) => {

  return (
    <div className={`side-nav fixed top-0 ${issidenav ? 'left-0' : 'left-[-100%]'} duration-500 h-full min-w-[60vw]  bg-white lg:hidden pt-2.5  font-[inter,sans-serif] z-[9999]  `}>
      <div className='mb-2'>
        <span onClick={() => setissidenav(false)}
          className='text-2xl absolute top-2 right-[10px] z-20 duration-300 cursor-pointer  '>
          <RxCross2 />
        </span>
      </div>

      <div className=' border-b-1 border-gray-500'>
        <figure className='max-w-[250px] ps-4 pb-2 items-start'>
          <img className='max-w-[160px]' src="../../public/main-logo.svg" alt="" />
        </figure>
      </div>


      <div className='ps-4 relative h-full'>
        <nav className='h-full '>
          <ul className='flex flex-col gap-6 text-[14px] cursor-pointer pt-3 capitalize'>
            <li> <button className=' flex items-center gap-2 text-[20px] cursor-pointer'>
              <img src={headerCrown} alt="crown" className='max-w-[15px]' />
              <span className=' text-[14px] text-[#FF8C00] hover:text-[#EC6B6C]'> Upgrade Pro </span> </button> </li>
            <li className='text-gray-500 text-[14px] m-0 p-0 font-[500]'>links</li>
            <li className='text-[#202223] hover:text-[#EC6B6C] flex gap-2'><img src={navIcon} alt="NavIcon" className='w-[18px] text-[#202223] hover:text-[#EC6B6C]' />Home</li>
            <li className='text-[#202223] hover:text-[#EC6B6C]  flex gap-2'><span className='text-lg'><LuRockingChair /></span>  Explore</li>
            <li className='text-[#202223] hover:text-[#EC6B6C]  flex gap-2'><img src={category} alt="category" />Category</li>
            <li className='text-[#202223] hover:text-[#EC6B6C]  flex gap-2'><span className='text-lg'><IoIosInformationCircleOutline /></span> About Us</li>
            <li className='text-[#202223] hover:text-[#EC6B6C]  flex gap-2'><span className='text-lg'><GoLightBulb /></span> FAQ'S</li>
            <li className='text-[#202223] hover:text-[#EC6B6C]  flex gap-2'><span className='text-lg'><FiPhone /></span> Contact Us</li>
          </ul>
        </nav>
      </div>
      <div className='absolute bottom-[10%] w-[100%] text-center'>
        <button className='capitalize text-center text-[14px] font-[400] p-[7px_45px] bg-[#315399] border-1 border-[#315399] cursor-pointer text-white  rounded hover:bg-white hover:text-[#315399] duration-200 hover:scale-[1.1]'>
          sign in

        </button>
      </div>


    </div>
  )
}

export default SideNavbar