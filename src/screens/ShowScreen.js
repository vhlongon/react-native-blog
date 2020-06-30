import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBlogContext } from '../context/BlogContext';

const styles = StyleSheet.create({
  container: { margin: 10 },
  title: { marginVertical: 20, textAlign: 'center', fontSize: 24 },
  content: { marginVertical: 10, fontSize: 18 },
});
const ShowScreen = ({ navigation }) => {
  const { posts } = useBlogContext();
  const post = posts.find(({ id }) => id === navigation.getParam('id'));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </View>
  );
};

export default ShowScreen;
