import React from 'react'

const DesignDefine = () => {
    return (
        <div className='lg:pb-[400px] mb-[50px] relative font-[Merriweather,serif]'>

            <div className=" w-full lg:h-110 h-80 bg-gradient-to-t  via- from-[#315399] via-[#315399] via-100%  to-[#ffffff] bg-[100%] mx-auto  p-3">
                <div className='flex justify-center my-3'>
                    <h1 className='bg-white rounded-2xl text-[#315399] lg:text-[35px] text-[22px] font-[700] text-center inline-block   py-2 px-7 mx-auto'>Designs That Define You</h1>
                </div>

                <div className='container lg:max-w-[960px] max-w-[500px] m-auto rounded-2xl overflow-hidden lg:p-5.5 p-4 bg-white my-5 z-[999] shadow-2xl shadow-[#315399]'>
                    <img src="../../public/benefits_title_image.jpg" alt="img" className='max-w-[100%] mx-auto ' />

                </div>
            </div>
            <div className='lg:bg-[url(../../public/box-dots.svg)] bg-no-repeat py-20 absolute bottom-0 left-0 w-40 h-30 backgrou'> </div>
        </div>




    )
}

export default DesignDefine