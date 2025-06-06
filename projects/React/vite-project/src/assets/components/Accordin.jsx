import React, { useState } from 'react'

import FaqHeading from './FaqHeading';
import FaqSection from './FaqSection';
import { data } from './data';
import { RiMenu2Fill } from 'react-icons/ri';





export default function Accordin() {

    const [faqs, setfaqs] = useState(data);

    const [currentIndex, setcurrentIndex] = useState(0);




    return (
        <>

            <div className='canva'>

                <button><RiMenu2Fill /></button>
                <RiMenu2Fill />
                <div className='off-canva'>
                    <ul>
                        <li>1</li>
                    </ul>
                </div>

            </div>

            <div className="container">
                <FaqHeading heading="Frequently Asked Questions (FAQ)" />
                {
                    faqs.map((value, index) => {
                        return (
                            <FaqSection faqdata={value} key={index} currentIndex={currentIndex} index={index} setcurrentIndex={setcurrentIndex} />

                            // <div className="accordin-qes">
                            //     <div className="question" onClick={() => showfaq(index)}>
                            //         <h5>{value.qestion}</h5>
                            //         <span><index className={`fa ${currentIndex === index ? 'fa-angle-up' : 'fa-angle-down'}`}></index> </span>
                            //     </div>
                            //     <div className={currentIndex === index ? 'answer active' : 'answer '} >
                            //         {value.answare}
                            //     </div>
                            // </div>
                        )
                    })
                }
            </div>

        </>
    )
}
