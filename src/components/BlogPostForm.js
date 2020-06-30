import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

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
  icon: { fontSize: 24, marginRight: 10, color: 'darkgray' },
});

const BlogPostForm = ({ initialValues = {}, onSubmit = () => {} }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  const handleOnSubmit = () => {
    onSubmit({ title, content });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit</Text>
      <Text style={styles.label}>Enter title:</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <Text style={styles.label}>Enter content:</Text>
      <TextInput style={styles.input} onChangeText={setContent} value={content} />
      <View>
        <Button style={styles.button} title="Save post" onPress={handleOnSubmit} />
      </View>
    </View>
  );
};

export default BlogPostForm;
