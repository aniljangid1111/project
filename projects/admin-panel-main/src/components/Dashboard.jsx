import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useContext } from "react";
import { Nav_Context } from "../context/Context";




export default function Dashboard() {
  const { Nav_State, setNav_State } = useContext(Nav_Context);


  let NavPanel_width;
  if (Nav_State == true) {
    NavPanel_width = '100%';
  }
  else {
    NavPanel_width = '100%';
  }

  return (
    <>
      <div className='Master flex '>
        <SideBar />
        <div style={{ width: NavPanel_width }}>
          <Navbar />
          <div className='outlet '>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
