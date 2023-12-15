import React, { useState, useEffect } from 'react'

import './Orders.css';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import Order from '../Order';
import Subtotal from '../Subtotal';

const Orders = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                // .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    console.log("snapshot is  :", snapshot)
                    console.log("snapshot doc is  :", snapshot.docs)
                    snapshot.docs.map(doc => {
                        // console.log("Doc id is :", doc.id)
                        // console.log("Doc data is :", doc.data())
                    })
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                    // orders.map(order => {
                    //     console.log("This is order", order)
                    // })
                })
        }
        else {
            setOrders([])
        }
    }, [user])

    return (
        <div className='orders'>
            <h1 className='fw-bolder h2'>Your Orders</h1>

            <div className='orders_order'>
                <h3 className='fw-bold'>Hello, {user?.email}</h3>
                {orders?.map(order =>
                    <Order order={order} />
                )}
            </div>
        </div>
    )
}

export default Orders
