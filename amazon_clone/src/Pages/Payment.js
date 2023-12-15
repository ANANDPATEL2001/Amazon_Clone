import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';

import './Payment.css'
import axios from '../axios';
import { useStateValue } from '../StateProvider'
import CheckoutProduct from '../CheckoutProduct';
import { getBasketPrice } from '../Subtotal';
import { getBasketTotal } from '../reducer';
import { db } from '../firebase';

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    // The useNavigate hook returns a function that lets you navigate programmatically, for example after a form is submitted.
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
    console.log("User is :", user)
    console.log('User Email is : ', user.email)

    const handleSubmit = async (e) => {
        // All the Stripe processing and payment related stuffs goes here
        e.preventDefault();
        setProcessing(true);

        // let date = new Date()
        // const payment_method = {
        //     "id": clientSecret,
        //     "object": "payment_method",
        //     "billing_details": {
        //         "address": {
        //             "city": "Ghaziabad",
        //             "country": "INDIA",
        //             "line1": null,
        //             "line2": null,
        //             "postal_code": "201009",
        //             "state": "Uttar Pradesh"
        //         },
        //         "email": "patelanandmja2002@gmail.com",
        //         "name": "ANAND KUMAR PATEL",
        //         "phone": "8887810186"
        //     },
        //     "card": {
        //         "brand": "visa",
        //         "checks": {
        //             "address_line1_check": null,
        //             "address_postal_code_check": null,
        //             "cvc_check": "unchecked"
        //         },
        //         "country": "US",
        //         "exp_month": 8,
        //         "exp_year": 2026,
        //         "fingerprint": "mToisGZ01V71BCos",
        //         "funding": "credit",
        //         "generated_from": null,
        //         "last4": "4242",
        //         "networks": {
        //             "available": [
        //                 "visa"
        //             ],
        //             "preferred": null
        //         },
        //         "three_d_secure_usage": {
        //             "supported": true
        //         },
        //         "wallet": null
        //     },
        //     "created": date.now(),
        //     "customer": null,
        //     "livemode": false,
        //     "metadata": {},
        //     "type": "card"
        // }

        // It is this 'clientSecret' which tells the 'stripe' how much to charge the customers
        // const payload = await stripe.confirmCardPayment(clientSecret, {
        await stripe.confirmCardPayment(clientSecret, {
            // payment_method: {
            //     card: elements.getElement(CardElement)
            // }
            payment_method: {
                card: elements.getElement(CardElement),
                "billing_details": {
                    "address": {
                        "city": "Ghaziabad",
                        "country": "IN",
                        "postal_code": "201009",
                        "state": "Uttar Pradesh"
                    },
                    "email": `${user.email}`,
                    "name": "ANAND KUMAR PATEL",
                    "phone": "8887810186"
                },
            }
        }).then((paymentIntent) => {

            console.log("paymentIntent is : ", paymentIntent);
            console.log("paymentIntent error id is : ", paymentIntent.error.payment_intent.id);
            console.log("paymentIntent id is : ", paymentIntent.id);
            console.log("paymentIntent total amount is : ", paymentIntent.error.payment_intent.amount);
            // 'paymentIntent' is just the payment Confirmation

            let date = new Date(); // for publish at info
            let curDate = new Array(date.getDate(), date.getMonth(), date.getFullYear());
            let curTime = new Array(date.getHours(), date.getMinutes(), date.getSeconds());

            // Here, We are creating/accessing the DB with collection of 'users' specific to their id
            // Inside the 'users' collection we have 'orders' collection with payment id && setting parameter further
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount || paymentIntent.error.payment_intent.amount,
                    // created: paymentIntent.created,
                    // publishedAt_date: arr[0],
                    // publishedAt_month: arr[1],
                    // publishedAt_year: arr[2],
                    publishedAt_date: `${curDate[0]}-${curDate[1] + 1}-${curDate[2]}`,
                    publishedAt_time: curTime[0] > 12 ? `${curTime[0] - 12}:${curTime[1]}PM` : `${curTime[0]}:${curTime[1]}AM`
                }).then(res => {
                    console.log("Result after DB Updation", res)
                }).catch(err => {
                    console.log("Error occured", err)
                })

            console.log("paymentIntent id is : ", paymentIntent.id);

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            // The replace options property is a REPLACE navigation action.
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
                                <h3 className='m-2'>Order Total : {value}</h3>

                                <button className='btn btn-warning col-lg-10 col-12' disabled={processing || disabled || succeeded}>
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
