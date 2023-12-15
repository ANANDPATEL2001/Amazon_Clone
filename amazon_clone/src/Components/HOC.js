import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../Pages/Home';

const HOC = (Children) =>
    ({ ...props }) => {
        return (
            <>
                <Header />
                <Children {...props} />
                <Footer />
            </>
        )
    }

export default HOC(Home)