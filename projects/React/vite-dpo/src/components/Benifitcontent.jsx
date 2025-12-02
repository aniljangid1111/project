import React from 'react'

function Benifitcontent({ logo, title, btncontent }) {
    return (
        <div className='contentSide  p-2.5   '>
            <div className='inline-block'>
                <img src={logo} alt="" />
            </div>
            <div>
                <p className='max-w-[500px] lg:text-[45px] text-[30px] lg:my-10 my-2 inline-block'>
                    {title}
                </p>
            </div>
            <div>
                <button className='bg-[#315399] text-white border border-[#315399] hover:bg-white hover:text-[#315399] p-[10px_25px] rounded-[8px] duration-100'>
                    {btncontent}
                </button>
            </div>
        </div>
    )
}

export default Benifitcontent