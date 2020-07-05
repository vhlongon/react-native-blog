import React, { createContext, useReducer } from 'react';

// this abstraction is very helpful in cases where we need to create different contests
// so each context only contains code specific for the context itself, i.e. the reducer and action creators
// the boilerplate for creating the context itself is isolated here instead
const boundActions = (actions, dispatch) =>
  Object.keys(actions).reduce((acc, key) => ({ ...acc, [key]: actions[key](dispatch) }), {});

export default (reducer, actions = {}, initialState) => {
  const Context = createContext();
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundedActions = boundActions(actions, dispatch);

    return <Context.Provider value={{ ...state, ...boundedActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
