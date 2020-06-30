import React from 'react';
import { useBlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation }) => {
  const { posts, editPost } = useBlogContext();
  const { id, title, content } = posts.find(post => post.id === navigation.getParam('id'));

  const handleEditPost = post => {
    editPost({ ...post, id }, () => {
      // returns to the previous screen
      navigation.pop();
    });
  };

  return <BlogPostForm initialValues={{ title, content }} onSubmit={handleEditPost} />;
};

export default EditScreen;
