import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import useHistory from 'use-history';

import './Login.css';
import { auth } from '../firebase';

// 'useHistory' provides several different implementations for managing session history in JavaScript in various environments.
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const signIn = e => {
        // Below we have used 'preventDefault()' to ensure that default action that belongs to the event will not occur i.e. Submitting the form.
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // It indicates that we have succssfully created a new User
                // console.log(auth);
                if (auth)
                    history('/')
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDn6rPw-Xj6MYUEVKFDhKfnv3lfFgKyr2nAycKxf9_Hg&s' alt='Loading logo' />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input className='container' type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input className='container' type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>By continuing, you agree to Amazon's Conditions of <br /> Use and Privacy Notice.</p>

                <button onClick={register} className='login__registrationButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
