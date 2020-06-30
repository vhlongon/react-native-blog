import { useContext } from 'react';
import createDataContext from './createDataContext';

const ADD_POST = 'ADD_POST';
const REMOVE_POST = 'REMOVE_POST';
const EDIT_POST = 'EDIT_POST';

const actions = {
  [ADD_POST]: (state, payload) => {
    const id = `${Math.floor(Math.random() * 99999)}`;
    const posts = [...state.posts, { id, ...payload }];
    return { ...state, posts };
  },
  [REMOVE_POST]: (state, payload) => {
    const posts = state.posts.filter(({ id }) => id !== payload);
    return { ...state, posts };
  },
  [EDIT_POST]: (state, payload) => {
    console.log(payload);
    const posts = state.posts.map(post => (post.id === payload.id ? { ...payload } : post));
    return { ...state, posts };
  },
};
const blogReducer = (state, { type, payload }) =>
  actions[type] ? actions[type](state, payload) : state;

const addPost = dispatch => (post, callback) => {
  dispatch({ type: ADD_POST, payload: post });
  // sending a callback here is overkill for the use case
  // but in a real world scenario we want to send a callback here
  // run some async function like fetch and then run the callback
  if (callback) {
    callback();
  }
};

const editPost = dispatch => (post, callback) => {
  dispatch({ type: EDIT_POST, payload: post });
  // sending a callback here is overkill for the use case
  // but in a real world scenario we want to send a callback here
  // run some async function like fetch and then run the callback
  if (callback) {
    callback();
  }
};

const removePost = dispatch => id => {
  dispatch({ type: REMOVE_POST, payload: id });
};

const { Context, Provider } = createDataContext(
  blogReducer,
  { addPost, removePost, editPost },
  { posts: [] },
);

const useBlogContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useBlogContext should be used within a BlogProvider');
  }

  return context;
};

export { Context, Provider, useBlogContext };
