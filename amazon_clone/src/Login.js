import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        // Below we have used 'preventDefault()' to ensure that default action that belongs to the event will not occur i.e. Submitting the form.
        e.preventDefault();
    }

    const register = e => {
        e.preventDefault();
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDn6rPw-Xj6MYUEVKFDhKfnv3lfFgKyr2nAycKxf9_Hg&s' />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>By continuing, you agree to Amazon's Conditions of <br /> Use and Privacy Notice.</p>

                <button onClick={register} className='login__registrationButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
