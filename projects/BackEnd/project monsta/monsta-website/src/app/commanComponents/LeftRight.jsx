"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "./LeftRight.css";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { TbGridDots } from "react-icons/tb";
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useSelector } from 'react-redux';

export default function LeftRight() {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMetrial, setSelectedMetrial] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  return (
    <div>

      <Container fluid className="breadcrumbs_area">
        <Container className="breadcrumb_content">
          <Row>
            <Col lg={12}>
              <h3>Product Listing</h3>
              <ul className="p-0">
                <li>
                  <Link href="/">home</Link>
                </li>
                <li>&gt;</li>
                <li>Product Listing</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Container>


      <Container>
        <Row>

          <Col lg={3} xs={{ order: 2 }} md={{ order: 1 }} className="">
            <LeftSide
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              // meterial
              selectedMetrial={selectedMetrial}
              onMetrialChange={setSelectedMetrial}
              // color
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}

            />
          </Col>

          <Col xs={{ order: 1 }} md={{ order: 2 }} className="">
            <RightSide selectedCategories={selectedCategories} selectedMetrial={selectedMetrial} selectedColor={selectedColor} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}



const LeftSide = ({ selectedCategories, onCategoryChange, selectedMetrial, onMetrialChange, onColorChange, selectedColor }) => {

  const [categories, setCategories] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [materialFilter, setMaterialFilter] = useState([]);


  useEffect(() => {
    axios.post("http://localhost:8001/api/admin/category/view")
      .then((res) => {
        if (res.data._status) {
          setCategories(res.data._data);
        }
      })
      .catch(() => toast.error("Failed to fetch categories"));
  }, []);


  const categoryfilter = (id) => {
    let updated;
    if (selectedCategories.includes(id)) {
      updated = selectedCategories.filter((v) => v !== id);
    } else {
      updated = [...selectedCategories, id];
    }
    onCategoryChange(updated); // update parent state directly
  };

  // metrial
  useEffect(() => {
    axios.post("http://localhost:8001/api/admin/material/view")
      .then((res) => {
        if (res.data._status) {
          setMaterialFilter(res.data._data);
        }
      })
      .catch(() => toast.error("Failed to fetch Material"));
  }, []);

  const metrialfilterfun = (id) => {
    let updated;
    if (selectedMetrial.includes(id)) {
      updated = selectedMetrial.filter((v) => v !== id);
    } else {
      updated = [...selectedMetrial, id];
    }
    onMetrialChange(updated); // update parent state directly
  };
  // color
  useEffect(() => {
    axios.post("http://localhost:8001/api/admin/color/view")
      .then((res) => {
        if (res.data._status) {
          setColorFilter(res.data._data);
        }
      })
      .catch(() => toast.error("Failed to fetch Material"));
  }, []);

  const Colorfilterfun = (id) => {
    let updated;
    if (selectedColor.includes(id)) {
      updated = selectedColor.filter((v) => v !== id);
    } else {
      updated = [...selectedColor, id];
    }
    onColorChange(updated); // update parent state directly
  };

  return (
    <>
      <div className='Scroll-left'>
        {/* categories filter */}
        <div className="widget_list ">
          <h2>Categories</h2>

          <ul className='p-0'>
            {categories.map(cat => (
              <li key={cat._id}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat._id)}
                  onChange={() => categoryfilter(cat._id)}
                />
                <label>{cat.name}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* metrial filter */}
      <div className='Scroll-left'>
        <div className="widget_list">
          <h2>Material</h2>

          <ul className='p-0'>
            {
              materialFilter.map(cat => (
                <li key={cat._id}>
                  <input
                    type="checkbox"
                    checked={selectedMetrial.includes(cat._id)}
                    onChange={() => metrialfilterfun(cat._id)}
                  />
                  <label>{cat.name}</label>
                </li>
              ))
            }
          </ul>


        </div>
      </div>

      {/* Color filter */}
      <div className='Scroll-left'>
        <div className="widget_list">
          <h2>Color</h2>

          <ul className='p-0'>
            {
              colorFilter.map((cat, i) => {
                return (
                  <li key={i}>
                    <input className="form-check-input" type="checkbox"
                      checked={selectedColor.includes(cat._id)}
                      onChange={() => Colorfilterfun(cat._id)} />
                    <label className="form-check-label" >{cat.name}</label>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>
  );
};


const RightSide = ({ selectedCategories, selectedMetrial, selectedColor }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [boxCount, setBoxCount] = useState(true)
  const [productsFatch, setProductFatch] = useState([])
  const [productImgUrl, setProductImgUrl] = useState('')
  // const [searchProduct, setSearchProduct] = useState('')

  const searchProduct = useSelector((state) => state.search.query);




  const handleSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  useEffect(() => {
    axios.post('http://localhost:8001/api/admin/products/view', {
      parent_category_ids: selectedCategories,
      material_ids: selectedMetrial,
      colors_ids: selectedColor,
      name: searchProduct,
      sort: selectedOption

    })
      .then((response) => {
        if (response.data._status === true) {
          setProductFatch(response.data._data);
          setProductImgUrl(response.data._image_path)
        } else {
          toast.error(response.data._message)
        }
      })
      .catch(() => {
        toast.error("Something Went Wrong!")

      })
  }, [selectedCategories, selectedMetrial, selectedColor, searchProduct, selectedOption])


  return (

    <>
      <div className="short-filter">
        <div className='short-filter-right'>
          <div onClick={() => setBoxCount(!boxCount)} className='d-none d-md-block '  > {boxCount ? <TbGridDots /> : <PiDotsSixVerticalBold />} </div>
          <div>Sort By :</div>
          <div
            className={`nice-select niceselect_option ${dropdownOpen ? "open" : ""}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="current">{selectedOption} <span className='ms-4' >{dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>  </span>
            <ul className="list">
              <li className="option" onClick={() => handleSelect("")}>Sort By</li>
              <li className="option" onClick={() => handleSelect("1")}>Featured Products</li>
              <li className="option" onClick={() => handleSelect("2")}>New Arrivals</li>
              <li className="option" onClick={() => handleSelect("3")}>On Sale</li>
              <li className="option" onClick={() => handleSelect("4")}>Best Sellings</li>
              <li className="option" onClick={() => handleSelect('5')}>Price: Low to High</li>
              <li className="option" onClick={() => handleSelect('6')}>Price: High to Low</li>
              <li className="option" onClick={() => handleSelect("7")}>Product Name: A to Z</li>
              <li className="option" onClick={() => handleSelect("8")}>Product Name: Z to A</li>
            </ul>

          </div>

          <div>Showing 1–1 of 1 results</div>
        </div>
      </div>

      {/* cards */}
      {/* <div class="row col-lg-4 col-md-4 col-sm-6"> */}

      <Row md={boxCount ? 3 : 2} xs={2}>
        {
          productsFatch.length > 0
            ?
            productsFatch.map((v, i) => {
              return (
                <Cards key={i} product={v} productImgUrl={productImgUrl} />
              )
            })

            :
            <p>No products found</p>

        }

      </Row>



      {/* </div> */}
    </>
  );
};


const Cards = ({ product, productImgUrl }) => {

  return (

    <Col>

      <div className="single_product">
        <div className="product_thumb">
          <Link className="primary_img" href={`/product-details/${product.slug}`}>
            <img src={productImgUrl + product.image} className='object-cover w-100 h-100' alt="" />
          </Link>
        </div>
        <div className="product_content">
          <h3><Link href={`/product-details/${product.slug}`}>{product.name}</Link></h3>
          <div className="price_box">
            <span className="old_price">Rs. {product.actual_price}</span>
            <span className="current_price">Rs. {product.sale_price}</span>
          </div>

          <div className="action_links mt-3">
            <ul>
              <li>
                <a className="wishlist_tooltip" data-placement="top" title="Add to Wishlist" data-bs-toggle="tooltip">
                  <span className="icon">
                    <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/heart-regular.svg" className="wishlist_img img-fluid" />
                  </span>
                </a>
              </li>
              <li className="add_to_cart">
                <a title="Add to Cart" id="product_14">
                  <div className="cartShow">add to cart</div>
                  <div className="cartHide" style={{ display: "none" }} >Loading...</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Col>

  )
}


