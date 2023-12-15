import React from 'react';
import moment from 'moment';

import './Order.css';
import CheckoutProduct from './CheckoutProduct';

const Order = ({ order }) => {
    console.log("order id is :", order.id)
    console.log("order data is :", order.data)

    const value = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD'
        }).format(order.data.amount / 100);

    return (
        <div className='order'>
            <div className='order__details'>
                <h2>ORDER PLACED</h2>
                {/* <p>{moment.unix(Order.data.created).format("MMM Do YYYY, h:mma")}</p> */}
                {/* <p>{moment.unix(order.data.created).format("MMM Do YYYY, h:mma")}</p> */}
                <div className=''>
                    <p>{order?.data?.publishedAt_date}</p>
                    <p>{order?.data?.publishedAt_time}</p>
                </div>

                <p className='order__id'>
                    <small>ORDER_ID</small><br />
                    <small>{order.id}</small>
                </p>
            </div>
            <div className='p-7'>
                {order?.data?.basket?.map(item =>
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        hideButton
                    />
                )}

                <h3 className='order__total'>TOTAL: {value}</h3>
            </div>
        </div>
    )
}

export default Order
