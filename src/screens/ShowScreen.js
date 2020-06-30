import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBlogContext } from '../context/BlogContext';

const styles = StyleSheet.create({
  title: { marginVertical: 20, textAlign: 'center', fontSize: 24 },
});
const ShowScreen = ({ navigation }) => {
  const { posts } = useBlogContext();
  const post = posts.find(({ id }) => id === navigation.getParam('id'));

  return (
    <View>
      <Text style={styles.title}>{post.title}</Text>
    </View>
  );
};

export default ShowScreen;
