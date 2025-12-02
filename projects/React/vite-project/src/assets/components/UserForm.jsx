import React, { useRef } from 'react'
import { statesData } from './data';

export default function UserForm({ states, setstates ,userInfo, setUserInfo }) {

    var name =useRef();
    var email =useRef();
    var mobileNo =useRef();
    var country =useRef();
    var state =useRef();

    const setCountry = (i) => {
        const finalState = statesData.filter((v) => {
            if (i.target.value === v.country_name) {
                return v;
            }
        })
        setstates([...finalState])
    }
    const formHandler = (event) =>{
        event.preventDefault();

        const user ={
            name: name.current.value ,
            email : email.current.value ,
            mobileNo : mobileNo.current.value ,
            country : country.current.value ,
            state : state.current.value 
        }

        const finalData = [user , ...userInfo];
        setUserInfo(finalData);
        localStorage.setItem('user_info',JSON.stringify(finalData));

        event.target.reset();
        setstates([]);
    }

    return (
        <>
            <div className="formContainer">
                <form id="formHandler" onSubmit={formHandler}>
                    <div className="groupInput">
                        <label for="name">Name</label>
                        <input type="text" ref={name} required />
                    </div>
                    <div className="groupInput">
                        <label for="email">Email</label>
                        <input type="email" ref={email} required />
                    </div>
                    <div className="groupInput">
                        <label for="mobileNo">Mobile Number</label>
                        <input type="text" ref={mobileNo} required />
                    </div>
                    <div className="groupInput">
                        <label for="country">Country</label>
                        <select ref={country} id="country" onChange={setCountry}>
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="Canada">Canada</option>
                            <option value="Austraila">Austraila</option>
                        </select>
                    </div>
                    <div className="groupInput">
                        <label for="state">State</label>
                        <select ref={state} id="state">
                            <option value="">Select State</option>
                            {
                                states.map((v, i) => {
                                    return (
                                        <option value={v.name}>{v.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </>
    )
}
