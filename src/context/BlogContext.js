import { useContext } from 'react';
import createDataContext from './createDataContext';

const ADD_POST = 'ADD_POST';
const REMOVE_POST = 'REMOVE_POST';
const EDIT_POST = 'EDIT_POST';
const GET_POSTS = 'GET_POSTS';
const BASE_URL = 'http://localhost:3000';

const blogReducer = (state, { type, payload }) => {
  const actions = {
    [GET_POSTS]: () => ({ ...state, ...payload }),
    [ADD_POST]: () => ({ ...state, ...payload }),
    [REMOVE_POST]: () => {
      const { id, ...rest } = payload;
      const posts = state.posts.filter(post => post.id !== id);
      return { ...state, posts, ...rest };
    },
    [EDIT_POST]: () => {
      const { id, title, content, ...rest } = payload;
      const posts = state.posts.map(post => (post.id === id ? { id, content, title } : post));
      return { ...state, posts, ...rest };
    },
  };

  return actions[type] ? actions[type](state, payload) : state;
};

const addPost = dispatch => async (post, callback) => {
  dispatch({ type: ADD_POST, payload: { loading: true } });
  try {
    const id = `${Math.floor(Math.random() * 99999)}`;
    const newPost = { ...post, id };
    await fetch(`${BASE_URL}/blogposts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    dispatch({ type: ADD_POST, loading: false });

    if (callback) {
      callback();
    }
  } catch (error) {
    dispatch({ type: ADD_POST, payload: { error: error.message, loading: false } });
  }
};

const editPost = dispatch => async (post, callback) => {
  dispatch({ type: EDIT_POST, payload: { loading: true } });
  try {
    await fetch(`${BASE_URL}/blogposts/${post.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    dispatch({ type: EDIT_POST, payload: { loading: false, ...post } });

    if (callback) {
      callback();
    }
  } catch (error) {
    dispatch({ type: EDIT_POST, payload: { error: error.message, loading: false } });
  }
};

const getPosts = dispatch => async () => {
  dispatch({ type: GET_POSTS, payload: { loading: true } });
  try {
    const response = await fetch(`${BASE_URL}/blogposts`);
    const data = await response.json();
    dispatch({ type: GET_POSTS, payload: { posts: data, loading: false } });
  } catch (error) {
    dispatch({ type: GET_POSTS, payload: { error: error.message, loading: false } });
  }
};

const removePost = dispatch => async id => {
  dispatch({ type: REMOVE_POST, payload: { loading: true } });
  try {
    await fetch(`${BASE_URL}/blogposts/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: REMOVE_POST, payload: { id, loading: false } });
  } catch (error) {
    dispatch({ type: REMOVE_POST, payload: { error: error.message, loading: false } });
  }
};

const { Context, Provider } = createDataContext(
  blogReducer,
  { addPost, removePost, editPost, getPosts },
  { posts: [], loading: false, error: null },
);

const useBlogContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useBlogContext should be used within a BlogProvider');
  }

  return context;
};

export { Context, Provider, useBlogContext };
