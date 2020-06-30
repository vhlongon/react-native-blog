import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const useBlogContext = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error('useBlogContext should be used within a BlogProvider');
  }

  return context;
};

export const BlogProvider = ({ children, data = {} }) => {
  const [posts, setPosts] = useState(data.posts || []);

  const addPost = () => {
    setPosts([...posts, { title: `Blog post #${posts.length + 1}` }]);
  };
  return <BlogContext.Provider value={{ posts, addPost }}>{children}</BlogContext.Provider>;
};

export default BlogContext;
