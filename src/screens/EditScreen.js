import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { useBlogContext } from '../context/BlogContext';

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
const EditScreen = ({ navigation }) => {
  const { posts, editPost } = useBlogContext();
  const post = posts.find(({ id }) => id === navigation.getParam('id'));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handlePress = () => {
    editPost({ id: post.id, title, content }, () => {
      navigation.navigate('Index');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit</Text>
      <Text style={styles.label}>Enter title:</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      <Text style={styles.label}>Enter content:</Text>
      <TextInput style={styles.input} onChangeText={setContent} value={content} />
      <TouchableOpacity onPress={handlePress} title="Edit">
        <View style={styles.button}>
          <Text>
            Edit <Ionicons name="ios-create" style={styles.icon} />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditScreen;
