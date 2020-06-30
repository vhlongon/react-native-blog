import React, { createContext, useContext, useReducer } from 'react';

const BlogContext = createContext();

export const useBlogContext = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error('useBlogContext should be used within a BlogProvider');
  }

  return context;
};

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

export const BlogProvider = ({ children, data = {} }) => {
  const [{ posts }, dispatch] = useReducer(blogReducer, { posts: data.posts || [] });

  const addPost = () => {
    dispatch({ type: ADD_POST });
  };

  const removePost = () => {
    dispatch({ type: REMOVE_POST });
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, removePost }}>{children}</BlogContext.Provider>
  );
};

export default BlogContext;
