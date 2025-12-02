import React, { useState } from 'react'
import FaqHeading from './FaqHeading'
import UserForm from './UserForm';
import FormData from './FormData';

export default function FormHandling() {
  const getData = localStorage.getItem('user_info');
  const user = JSON.parse(getData);

  const [states, setstates] = useState([]);
  const [userInfo, setUserInfo] = useState(user ?? [] );
  

  return (
    <>
      <FaqHeading heading="Form Section" />

      <main>
        <UserForm states={states}   setstates={setstates} userInfo ={userInfo}  setUserInfo ={setUserInfo}  />

       <FormData userInfo ={userInfo}  setUserInfo ={setUserInfo} />
      </main>



    </>
  )
}
