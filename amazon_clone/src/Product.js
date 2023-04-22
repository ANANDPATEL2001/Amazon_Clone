import React from 'react';

import './Product.css';
import { useStateValue } from './StateProvider';

const Product = ({ id, title, image, price, rating }) => {

    // Dispatch function is used to dispatch/Push the data to DataLayer
    const [{ basket }, dispatch] = useStateValue();
    // console.log("This is the basket item >>>", basket);

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                    {Array(rating).fill().map((_, i) => (<p>star</p>))}
                </div>
            </div>

            <img src={image} alt='Loading...' />

            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
