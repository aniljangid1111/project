
"use client";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { AccordionBody, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { FaBars, FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from 'react-bootstrap/Accordion';
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../Redux Toolkit/searchSlice";
import { useRouter } from "next/navigation";
import { fetchCart, removeCartItem } from "../Redux Toolkit/cartSlice";

export default function Header() {
    const [showCart, setShowCart] = useState(false);

    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);

    // formenu
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        // 1. Redux me query store karo
        dispatch(setSearchQuery(text));

        // 2. Category page pe redirect
        router.push("/categories");
    };

    const isLoggedIn = useSelector((state) => {
        return state.login.token;
    })

    const cart = useSelector((state) => state.cart);      // cart slice se data
    const user_id = useSelector((state) => state.login.user_id); // user_id login slice se

    // Component mount hone pe cart fetch karna
    useEffect(() => {
        if (user_id) {
            dispatch(fetchCart(user_id)); // fetchCart ek async thunk hoga jo API se cart data lata
        }
    }, [user_id, dispatch]);

    const user = useSelector(state => state.login.user);
    const user_id_cart = user._id; // backend ke hisaab se

    useEffect(() => {
        if (user_id_cart) {
            dispatch(fetchCart(user_id_cart)); // backend se cart load karo
        }
    }, [user_id_cart, dispatch, fetchCart]);




    return (
        <>
            {/* Desktop Header */}
            <div className="d-none d-lg-block" >
                <Container fluid className="border-bottom myheader-top ">
                    <Container>
                        <Row className="align-items-center justify-content-between  ">
                            <Col lg={7} md={12} className="p-0">
                                <div className="top-header">
                                    <p><span>Contact us 24/7</span>: +91-9781234560 / furniture@gmail.com</p>
                                </div>
                            </Col>
                            <Col lg={5} md={12}>
                                {mounted && (
                                    isLoggedIn ? (
                                        <Link href={"/my-dashboard"}>
                                            <ul className="auth d-flex justify-content-end">
                                                <li>My Dashboard</li>
                                            </ul>
                                        </Link>
                                    ) : (
                                        <Link href={"/login-register"}>
                                            <ul className="auth d-flex justify-content-end">
                                                <li>Login &nbsp;/</li>
                                                <li>Register</li>
                                            </ul>
                                        </Link>
                                    )
                                )}
                            </Col>

                        </Row>
                    </Container>
                </Container>

                {/* Main Header */}
                <Container fluid className="main_header border-bottom">
                    <Container>
                        <Row className="align-items-center justify-content-between  py-4">
                            <Col lg={7}>
                                <div className="logo">
                                    <Link href={"/"} >
                                        <img
                                            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                                            className="img-fluid"
                                            alt="logo"
                                        />
                                    </Link>
                                </div>
                            </Col>
                            <Col>
                                <div className="p-0 m-0 mid-right-div  ">
                                    <form onSubmit={handleSearch} className="flex gap-2">
                                        <div className="border">
                                            <input
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                placeholder="Search product..." className="border-0 px-2 py-2" autoFocus />
                                            <button type="submit"><IoIosSearch className="fs-5" /></button>
                                        </div>
                                    </form>
                                    <div className="border text-center py-2">
                                        <FaHeart className="fs-4" />
                                    </div>
                                    <div className="border threeBoxDiv" style={{ cursor: "pointer" }} onClick={handleShowCart}>
                                        <span className="cart_quantity">{cart.cartItems.length}</span>
                                        <IoCart className="fs-5 ms-3 " />
                                        <span className="h-50 border mx-2 border-end"></span>
                                        <span className="fw-bold">Rs. {cart.subtotal} <IoIosArrowDown /></span>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>

                <Container fluid className="border-bottom border-1">
                    <div className="menu">
                        <nav>
                            <ul className="d-flex justify-content-center">
                                <li className="active">
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="#">LIVING <FaAngleDown /></Link>

                                    <ul className="mega_menu d-flex">
                                        <li>
                                            <a>Tables</a>
                                            <ul>
                                                <li><Link href={"/categories"}>Side and End Tables</Link></li>
                                                <li><Link href={"/categories"}>Nest Of Tables</Link></li>
                                                <li><Link href={"/categories"}>Console Table</Link></li>
                                                <li><Link href={"/categories"}>Coffee Table Sets</Link></li>
                                                <li><Link href={"/categories"}>Coffee Tables</Link></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Living Storage</a>
                                            <ul>
                                                <li><a href="#">Prayer Units</a></li>
                                                <li><a href="#">Display Unit</a></li>
                                                <li><a href="#">Shoe Racks</a></li>
                                                <li><a href="#">Chest Of Drawers</a></li>
                                                <li><a href="#">Cabinets and Sideboard</a></li>
                                                <li><a href="#">Bookshelves</a></li>
                                                <li><a href="#">TV Units</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Mirrors</a>
                                            <ul>
                                                <li><a href="#">Wooden Mirrors</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="#">SOFA <FaAngleDown /></Link>

                                    <ul className="mega_menu d-flex">
                                        <li>
                                            <a>Sofa Cum Bed</a>
                                            <ul>
                                                <li><a href="#">Wooden Sofa Cum Bed</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Sofa Sets</a>
                                            <ul>
                                                <li><a href="#">L Shape Sofa</a></li>
                                                <li><a href="#">1 Seater Sofa</a></li>
                                                <li><a href="#">2 Seater Sofa</a></li>
                                                <li><a href="#">3 Seater Sofa</a></li>
                                                <li><a href="#">4 Seater Sofa</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a>Swing Jhula</a>
                                            <ul>
                                                <li><a href="#">Wooden Jhula</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="#">PAGES <FaAngleDown /></Link>

                                    <ul className="sub_menu">
                                        <li><a href="/about-us">About Us</a></li>
                                        <li><a href="/cart">Cart</a></li>
                                        <li><a href="/checkout">Checkout</a></li>
                                        <li><Link href={"/frequently-questions"}>Frequently Questions</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="/contact-us">CONTACT US</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Container>
            </div>

            {/* Mobile Header */}
            <div className="bg-white px-2 py-3 d-flex justify-content-between align-items-center d-block d-lg-none">
                <div className="logo">
                    <img
                        src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                        className="img-fluid"
                        alt="logo"
                    />
                </div>
                <div className="d-flex gap-4">
                    <div className="border p-2"><FaHeart className="fs-4" /></div>
                    <div className="position-relative border p-2" onClick={handleShowCart}>
                        <span className="cart_quantity">{cart.cartItems.length}</span>
                        <IoCart className="fs-4" />
                        <span className="fw-bold">Rs. {cart.subtotal}</span>
                    </div>

                    <div className="barIcon" onClick={handleShow} ><FaBars /></div>
                    <OffcanvasMenu className="mobileMenu" show={show} setShow={setShow} />

                </div>

            </div>

            {/* Cart Modal */}
            <CartModal showCart={showCart} handleClose={handleCloseCart} />
        </>
    );
}

