import React from 'react'
import '@fontsource/merriweather';
import BenifitLocalSection from './BenifitLocalSection';

const data=[
    {
        image:"./../../public/benefits_subimage_1.jpg",
        title:"Many options in all designs",
        icon:"./../../public/benefits_subimage_icon_11681880477.svg",
        button:"Explore Design",
    },
    {
        image:"./../../public/benefits_subimage_2.jpg",
        title:"High resolution 3D drawings",
        icon:"./../../public/benefits_subimage_icon_21681880477.svg",
        button:"Know More",
    },
    {
        image:"./../../public/benefits_subimage_3.jpg",
        title:"2D Measurements of per Drawing",
        icon:"./../../public/benefits_subimage_icon_31681880478.svg",
        button:"Viwe More",
    },
    {
        image:"./../../public/benefits_subimage_4.png",
        title:"Material list for cost calculation of furniture",
        icon:"./../../public/benefits_subimage_icon_41681880478.svg",
        button:"Viwe More",
    },
    {
        image:"./../../public/benefits_subimage_5.jpg",
        title:"Get daily latest designs updates",
        icon:"./../../public/benefits_subimage_icon_41681880478.svg",
        button:"Viwe More",
    }

]


const BenifitSection = () => {


    return (
        <div className='benifit-section font-[Merriweather,serif] py-[40px] w-full bg-[#FEF1F1] '>
            <div className='lg:max-w-[600px]   mx-auto bg-white rounded-xl items-center  lg:p-[15px] max-w-[400px] p-1'>
                <h1 className='lg:text-[35px] text-[25px] text-center '>Benifits you get when using</h1>
            </div>

            <div >
                {
                    data.map((item,index)=>(

                        <BenifitLocalSection key={index} item={item} index={index}/>

                    ))
                }
           
            </div>
        </div>
    )
}

export default BenifitSection