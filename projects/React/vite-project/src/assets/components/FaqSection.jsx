import React from 'react'

export default function FaqSection({ faqdata, currentIndex, index, setcurrentIndex }) {

    const showfaq = (index) => {
        if (currentIndex === index) {
            setcurrentIndex();
        } else {
            setcurrentIndex(index)
        }
    }



    return (
        <>
            <div className="accordin-qes">
                <div className="question" onClick={() => showfaq(index)}>
                    <h5>{faqdata.qestion}</h5>
                    <span><i className={`fa ${currentIndex === index ? 'fa-angle-up' : 'fa-angle-down'}`}></i> </span>
                </div>
                <div className={currentIndex === index ? 'answer active' : 'answer '} >
                    {faqdata.answare}
                </div>
            </div>
        </>
    )
}
