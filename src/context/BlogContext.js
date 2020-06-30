import { useContext } from 'react';
import createDataContext from './createDataContext';

const ADD_POST = 'ADD_POST';
const REMOVE_POST = 'REMOVE_POST';

const actions = {
  [ADD_POST]: state => {
    const posts = [...state.posts, { title: `Blog post #${state.posts.length + 1}` }];
    return { ...state, posts };
  },
  [REMOVE_POST]: state => {
    const posts = state.posts.slice(0, -1);
    return { ...state, posts };
  },
};
const blogReducer = (state, { type }) => (actions[type] ? actions[type](state) : state);

const addPost = dispatch => () => {
  dispatch({ type: ADD_POST });
};

const removePost = dispatch => () => {
  dispatch({ type: REMOVE_POST });
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
