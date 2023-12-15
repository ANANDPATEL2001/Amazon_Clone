import React from 'react'
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";

import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";

import "./Footer.css"

const Footer = () => {
    const myStyle = {
        background: "#303030",
        color: "#D0D0D0"
    }

    return (
        <div className='position-static bottom-0 start-0 end-0'>
            <footer className="footer_container text-center text-lg-start text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div className='social_links'>
                        <a href="#" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"><BsFacebook /></i>
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <i className="fab fa-twitter"><BsTwitter /></i>
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <i className="fab fa-google"><BsGoogle /></i>
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <i className="fab fa-instagram"><BsInstagram /></i>
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <i className="fab fa-linkedin"><BsLinkedin /></i>
                        </a>
                        <a href="#" className="me-4 text-reset">
                            <i className="fab fa-github"><BsPinterest /></i>
                        </a>
                    </div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Get to Know Us
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">About Us</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Careers</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Press Releases</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Amazon Science</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Make Money with Us
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">
                                        Sell on Amazon</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">
                                        Sell under Amazon Accelerator</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">
                                        Fulfilment by Amazon</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">
                                        Advertise Your Products</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Amazon Pay on Merchants</a>
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">Pricing</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Settings</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Orders</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Help</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    info@amazon.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4" style={myStyle}>
                    © 2021 Copyright:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">amazon.com</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer