import React, { useEffect, useState } from 'react';

import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {

    const [{ basket }, dispatch] = useStateValue();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [newTitle, setNewTitle] = useState(title)

    const handleWidth = () => {
        setWindowWidth(window.innerWidth)
    }

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    };

    useEffect(() => {
        window.addEventListener('resize', handleWidth)

        return () => {
            window.removeEventListener('resize', handleWidth)
        }
    }, [])

    useEffect(() => {
        changeTitle(newTitle);
    }, [window.innerWidth])


    const changeTitle = (t) => {
        // console.log(typeof (t));
        // console.log(t);
        if (windowWidth <= 720) {
            setNewTitle((t.length > 20) ? (t.substr(0, 20) + "...") : t);
            // console.log("This is newTitle", newTitle)
        }
        else {
            setNewTitle(title)
            // console.log("This is newTitle", newTitle)
        }
    }


    return (
        <div className='checkoutProduct'>
            <img className='img-fluid checkoutProduct__image' src={image} alt='Loading your Product' />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{newTitle}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {/* Below we can also ignore what's inside of the map() parameter i.e. map(() => <p>star</p>) */}
                    {Array(rating).fill().map((_, i) => (<p>🌟</p>))}
                </div>
                {!hideButton && (
                    <button className='btn btn-warning col-lg-5' onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>

        </div>
    )
}

export default CheckoutProduct
