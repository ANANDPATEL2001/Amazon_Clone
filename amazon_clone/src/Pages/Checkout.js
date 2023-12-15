import React from 'react';

import './Checkout.css';
import Subtotal from '../Subtotal';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from '../CheckoutProduct';

const Checkout = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left mr-5'>
                <img className="checkout__ad" src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonPay/NocostEMI/IBD/revised/NCE12_InstantDiscount_1500x300_17jan.jpg"
                    alt="loading amazon ads" />

                <div className='checkout__right1'>
                    <Subtotal />
                    {/* <div className='checkout__title'><h2>the Subtotal will go here</h2></div> */}
                </div>

                <div className='checkout__title'>
                    {/* Here ? symbol is used as an asynchronous approach while system fetch the data from the DB */}
                    <h3 className='fw-bold'>Hello, {user?.email}</h3>
                    <h2 className='fw-bold'>Your Shopping Basket</h2>

                    {
                        basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))
                    }
                </div>
            </div>

            <div className='checkout__right2 position-absolute end-4 ml-8'>
                <Subtotal />
                {/* <div className='checkout__title'><h2>the Subtotal will go here</h2></div> */}
            </div>
        </div>
    )
}

export default Checkout
