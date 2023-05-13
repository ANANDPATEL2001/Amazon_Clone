import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

import './Payment.css'
import axios from './axios';
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { getBasketPrice } from './Subtotal';
import { getBasketTotal } from './reducer';
import { db } from './firebase';

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // useEffect will be active when payload changes/value of basket changes
        // useEffect is used to generate the special stripe secret which allows to charge the customers (i.e. make the payments)
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Here, Stripe expects the total amount in a currencies subunits (i.e. 1 USD = 650 cents )
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    }, [basket])

    console.log('Client_Secrete : ', clientSecret)
    console.log('User is : ', user)

    const handleSubmit = async (e) => {
        // All the Stripe processing and payment related stuffs goes here
        e.preventDefault();
        setProcessing(true);

        // It is this 'clientSecret' which tells the 'stripe' how much to charge the customers
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
                // card: {
                //     token: 'tok_visa',
                // },
            }
        }).then(({ paymentIntent }) => {

            console.log("paymentIntent is : ", { paymentIntent })
            // 'paymentIntent' is just the payment Confirmation

            // Here, We are creating/accessing the DB with collection of 'users' specific to their id
            // Inside the 'users' collection we have 'orders' collection with payment id && setting parameter further
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            // 'replace: true', the navigation will replace the current entry in the history stack instead of adding a new one
            history('/orders', { replace: true })
        })
    }

    const handleChange = e => {
        // Here, we will listen for any changes in the 'CardElement'
        // And Finally Display error if any as the customer type their card Details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    const value = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD'
        }).format(getBasketPrice(basket));

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1> Checkout {<Link to='/checkout'>{basket?.length} items</Link>}</h1>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items & Delivery</h3>
                    </div>
                    <div className='payment__items'>
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

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <h3>Order Total : {value}</h3>

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Following will show the error if there's any */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
