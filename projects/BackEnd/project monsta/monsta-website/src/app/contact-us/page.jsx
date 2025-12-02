'use client'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "../globals.css";
import Link from 'next/link';
import { FaFax } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function page() {

  const [sendMessage, setSendMessage] = useState(true)

  const qesAnsForm = (event) => {

    event.preventDefault()
    setSendMessage(false)

    axios.post('http://localhost:8001/api/admin/enquiry/create', event.target)
      .then((response) => {
        if (response.data._status == true) {
          toast.success(response.data._message)
          setSendMessage(true)
        } else {
          toast.error(response.data._message)
          setSendMessage(true)
        }

      })
      .catch(() => {
        toast.error("Something went wrong!")
        setSendMessage(true)
      })
  }


  return (
    <>
      <Container fluid className='breadcrumbs_area'>
        <Container className='breadcrumb_content'>
          <Row>
            <Col lg={12}>
              <h3>Contact Us</h3>
              <ul className='p-0'>
                <li><Link href="/">home</Link></li>
                <li>&gt;</li>
                <li>Contact Us</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className='contact_map'>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="map-area">
                <div id="googleMap">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.631421124823!2d73.0283626508787!3d26.27362318332549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5b1ea7d0c7%3A0xf14d81eb1531921c!2sLaxmi%20Kirana%20Store!5e0!3m2!1sen!2sin!4v1580291833220!5m2!1sen!2sin" width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen=""></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container fluid className='contact_area border-bottom border-1'>
        <Container>
          <Row>
            <Col lg={6} md={12}>
              <div className="contact_message content">
                <h3>Contact Us</h3>
                <p></p>
                <ul className='p-0'>
                  <li><FaFax />  Address : WsCubte Tech, Ratanada, Jodhpur</li>
                  <li><FaPhone /> 9781234560</li>
                  <li><IoMailOutline /> furniture@gmail.com</li>
                </ul>
              </div>
            </Col>

            <Col lg={6} md={12}>
              <div className="contact_message form">
                <h3>Tell us your question</h3>
                <form onSubmit={qesAnsForm} id="contact-form" className="bv-form" autoFocus='true' autoComplete='true' noValidate="novalidate">


                  <p className="form-group has-feedback">

                    <label> Your Name (required)</label>
                    <input name="name" placeholder="Name *" type="text" data-bv-field="name" required /> </p>

                  <p className="form-group has-feedback">
                    <label>  Your Email (required)</label>

                    <input name="email" placeholder="Email *" type="email" data-bv-field="email" required /> </p>



                  <p className="form-group has-feedback">
                    <label>  Your Mobile Number (required)</label>
                    <input name="mobile_number" placeholder="Mobile Number *" type="text" data-bv-field="mobile" required /> </p>


                  <p className="form-group has-feedback">
                    <label>  Subject</label>
                    <input name="subject" placeholder="Subject *" type="text" data-bv-field="subject" required /> </p>

                  <p className="form-group has-feedback">
                    <label>  Your Message</label>
                    <textarea placeholder="Message *" name="message" className="form-control2" data-bv-field="message"></textarea></p>


                  <button type="submit" disabled={sendMessage ? '' : 'disabled'} id="send_enquiry">
                    {
                      sendMessage
                        ?
                        'Send'
                        :
                        'Sending'
                    }
                  </button>

                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}
