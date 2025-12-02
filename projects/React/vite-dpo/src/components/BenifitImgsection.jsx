import React from 'react'

function BenifitImgsection({src}) {
    return (
        <div className='imgSide rounded-4xl overflow-hidden shadow-2xl'>
            <img src={src} alt="" className='w-full' />
        </div>
    )
}

export default BenifitImgsection