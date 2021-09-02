import React, {createContext, useContext, useReducer} from 'react';

export default function makeStore2(reducer, initialState) {

const StateContext = createContext();

const StateProvider = ({children}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const useStateValue = () => useContext(StateContext);
return [StateProvider, useStateValue]

}

