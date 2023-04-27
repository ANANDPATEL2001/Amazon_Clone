import React from 'react';
// import NumberFormat from 'react-number-format';
// import CurrencyFormat from 'react-currency-format';

import './Subtotal.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';


export const getBasketPrice = (basket) => {
    var sum = 0;
    basket?.map((item) => {
        sum += item.price;
    })
    return (sum)
};




const Subtotal = () => {
    const [{ basket }, dispatch] = useStateValue();

    const value = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD'
        }).format(getBasketPrice(basket));

    return (
        <div className='subtotal'>
            <>
                <p>
                    Subtotal ({basket.length} items):
                    <strong>
                        {value};
                    </strong>
                </p>
                <small className='subtotal__gift'>
                    <input type='checkbox' />This Order contains a gift
                </small>
            </>
            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
