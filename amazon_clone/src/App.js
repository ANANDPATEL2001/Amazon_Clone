import { Fragment, default as React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from "./Checkout";
import Login from "./Login";

function App() {
  return (
    // Here we are using BEM (Block Element Modifier) Methodology
    <Router>
      <div className='app'>
        <Routes>
          {/* Below we are using Component attribute with React.Fragment to render multiple Components */}
          <Route path="/login" Component={() =>
            <Fragment>
              <Login />
            </Fragment>
          } />
          <Route path="/checkout" Component={() =>
            <Fragment>
              <Header />
              <Checkout />
            </Fragment>
          } />
          <Route path="/" Component={() =>
            <Fragment>
              <Header />
              <Home />
            </Fragment>
          } />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
