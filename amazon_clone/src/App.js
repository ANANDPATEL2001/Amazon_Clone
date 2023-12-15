import { Fragment, default as React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import './App.css';
import Header from './Components/Header';
import Footer from "./Components/Footer";
import Home from './Pages/Home';
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Pages/Payment";
import Orders from "./Pages/Orders";
import HOC from "./Components/HOC";

// 'loadstripe()' method basically takes the Payment API as an input 
// This API is public (test mode) hence no need to hide it(for security reasons)
const promise = loadStripe('pk_test_51N1w8wSGUC39K1nVUbOiMTTKIMDucelZ6tXC5ybWKZWmLQ8ntUCaF1BPbh5vgPfMAZY1QncCXqunqjCMqsRFcxq300eAVWc5ad');

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    //'useEffect()' function runs only once when the app component loads...

    auth.onAuthStateChanged(authUser => {
      console.log("THE USER ID >>", authUser)

      if (authUser) {
        // User successfully logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }
      else {
        // User id logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    }
    );
  }, []);

  return (
    // Here we are using BEM (Block Element Modifier) Methodology
    <Router>
      <div className='app'>
        <Routes>
          {/* Below we are using 'Component' attribute with React.Fragment to render multiple Components */}
          <Route path="/login" Component={() =>
            <Fragment>
              <Login />
            </Fragment>
          } />
          <Route path="/orders" Component={() =>
            <Fragment>
              <Header />
              <Orders />
              <Footer />
            </Fragment>
          } />
          <Route path="/checkout" Component={() =>
            <Fragment>
              <Header />
              <Checkout />
              <Footer />
            </Fragment>
          } />
          <Route path="/payment" Component={() =>
            <Fragment>
              <Header />
              <Elements stripe={promise}><Payment /></Elements>
              <Footer />
            </Fragment>
          } />
          <Route path="/" Component={() =>
            <Fragment>
              <HOC />
            </Fragment>
          } />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
