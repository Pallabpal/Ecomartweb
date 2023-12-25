import React from 'react';
// import { useState } from 'react';
import { useValue } from '../Logincontext/Logincontext';
import { Outlet, Link } from 'react-router-dom';

export default function Navbar() {
  const {userData, cart, handleLogout}=useValue();

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-sm position-sticky" style={{ top: 0, background: "#f7ecec", zIndex:"100" }}>
        <div className="container-fluid">
          <Link to='/' className="navbar-brand fw-bold fs-4" style={{ textDecoration: 'none', lineHeight: '40px' }}>
            EcoMart
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link" style={{ textDecoration: 'none', lineHeight: '40px' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/Ecomart/about' className="nav-link" style={{ textDecoration: 'none', lineHeight: '40px' }}>About</Link>
              </li>
              <li className="nav-item">
                <Link to='/Ecomart/contact' className="nav-link" style={{ textDecoration: 'none', lineHeight: '40px' }}>Contact</Link>
              </li>
            </ul>

            {userData?
            
            <div className="buttons">
              <Link className="btn btn-outline-light ms-2" to='/Ecomart/myprofile' style={{ textDecoration: 'none', color:'black' }}>
              <i class="fa-solid fa-user"></i>
              
              </Link>
              <Link href="" className="btn btn-outline-light ms-2" to='/Ecomart/myorders' style={{color:"black"}}>
               
                Myorders
              </Link>
              <Link  className="btn  btn-outline-light ms-2" to='/Ecomart/cart' style={{color:"black"}}>
                <i className="fa fa-shopping-cart me-1"></i>
                Cart({userData?cart.length: 0})
              </Link>
              <Link  className="btn  btn-outline-light ms-2" to='/' style={{color:"black"}} onClick={handleLogout}>
                <i className="fa fa-shopping-cart me-1"></i>
                Logout
              </Link>

            </div>
            : 
              <div className="buttons">
              <Link to='/Ecomart/signin' style={{ textDecoration: 'none' }}>
                <i className="fa fa-sign-in me-1"></i>
                Login
              </Link>
              <Link href="" className="btn btn-outline-dark ms-2" to='/Ecomart/signup'>
                <i className="fa fa-user-plus me-1"></i>
                Register
              </Link>
              <Link to='/' className="btn btn-outline-dark ms-2">
                <i className="fa fa-shopping-cart me-1"></i>
                Cart(0)
              </Link>
            </div>
            }
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
