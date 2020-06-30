import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather } from '@expo/vector-icons';
import { useBlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  title: { marginVertical: 20, textAlign: 'center', fontSize: 24 },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
});
const CreateScreen = ({ navigation }) => {
  const { addPost } = useBlogContext();

  const handleCreatePost = post => {
    addPost(post, () => {
      navigation.navigate('Index');
    });
  };

  return <BlogPostForm onSubmit={handleCreatePost} />;
};

export default CreateScreen;
