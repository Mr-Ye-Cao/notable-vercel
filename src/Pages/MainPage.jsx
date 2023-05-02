import React from 'react'
import {Link, Outlet} from "react-router-dom";
import Navbar from '../Components/Navbar'
import UploadAudio from '../Components/UploadAudio';
import NoteListing from '../Components/NoteListing';

export default function MainPage() {
  return (
    <div className='full-screen row d-block d-lg-flex m-0'>
        {/* <div className='col-12 col-lg-2 bg-primary text-white d-flex align-items-center p-0' style={{height: "fit-content"}}>
            <Navbar/>
            <div className='d-flex full-width justify-content-center d-lg-none'>
                Notable
            </div>
        </div>
        <div className='col-12 col-lg-10'>
            <div className='d-flex justify-content-center align-items-center full-height'>
                <Link to="notes">Notes</Link>
                <Link to="record">
                    <i className="bi bi-plus-square"></i>
                </Link>
                
                <Outlet/>
            </div>
        </div> */}
        <div className='d-flex justify-content-center align-items-center'>
            <UploadAudio/>
        </div>
    </div>
  )
}
