import React from 'react'

export default function Navbar() {
  return (
    <>
    <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
        <i className="bi bi-list text-white"></i>
    </button>

    <div className="offcanvas-lg offcanvas-start bg-primary full-screen" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
        <div className="offcanvas-header">
            <button type="button" className="btn-close btn-close-white navbar-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body navbar-style d-flex flex-column p-3 navbar-lg">
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h5 className='pt-2'>Notable</h5>
                <div><i className="bi bi-plus-square text-white fs-4"></i></div>
            </div>
            
            <p className="mb-0">course1</p>
        </div>
    </div>
    </>
  )
}
