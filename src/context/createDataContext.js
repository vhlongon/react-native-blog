import React, { createContext, useReducer } from 'react';

const boundActions = (actions, dispatch) =>
  Object.keys(actions).reduce((acc, key) => ({ ...acc, [key]: actions[key](dispatch) }), {});

export default (reducer, actions = {}) => {
  const Context = createContext();
  const Provider = ({ children, data }) => {
    const [state, dispatch] = useReducer(reducer, data);
    const boundedActions = boundActions(actions, dispatch);

    return <Context.Provider value={{ ...state, ...boundedActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
