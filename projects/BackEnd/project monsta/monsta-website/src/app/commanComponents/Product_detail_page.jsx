"use client"
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { PiGreaterThanThin } from "react-icons/pi";
import "./Product_detail_page.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Bestselling from './Bestselling';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, fetchCart } from '../Redux Toolkit/cartSlice';

export default function Product_detail_page() {

    const param = useParams(); // URL se slug milega
    const [product, setProduct] = useState({})
    const [productImgUrl, setProductImgUrl] = useState('')
    const [selectedImage, setSelectedImage] = useState(null) // null instead of ""

    const fallbackImage = "/images/no-image.png" // 👈 default fallback

    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const user_id = user._id; // backend ke hisaab se

    useEffect(() => {
        if (user_id) {
            dispatch(fetchCart(user_id)); // backend se cart load karo
        }
    }, [user_id]);

    useEffect(() => {
        if (param) {
            axios.post(`http://localhost:8001/api/admin/products/details/${param.slug}`)
                .then((response) => {
                    if (response.data._status === true) {
                        const prod = response.data._data;
                        setProduct(prod);
                        setProductImgUrl(response.data._image_path);

                        // default main image set
                        if (prod.image) {
                            setSelectedImage(response.data._image_path + prod.image);
                        } else if (prod.photos?.length > 0) {
                            setSelectedImage(response.data._image_path + prod.photos[0]);
                        } else {
                            setSelectedImage(fallbackImage);
                        }
                    } else {
                        toast.error(response.data._message);
                    }
                })
                .catch(() => {
                    toast.error("Something Went Wrong!");
                });
        }
    }, [param]);

    const handleAddToCart = () => {
        if (!user_id) {
            toast.error("Please login first!");
            return;
        }
        dispatch(addCartItem(user_id, product));
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false, // 👈 arrows enable/disable
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, infinite: true }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2, dots: false }
            },
            {
                breakpoint: 300,
                settings: { slidesToShow: 2, dots: false }
            }
        ]
    };

    return (
        <section>
            <Container className='my-5 Product_detail_pageDiv'>

                <h1 className='text-center fw-bold '>{product.name}</h1>
                <ul className='border-bottom pb-4 d-flex justify-content-center coloreGray '>
                    <li>Home <span><PiGreaterThanThin className='arrowDiv' /></span></li>
                    <li>Side and End Tables <span><PiGreaterThanThin className='arrowDiv' /></span></li>
                    <li>{product.name}</li>
                </ul>

                <Row xs={1} md={2} className='pt-4'>
                    <Col>
                        {/* 👇 Main Image */}
                        <div className='h-50'>
                            {selectedImage && (
                                <img
                                    src={selectedImage}
                                    className='img-fluid  w-100 h-100 main-image'
                                    alt={product.name || "Product"}
                                    onError={(e) => (e.target.src = fallbackImage)} // if broken image
                                />
                            )}
                        </div>

                        {/* 👇 Thumbnails Slider */}
                        <div className='product_slider'>


                            <Slider {...settings} className='sildeSider'>
                                {product.image && (
                                    <div className='p-2' onClick={() => setSelectedImage(productImgUrl + product.image)}>
                                        <img
                                            className='img-fluid thumb-image'
                                            src={productImgUrl + product.image}
                                            alt="main"
                                            onError={(e) => (e.target.src = fallbackImage)}
                                        />
                                    </div>
                                )}

                                {product.photos?.map((photo, index) => (
                                    <div className='p-2' key={index} onClick={() => setSelectedImage(productImgUrl + photo)}>
                                        <img
                                            className='img-fluid thumb-image'
                                            src={productImgUrl + photo}
                                            alt={`photo-${index}`}
                                            onError={(e) => (e.target.src = fallbackImage)}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>

                    <Col>
                        <h3 className='pt-4 pt-md-0'>{product.name}</h3>
                        <div className="product_price">
                            <span className="old_price">Rs. {product.actual_price}</span>
                            <span className="current_price">Rs. {product.sale_price}</span>
                        </div>
                        <div className="product_desc">
                            <p>{product.short_description}</p>
                        </div>

                        <button className="button" type="button" onClick={handleAddToCart}>
                            Add to Cart
                        </button>

                        <div className="product_d_meta">
                            <span>Code: {product.product_code}</span>
                            <span>Dimension: {product.product_dimension}</span>
                            <span>Estimate Delivery Days: {product.estimate_delivery_days}</span>
                            <span>Category: <a>{product.parent_category_ids?.[0]?.name}</a></span>
                            <span>Color: <a>{product.colors_ids?.[0]?.name}</a></span>
                            <span>Material: <a>{product.material_ids?.[0]?.name}</a></span>
                        </div>
                    </Col>
                </Row>

                <div className='Description'>
                    <h3>Description</h3>
                    <p>{product.long_description}</p>
                </div>
            </Container>

            <Bestselling />
            <Bestselling />
        </section>
    )
}
