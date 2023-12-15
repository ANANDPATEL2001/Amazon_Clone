import React from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { IoIosBasket } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillBasket2Fill } from "react-icons/bs";

import './Header.css';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';


// 'rafce' is basically the (Arrow functionak Component)
const Header = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user)
            auth.signOut();
    }

    return (
        <div className='header'>

            {/* Below Link is used for Navigation */}
            <Link to='/'>
                <img className='header__logo' src='https://publishingperspectives.com/wp-content/uploads/2016/02/Amazon-Logo-featured.jpg' alt='Loading logo...' />
            </Link>

            <div className='header__search'>
                <input className='header__searchInput' type='text' />
                <AiOutlineSearch className='header__searchIcon' />
            </div>

            <div className='header__nav'>
            </div>





            <input type="checkbox" name="" id="chk1" />
            <ul className="C02">
                <Link to='/orders'>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>Return</span>
                        <span className='header__optionLineTwo'>& Orders</span>
                    </div>
                </Link>
                <Link to="/"><div className='header__option'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div></Link>
                <Link to='/Checkout'>
                    <div className='header__optionBasket' style={{ "marginTop": "10px" }}>
                        <BsFillBasket2Fill style={{ "fontSize": "30px" }} />
                        {/* Below '?' symbole is used to handle the error in case it could not determine the length of basket */}
                        <span className='header__optionLineTwo header__basketCount'>{basket?.length}</span>
                    </div>
                </Link>
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className='header__option'>
                        <span className='header__optionLineOne'>{user ? `${user.email}` : 'Hello Guest'}</span>
                        <span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                {/* <li style={{ "display": 'flex', "marginTop": "10px" }}>
                    <a href="#"><i className="fab fa-facebook"><BsFacebook /></i></a>
                    <a href="#"><i className="fab fa-twitter"><BsTwitter /></i></a>
                    <a href="#"><i className="fab fa-instagram"><BsInstagram /></i></a>
                </li> */}
            </ul>
            <div className="menu">
                <label htmlFor="chk1">
                    <i><BsLayoutTextSidebarReverse className='Hamburger_icon' /></i>
                </label>
            </div>

        </div >
    )
}

export default Header