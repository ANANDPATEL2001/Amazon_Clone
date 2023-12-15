import React from 'react';
import { useNavigate } from 'react-router';
// import CurrencyFormat from 'react-currency-format';
// import useHistory from 'use-history';

import './Subtotal.css';
import { useStateValue } from './StateProvider';
// import { getBasketTotal } from './reducer';


export const getBasketPrice = (basket) => {
    var sum = 0;
    basket?.map((item) => {
        sum += item.price;
    })
    return (sum)
};

const Subtotal = () => {
    const [{ basket }, dispatch] = useStateValue();
    // 'useNavigation' is a hook which gives access to navigation object. It's useful when you cannot pass the navigation prop into the component directly, or don't want to pass it in case of a deeply nested child
    const history = useNavigate();

    const value = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD'
        }).format(getBasketPrice(basket));

    return (
        <div>
            <div className='subtotal start-50 end-50'>
                <p>
                    Subtotal ({basket.length} items):
                    <strong>
                        {value};
                    </strong>
                </p>
                <small className='subtotal__gift'>
                    <input type='checkbox' />This Order contains a gift
                </small>
                <button className='btn btn-warning col-lg-12' onClick={e => history('/payment')}>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Subtotal
