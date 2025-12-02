import React from "react";



const ExploreCategories = () => {

    return (
        <div className="my-2">
            <h1 className="text-center lg:text-[35px] text-[25px] font-[700] text-[#202223] capitalize  font-[Merriweather,serif]">Explore Categories</h1>

            <div className="font-[inter,serif] grid lg:grid-cols-6 grid-cols-2 items-center  gap-4 lg:gap-8 lg:py-20 py-10 max-w-[1360px] mx-auto px-[20px]">
                <div className=" max-w-[200px] h-[200px] rounded-xl overflow-hidden border-1 border-gray-200 shadow-lg shadow-gray-300 mx-auto text-center capitalize ">
                    <figure className="rounded-xl overflow-hidden"><img src="../../public/slider1.jpg" alt="" /></figure>
                    <h5 className="my-2 lg:text-lg text-[14px]">Living Room</h5>
                </div>
                <div className=" max-w-[200px] h-[200px] rounded-xl overflow-hidden border-1 border-gray-200 shadow-lg shadow-gray-300 mx-auto text-center capitalize ">
                    <figure className="rounded-xl overflow-hidden"><img src="../../public/slider2.jpg" alt="" /></figure>
                    <h5 className="my-2 lg:text-lg text-[14px]">Dinning Area</h5>
                </div>
                <div className=" max-w-[200px] h-[200px] rounded-xl overflow-hidden border-1 border-gray-200 shadow-lg shadow-gray-300 mx-auto text-center capitalize ">
                    <figure className="rounded-xl w-full overflow-hidden"><img src="../../public/slider3.jpg" alt="" /></figure>
                    <h5 className="my-2 lg:text-lg text-[14px]">Bedroom</h5>
                </div>
                <div className=" max-w-[200px] h-[200px] rounded-xl overflow-hidden border-1 border-gray-200 shadow-lg shadow-gray-300 mx-auto text-center capitalize ">
                    <figure className="rounded-xl overflow-hidden"><img src="../../public/slider4.jpg" alt="" /></figure>
                    <h5 className="my-2 lg:text-lg text-[14px]">Wardrobe Designs</h5>
                </div>
                <div className=" max-w-[200px] h-[200px] rounded-xl overflow-hidden border-1 border-gray-200 shadow-lg shadow-gray-300 mx-auto text-center capitalize ">
                    <figure className="rounded-xl overflow-hidden"><img src="../../public/slider5.jpg" alt="" /></figure>
                    <h5 className="my-2 lg:text-lg text-[14px]">TV Unit Design</h5>
                </div>
                <div className=" max-w-[200px] h-[200px] rounded-xl overflow-hidden border-1 border-gray-200 shadow-lg shadow-gray-300 mx-auto text-center capitalize ">
                    <figure className="rounded-xl overflow-hidden"><img src="../../public/slider6.jpg" alt="" /></figure>
                    <h5 className="my-2 lg:text-lg text-[14px]">Bedroom Design</h5>
                </div>
            </div>
            <div className="text-center mb-10"><button className='capitalize p-[8px_30px] text-[16px] font-[700] bg-[#315399] border-1 border-[#315399] cursor-pointer text-white  rounded-lg  hover:bg-white hover:text-[#315399] duration-100'>
                see all</button>
            </div>
        </div>
    )
}


export default ExploreCategories