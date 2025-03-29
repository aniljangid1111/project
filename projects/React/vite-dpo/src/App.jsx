import React from 'react';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { FiShoppingBag } from 'react-icons/fi';
import logo from './../public/main-logo.svg';
import playStore from './../public/google.svg'
import headerCrown from './../public/header-crown.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import slideFirst from './../public/slider_1.jpg'
import slideSecound from './../public/slider_2.jpg'
import slideThird from './../public/slider_3.jpg'
import slideFour from './../public/slider_4.jpg'

function App() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <header className='bg-[#EBF8FC] p-3 font-[Inter_Variable,sans_serif] '>
        <div className='header-inner w-full m-auto  max-w-[1360px] flex justify-between items-center'>
          <div className='flex items-center gap-8'>
            <figure className='logo max-w-[160px]'>
              <img src={logo} alt="" />
            </figure>
            <nav className=' md:block  sm:hidden '>
              <ul className='flex gap-[35px] lg:text-[16px] cursor-pointer md:gap-[25px] md:text-[12px]'>
                <li className='hover:text-[#EC6B6C]'>Home</li>
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
              </ul>
            </div>

            <div className='flex gap-3 items-center'>
              <button className=' flex items-center gap-2 text-[20px] cursor-pointer'>
                <img src={headerCrown} alt="crown" className='max-w-[15px]' />
                <span className='text-[#FF8C00] hover:text-[#EC6B6C]'>Upgrade Pro</span>
              </button>
              <button className='btn2 text-[16px] bg-[#EC6B6C] rounded-[8px] p-[9px_30px] text-[#F8F8FF] capitalize cursor-pointer border-1 border-[#EC6B6C] hover:bg-white hover:text-[#EC6B6C] '>Sign In</button>
            </div>
          </div>
        </div>
      </header>
      <section className='hero-section bg-[#EBF8FC] font-[Merriweather,serif] '>
        <div className='lg:grid-cols-2 sm:grid-cols-1 lg:container grid grid-cols-2 items-center gap-[20px]   py-[45px] text-[#202223] max-w-[1360px] mx-auto '>
          <div className='p-[20px]'>
            <p className='text-[60px] font-bold capitalize'>Design your dream home...</p>
            <h1 className='text-[60px] font-bold capitalize  my-[10px]'>at your fingertips</h1>
            <div className='flex gap-4 my-[20px]'>
              <button className='capitalize p-[15px_45px] bg-[#315399] border-1 border-[#315399] cursor-pointer text-white  rounded-xl hover:bg-white hover:text-[#315399] duration-100'>explore more</button>
              <button className='max-w-[191px] h-5 cursor-pointer' ><img src={playStore} alt="Google" />Download Our App</button>
            </div>

          </div>
          <div className='p-[40px]  '>
            <Slider {...settings}>
              <div className='rounded-2xl overflow-hidden' >
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

    </>
  )
}

export default App;
