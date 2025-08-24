import React, { useState } from 'react';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { FiShoppingBag } from 'react-icons/fi';
import logo from './../../public/main-logo.svg';
import playStore from './../../public/google.svg'
import headerCrown from './../../public/header-crown.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import slideFirst from './../../public/slider_1.jpg'
import slideSecound from './../../public/slider_2.jpg'
import slideThird from './../../public/slider_3.jpg'
import slideFour from './../../public/slider_4.jpg'
import BenifitSection from '../components/BenifitSection';
import DesignDefine from '../components/DesignDefine';
import { IoIosMenu } from 'react-icons/io';
import SideNavbar from '../components/SideNavbar';
import { RxCross2 } from 'react-icons/rx';
import ExploreCategories from '../components/ExploreCategories';
import TrendingDesign from '../components/TrendingDesign';
import FooterDpo from '../components/FooterDpo';

function App() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,            // Enable auto-start
    autoplaySpeed: 3000,
  };


  const [issidenav, setissidenav] = useState(false);


  return (
    <>
      <header className='bg-[#EBF8FC] sticky top-0 z-[9999]  left-0 p-3 font-[Inter_Variable,sans_serif] shadow-md'>
        <div className={`fixed top-0 left-0 w-full  origin-left h-full bg-[rgba(0,0,0,0.35)] ${issidenav ? 'scale-[1]' : 'scale-[0]'}  transition-all duration-300 z-[9999] `}>
         
          <SideNavbar issidenav={issidenav} 
          setissidenav={setissidenav}/>
        </div>
        <div className='header-inner w-full m-auto lg:px-[20px] md:px-[10px]  max-w-[1360px] flex justify-between items-center'>
          <div className='flex items-center gap-8'>
            <figure className='logo max-w-[160px]'>
              <img src={logo} alt="" />
            </figure>
            <nav className=' hidden relative  lg:block '>
              <ul className='main_nav flex gap-[35px] text-[16px] cursor-pointer'>
                <li className='hover:text-[#EC6B6C] active'>Home</li>
                <li className='hover:text-[#EC6B6C]'>About Us</li>
                <li className='hover:text-[#EC6B6C]'>Explore</li>
                <li className='hover:text-[#EC6B6C]'>Blog</li>
                <li className='hover:text-[#EC6B6C]'>Contact Us</li>
              </ul>
            </nav>
          </div>
          <div className='signIn flex gap-5 items-center'>
            <div>
              <ul className='user-icon flex gap-6 text-[25px] md:text-[20px] cursor-pointer'>
                <li><CiSearch /></li>
                <li><CiHeart /></li>
                <li><FiShoppingBag /></li>
                <li onClick={() => setissidenav(true)}
                  className='lg:hidden'><IoIosMenu /></li>
              </ul>
            </div>

            <div className='lg:flex gap-3 items-center hidden'>
              <button className=' flex items-center gap-2 text-[20px] cursor-pointer'>
                <img src={headerCrown} alt="crown" className='max-w-[15px]' />
                <span className='text-[#FF8C00] hover:text-[#EC6B6C]'>Upgrade Pro</span>
              </button>
              <button className='btn2 text-[16px] bg-[#EC6B6C] rounded-[8px] p-[9px_30px] text-[#F8F8FF] capitalize cursor-pointer border-1 border-[#EC6B6C] hover:bg-white hover:text-[#EC6B6C] '>Sign In</button>
            </div>
          </div>
        </div>
      </header>
      <section className='hero-section bg-[#EBF8FC] font-[Merriweather,serif] p-[50px]'>
        <div className='  container grid lg:grid-cols-2 items-center gap-[20px]   lg:py-[45px] py-[10px]  text-[#202223] max-w-[1360px] mx-auto grid-cols-1 '>
          <div className='p-[20px]'>
            <p className='lg:text-[60px] lg:text-start text-center text-[28px] font-[700] lg:font-bold capitalize'>Design your dream home...</p>
            <h1 className='lg:text-[60px] lg:text-start  text-center text-[28px] font-[700] lg:font-bold capitalize  my-[10px]'>at your fingertips</h1>
            <div className='flex lg:flex-row gap-4 my-[20px] flex-col w-fit lg:mx-0 mx-auto '>
              <button className='capitalize p-[15px_45px] bg-[#315399] border-1 border-[#315399] cursor-pointer text-white  rounded-lg  hover:bg-white hover:text-[#315399] duration-100'>explore more</button>
              <button className='max-w-[191px] h-5 cursor-pointer' ><img src={playStore} alt="Google" />Download Our App</button>
            </div>

          </div>
          <div className='lg:p-[60px] p-[70px]  '>
            <Slider {...settings}>
              <div className='rounded-2xl overflow-hidden ' >
                <div> <img src={slideFirst} alt="" /></div>
              </div>
              <div className='rounded-2xl overflow-hidden'>
                <img src={slideSecound} alt="" />
              </div>
              <div className='rounded-2xl overflow-hidden'>
                <img src={slideThird} alt="" />
              </div>
              <div className='rounded-2xl overflow-hidden'>
                <img src={slideFour} alt="" />
              </div>
            </Slider>

          </div>
        </div>
      </section>
      <section className='benifit'>
        <BenifitSection />
      </section>
      <section className='design-defind '>
        <DesignDefine />
      </section>
      <section className='Explore-Categories'>
        <ExploreCategories />
      </section>

      <section className='Trending-More-Design'>
        <TrendingDesign />
      </section>
    <section className='footer'>
      <FooterDpo />
    </section>

    </>
  )
}

export default App;
