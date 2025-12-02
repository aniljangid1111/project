import React, { useState } from 'react'

import FaqHeading from './FaqHeading';
import FaqSection from './FaqSection';
import { data } from './data';
import { RiMenu2Fill } from 'react-icons/ri';





export default function Accordin() {

    const [faqs, setfaqs] = useState(data);

    const [passwordType, setPasswordType] = useState(true);

    const [currentIndex, setcurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    const changepasswordType = () => {
        setPasswordType(!passwordType)

    }
    return (
        <>
            <div className="canva">
                {
                    (!isOpen)
                        ?
                        <button className='btn-canva' onClick={() => setIsOpen(!isOpen)}>
                            <RiMenu2Fill />
                        </button>
                        :
                        <button className='btn-canva' onClick={() => setIsOpen(!isOpen)}>
                            X
                        </button>
                }






                <div className={`off-canva ${isOpen ? 'open' : ''}`}>
                    <div className='canvaContent'>

                        <h4>Menu</h4>
                        <ul>
                            <li>Home</li>
                            <li>FAQs</li>
                            <li>Contact</li>
                        </ul>
                        <div className='password-div'>
                            <input type={(passwordType) ? 'password' : 'text'} name="" id="" />
                            <button onClick={changepasswordType}>{(passwordType) ? 'show' : 'Hide'}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <FaqHeading heading="Frequently Asked Questions (FAQ)" />
                {
                    faqs.map((value, index) => {
                        return (
                            <FaqSection faqdata={value} key={index} currentIndex={currentIndex} index={index} setcurrentIndex={setcurrentIndex} />
                        )
                    })
                }
            </div>

        </>
    )
}
