import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import './Home.css';
import Product_info from "../Data/Product.json"
import Product from '../Product';

const Home = () => {
    // console.log("Prodict info is : ", Product_info)

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8
        },
        desktop: {
            breakpoint: { max: 3000, min: 1200 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1200, min: 720 },
            items: 3
        },
        smallTablet: {
            breakpoint: { max: 720, min: 480 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 480, min: 0 },
            items: 1
        }
    }

    return (
        <div className='home'>
            <div className='home__container'>
                {/* <img className='home__image' src='https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg' alt='Loading your Hero_Section' /> */}

                <div id="carouselExample" className="carousal_conatainer carousel slide w-100">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg" className="home__image d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Grocery/ARTs/Jupiter/Phase3/GW/Unrec_PC_Hero_3000x1200._CB575561534_.jpg" className="home__image d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Jupiter_23/Phase3_Jup23/899_P3_3000x1200._CB575248754_.jpg" className="home__image d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/Events/img23/Jupiter23/Homepage/Phase3/J23_P3A_PC_NTA_Hero_2x_V3._CB575152221_.jpg" className="home__image d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                <div className='home__row__container bg-white'>
                    <h2 className='m-3 mb-2 fs-4 fw-bold'>Today's Deal</h2>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                    >
                        {
                            Product_info.Product_info.slice(0, 6).map(product =>
                                // console.log("Individual product is ", product)
                                <Product
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    rating={Math.floor(product.rating)}
                                    image={product.image} />
                            )
                        }
                    </Carousel>
                </div>

                <div className='home__row__container bg-white'>
                    <h2 className='m-3 mb-2 fs-4 fw-bold'>Exclusively for you</h2>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={2000}
                        customTransition="transform 300ms ease-in-out"
                    >
                        {
                            Product_info.Product_info.slice(12, 18).map(product =>
                                // console.log("Individual product is ", product)
                                <Product
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    rating={Math.floor(product.rating)}
                                    image={product.image} />
                            )
                        }
                    </Carousel>
                    {/* <Product
                            id="12321341"
                            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
                            price={11.96}
                            rating={5}
                            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
                        />
                        <Product
                            id="49538094"
                            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
                            price={239.00}
                            rating={4}
                            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
                        /> */}
                </div>

                <div className='home__row__container bg-white'>
                    <div className="home__row">
                        <Product
                            id="4903850"
                            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                            price={199.99}
                            rating={3}
                            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                        />
                        <Product
                            id="3254354345"
                            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                            price={598.99}
                            rating={4}
                            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home