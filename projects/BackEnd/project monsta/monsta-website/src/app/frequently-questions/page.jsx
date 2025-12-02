"use client"
import React, { useEffect, useState } from 'react'
import "./frequently-questions.css"
import axios from 'axios';
import { toast } from 'react-toastify';
export default function page() {

    let [myFaq, setMyFaq] = useState([]);
    let [data, setData] = useState(1);

    useEffect(() => {
        axios.post('http://localhost:8001/api/admin/faq/view')
            .then((response) => {
                if (response.data._status == true) {
                    // ✅ sirf active FAQs ko set karo
                    const activeFaqs = response.data._data.filter(faq => faq.status === true);

                    setMyFaq(activeFaqs);

                    if (response.data._data.length > 0) {
                        setData(response.data._data[0]._id)
                    }
                } else {
                    toast.error(response.data._message)
                }

            })
            .catch(() => {
                toast.error("Somthing Went Wrong_")
            })
    }, [])


    const handleClick = (id) => {
        setData(data === id ? null : id);
    };
    return (
        <div>
            <div className="breadcrumbs_area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb_content">
                                <h3>Frequently Questions</h3>
                                <ul>
                                    <li><a href="/">home</a></li>
                                    <li> {">"} </li>
                                    <li>Frequently Questions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='w-100  '>
                <div className="main">
                    {
                        myFaq.length > 0
                            ?
                            myFaq.map((v) => (
                                <div className="row" key={v._id}>
                                    <h2 className={data == v._id ? "activeH2" : ""} onClick={() => handleClick(v._id)}>
                                        {v.question} {data === v._id ? <span>&#x2212;</span> : <span>&#x2b; </span>}
                                    </h2>
                                    {data === v._id && <p className="activep">{v.answer}</p>}
                                </div>
                            ))
                            :
                            <div className="row">
                                <h2 className="activeH2" >
                                    No Frequently Questions
                                </h2>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
