import React from 'react'
import { CiInstagram, CiTwitter } from 'react-icons/ci'
import { FaFacebookF } from 'react-icons/fa'
import { RiTelegram2Line } from 'react-icons/ri'


const FooterDpo = () => {
    return (
        <>
            <div className='bg-[#315399] w-full font-[Inter,sans-serif]'>
                <div className='max-w-[1370px] m-auto px-5 py-10   grid lg:grid-cols-4 gap-4  grid-cols-2 text-[#FFFFFF]'>
                    <div className='max-w-[220px] flex flex-wrap gap-4'>
                        <figure>
                            <img src="../../public/logoinwhite.svg" alt="logo" className='w-full cursor-pointer' />
                        </figure>
                        <div>
                            <h2 className='text-[22px]'>Download Our App</h2>
                            <figure className='max-w-[145px] '>
                                <img src="../../public/google.svg" alt="" className='w-full cursor-pointer' />
                            </figure>
                        </div>
                        <div className='icon flex gap-2 my-3 ' >
                            <div className='rounded-4xl border bg-transparent p-[7px] hover:bg-white hover:text-[#315399] text-[20px]'><FaFacebookF /></div>
                            <div className='rounded-4xl border bg-transparent p-[7px] hover:bg-white hover:text-[#315399] text-[20px]'><CiInstagram /></div>
                            <div className='rounded-4xl border bg-transparent p-[7px] hover:bg-white hover:text-[#315399] text-[20px]'> <CiTwitter /></div>
                            <div className='rounded-4xl border bg-transparent p-[7px] hover:bg-white hover:text-[#315399] text-[20px]'> <RiTelegram2Line /></div>
                        </div>

                    </div>
                    <div className=''>
                        <h1 className='capitalize  pb-5  font-[700] text-xl '>Category</h1>
                        <ul>
                            <li className='font-[500] text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='capitalize cursor-pointer'>1</button></li>
                            <li className='font-[500] text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='capitalize cursor-pointer'>2</button></li>
                            <li className='font-[500] text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='capitalize cursor-pointer'>3</button></li>
                            <li className='font-[500] text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='capitalize cursor-pointer'>4</button></li>

                        </ul>
                    </div>
                    <div className=''>
                        <h1 className='capitalize pb-5 font-[700] text-xl '>Company</h1>
                        <ul>
                            <li className='font-[500] capitalize text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='capitalize cursor-pointer'>blog</button></li>
                            <li className='font-[500] capitalize text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='capitalize cursor-pointer'>about us</button></li>
                            <li className='font-[500] capitalize text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='uppercase cursor-pointer'>faq's</button></li>
                            <li className='font-[500] capitalize text-[15px] hover:text-[#EC6B6C] pb-4 '><button className='capitalize cursor-pointer'>contact us</button></li>
                        </ul>
                    </div>
                    <div className=''>
                        <h1 className='capitalize pb-5 font-[700] text-xl '>Quick Links</h1>
                        <ul>
                            <li className='font-[500] capitalize text-[15px] hover:text-[#EC6B6C] pb-4  '><button className='capitalize cursor-pointer'>privcy policy</button></li>
                            <li className='font-[500] capitalize text-[15px] hover:text-[#EC6B6C] pb-4  '><button className='capitalize cursor-pointer'>term and condition</button></li>
                            <li className='font-[500] capitalize text-[15px] hover:text-[#EC6B6C] pb-4  '><button className='capitalize cursor-pointer'>refund policy</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full bg-[#FFFFFF]  font-[Inter,sans-serif]'>
                <div className='max-w-[1200px] m-auto px-5 py-5 flex justify-between  items-center'>
                    <div>
                        <p className='text-[#202223] text-[15px]'>© 2025 Blue city studio. All rights reserved</p>
                    </div>
                    <div>
                        <p className='text-[#202223] text-[15px]'>Design and Developed by <span className='text-[#315399] cursor-pointer'>Anil</span></p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FooterDpo