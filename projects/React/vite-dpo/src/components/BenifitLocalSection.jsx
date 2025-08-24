import React from 'react'
import BenifitImgsection from './benifitImgsection';
import Benifitcontent from './benifitcontent';
// import Benifitsimg from './../../public/benefits_subimage_1.jpg'
// import logoBenifit from './../../public/benefits_subimage_icon_11681880477.svg'


function BenifitLocalSection({ item, index }) {
    return (
        <div className='lg:bg-[url(../../public/box-dots.svg)] bg-no-repeat bg-right-bottom pb-[20px]'>
            <div className='container  lg:p-[150px] mx-auto' >
                <div className='grid lg:grid-cols-2 lg:gap-[50px] gap-[10px] items-center grid-cols-1 justify-center'>
                    <div className='p-[50px]'>
                        <BenifitImgsection
                            img src={item.image}
                        />
                    </div>
                    <div className={` text-center ${(index % 2 === 0) ? 'lg:text-start' : 'lg:order-first lg:text-end'}`}>
                        <Benifitcontent
                            logo={item.icon}
                            title={item.title}
                            btncontent={item.button}
                        />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default BenifitLocalSection