// Cart Modal Component
function CartModal({ showCart, handleClose }) {
    const cart = useSelector((state) => state.cart);

    return (
        <Offcanvas show={showCart} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.cartItems.length === 0 ? (
                    <div className="border-top border-bottom py-3 px-3 text-center">
                        Your shopping cart is empty!
                    </div>
                ) : (
                    <>
                        {cart.cartItems.map((item, i) => (
                            <CartItem key={i} item={item} />
                        ))}
                        <CartTotal subtotal={cart.subtotal} />
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

// CartItem component
function CartItem({ item }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    const user_id = user._id;

    const handleDelete = () => {
        if (user_id) {
            dispatch(removeCartItem(user_id, item.id));
        }
    };
    function CartItem({ item }) {
        const dispatch = useDispatch();
        const user = useSelector(state => state.login.user);
        const user_id = user?._id;

        const handleDelete = () => {
            if (user_id) {
                dispatch(removeCartItem(user_id, item.id));
            }
        };

        // image ke liye fallback
        const imageSrc = item.image && item.image.trim() !== "" ? item.image : "/placeholder.png";

        return (
            <div className="d-flex justify-content-between border-bottom py-3">
                <div className="w-25">
                    <img src={imageSrc} className="img-fluid" alt={item.name} />
                </div>
                <div>
                    <small className="text-secondary d-block">{item.name}</small>
                    <small className="text-secondary d-block">Qty: {item.qty}</small>
                    <b className="text-secondary">Rs. {item.price}</b>
                </div>
                <div style={{ cursor: "pointer" }} onClick={handleDelete}>
                    <RxCross2 />
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-between border-bottom py-3">
            <div className="w-25">
                <img src={item.image} className="img-fluid" alt={item.name} />
            </div>
            <div>
                <small className="text-secondary d-block">{item.name}</small>
                <small className="text-secondary d-block">Qty: {item.qty}</small>
                <b className="text-secondary">Rs. {item.price}</b>
            </div>
            <div style={{ cursor: "pointer" }} onClick={handleDelete}>
                <RxCross2 />
            </div>        </div>
    );
}

// CartTotal component
function CartTotal({ subtotal }) {
    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between">
                <div>Subtotal</div>
                <div>Rs. {subtotal}</div>
            </div>
            <div className="bg-dark cartBtn p-1 mt-2">
                <button className="d-block">VIEW CART</button>
                <button className="d-block">CHECKOUT</button>
            </div>
        </div>
    );
}



// offcanwas menu
function OffcanvasMenu({ show, setShow }) {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Offcanvas show={show} onHide={handleClose} className="menuOffCanwas" >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>

            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>Contact us 24/7 : +91-9781234560 </p>
                <p>furniture@gmail.com </p>

                <Accordion>
                    <Accordion.Item eventKey="0" className="noneArrow">
                        <Accordion.Header> <Link href={"/"} >Home Us</Link> </Accordion.Header>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Living</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Tables</Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Living Storage</Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Mirrors</Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Sofa</Accordion.Header>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Pages</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header> <Link href={"/about-us"} >About Us</Link> </Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header><Link href={"/cart"} >Cart</Link>  </Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header> <Link href={"/checkout"} >Checkout</Link> </Accordion.Header>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Frequently Asked Questions</Accordion.Header>
                                </Accordion.Item>
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4" className="noneArrow">
                        <Accordion.Header>Login / Register</Accordion.Header>
                    </Accordion.Item>
                </Accordion>

            </Offcanvas.Body>
        </Offcanvas>
    )
}
