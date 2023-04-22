import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';
import { initialState } from './reducer';
import reducer from './reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const initialState = initialState;
// const reducer = reducer;

root.render(
  <React.StrictMode>
    {/* Below We are using React.Context.Provider to pass down the props to every node of DOM tree  */}
    <StateProvider initialState={initialState} reducer={reducer} >
      <App />
    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
