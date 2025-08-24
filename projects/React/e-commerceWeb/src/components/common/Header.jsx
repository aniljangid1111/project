import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { commonContex } from '../contex Api/Contex';
import { IoIosContact, IoMdHeart } from 'react-icons/io';
import { FaCartShopping } from 'react-icons/fa6';


export default function Header() {
  const { cardItem, isLogin, setIsLogin, searchItem, setSearchItem } = useContext(commonContex)

  const [category, setCategory] = useState([]);

  var navition = useNavigate()

  const logout = () => {
    localStorage.removeItem('user_uid')
    setIsLogin('')

  }
  const [searchInput, setSearchInput] = useState('');

  const searchProduct = (event) => {
    if (event.key === 'Enter') {
      const keyword = searchInput.trim();
      if (keyword !== '') {
        setSearchItem(keyword);
        navition('/product-listing');
      }
    }
  };

  const searchProductByicon = () => {
    const keyword = searchInput.trim();
    if (keyword !== '') {
      setSearchItem(keyword);
      navition('/product-listing');
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      // transition={Bounce}
      />
      {/* <!-- Header --> */}
      <header className="sticky-top bg-white border-bottom shadow-sm">
        <div className="container py-3">
          <div className="row align-items-center">
            {/* <!-- Logo --> */}
            <div className="col-md-3 col-6 mb-2 mb-md-0">
              <Link to="/" className="text-decoration-none">
                <h1 className="fs-4 fw-bold m-0">ShopHub</h1>
              </Link>
            </div>

            {/* <!-- Search --> */}
            <div className="col-md-5 col-12 order-md-1 order-3 mt-2 mt-md-0">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i onClick={searchProductByicon} className="fa fa-search text-muted" style={{ cursor: 'pointer' }}></i>
                </span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyUp={searchProduct}
                  className="form-control border-start-0"
                  placeholder="Search products..."
                />

              </div>
            </div>

            {/* <!-- Navigation --> */}
            <div className="col-md-4 col-6 text-end order-md-2 order-2">
              <div className="d-flex  justify-content-end align-items-center">
                <Link to="/product-listing" className="btn btn-link text-dark d-none d-md-inline-block">Categories</Link>
                <Link to="/deals-page" className="btn btn-link text-dark d-none d-md-inline-block">Deals</Link>



                {
                  isLogin
                    ?
                    <div onClick={logout} className="btn btn-link text-dark d-none d-md-inline-block">Log Out</div>
                    :
                    <Link to={'/login-register'}>
                      <span className='heart-icon p-0 mx-2  btn btn-link text-dark'>
                        <IoIosContact />
                      </span>
                    </Link>
                }
                <Link to={'/wish-list'}>
                  <span className='heart-icon p-0 mx-2  btn btn-link text-dark'>
                    <IoMdHeart />
                  </span>
                </Link>

                <Link to="/card-list">
                  <span className='heart-icon p-0 mx-2 btn btn-link text-dark position-relative'> <FaCartShopping />
                    <span className=" cart-batch cart-number   badge rounded-pill bg-danger">
                      {cardItem.length}
                    </span></span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </header >
      <section className="category-header  shadow-sm">
        <div className="container py-2">
          <div className="row align-items-center">

            {/* <!-- Navigation --> */}
            <div className="col-12 text-center  ">
              <div className="  d-flex justify-content-center align-items-center">
                {
                  category.map((v, i) => {
                    if (i < 6) {

                      return (
                        <Link to={`/product-listing/${v.slug}`} key={i} className="header-inner btn  text-white   d-none d-md-inline-block">{v.name}</Link>
                      )
                    }
                  })
                }

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
