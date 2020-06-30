import { useContext } from 'react';
import createDataContext from './createDataContext';

const ADD_POST = 'ADD_POST';
const REMOVE_POST = 'REMOVE_POST';

const actions = {
  [ADD_POST]: state => {
    const id = `${Math.floor(Math.random() * 99999)}`;
    const posts = [...state.posts, { id, title: `Blog post #${state.posts.length + 1}` }];
    return { ...state, posts };
  },
  [REMOVE_POST]: (state, payload) => {
    const posts = state.posts.filter(({ id }) => id !== payload);
    return { ...state, posts };
  },
};
const blogReducer = (state, { type, payload }) =>
  actions[type] ? actions[type](state, payload) : state;

const addPost = dispatch => () => {
  dispatch({ type: ADD_POST });
};

const removePost = dispatch => id => {
  dispatch({ type: REMOVE_POST, payload: id });
};

const { Context, Provider } = createDataContext(
  blogReducer,
  { addPost, removePost },
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
