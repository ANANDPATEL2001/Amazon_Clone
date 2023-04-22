import React, { createContext, useContext, useReducer } from "react";


// Prepare the DataLayer
export const StateContext = createContext();

// Following wrap up our Application & pass to the DataLayer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

// Pull information from the DataLayer
export const useStateValue = () => useContext(StateContext);