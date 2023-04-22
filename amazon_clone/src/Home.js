import React from 'react';

import './Home.css';
import Product from './Product';

const Home = () => {
    return (
        <div className='home'>
            <div className='home__container'>
                <img className='home__image' src='https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg' alt='Loading your Hero_Section' />

                <div className='home__row'>
                    <Product
                        id='12123849'
                        title='The Bluetooth Calling lorem'
                        price={20.99}
                        image='https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wearables/PC_CategoryCard_379X304_1._SY304_CB614835787_.jpg'
                        rating={5} />
                    <Product
                        id='21256049'
                        title='The Bluetooth Calling'
                        price={20.99}
                        image='https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wearables/PC_CategoryCard_379X304_1._SY304_CB614835787_.jpg'
                        rating={5} />
                </div>

                <div className='home__row'>
                    <Product
                        id='32814749'
                        title='The Bluetooth Calling'
                        price={20.99}
                        image='https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wearables/PC_CategoryCard_379X304_1._SY304_CB614835787_.jpg'
                        rating={5} />
                    <Product
                        id='42814749'
                        title='The Bluetooth Calling'
                        price={20.99}
                        image='https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wearables/PC_CategoryCard_379X304_1._SY304_CB614835787_.jpg'
                        rating={5} />
                    <Product
                        id='52876148'
                        title='The Bluetooth Calling'
                        price={20.99}
                        image='https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wearables/PC_CategoryCard_379X304_1._SY304_CB614835787_.jpg'
                        rating={5} />
                </div>

                <div className='home__row'>
                    <Product
                        id='62875479'
                        title='The Bluetooth Calling'
                        price={20.99}
                        image='https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wearables/PC_CategoryCard_379X304_1._SY304_CB614835787_.jpg'
                        rating={5} />
                </div>
            </div>
        </div>
    )
}

export default Home